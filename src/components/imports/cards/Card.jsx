import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMenuItem, removeMenuItem } from '../../../redux/actions'
import Swal from 'sweetalert2'
import Modal2 from '../portal/Model2'

export default function Card(props) {
    const imageRef = useRef(null)
    const nameRef = useRef(null)
    const desRef = useRef(null)
    const [modelView, setmodelView] = useState(false)
    const username = useSelector((state) => state.cart.email)
    const { img, name, description } = props.cardData
    const dispatch = useDispatch()
    const items = useSelector((state) => state.cart.items)
    const [qty, setQty] = useState(1)
    let options = props.cardData.options[0]
    let priseOption = Object.keys(options)
    const [size, setSize] = useState(priseOption[0])
    let finalPrice = qty * parseInt(options[size])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const handleOpenCart = (event) => {
            setmodelView(true)
        }
        imageRef.current.addEventListener('click', handleOpenCart);
        nameRef.current.addEventListener('click', handleOpenCart);
        desRef.current.addEventListener('click', handleOpenCart);
    }, []);
    const handleClose = () => {
        setQty(1)
        setSize(priseOption[0])
        setmodelView(false)
    }

    const addNewItem = () => {
        const data = {
            username,
            cartData: [
                {
                    name,
                    qty,
                    size,
                    finalPrice
                }
            ]
        };
        const addMenuItems = dispatch(addMenuItem(data));
        addMenuItems
            .then((data) => {
                setIsLoading(false);
                Swal.fire({
                    title: 'Cart Data Added Successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1200
                });
            })
            .catch((error) => {
                setIsLoading(false);
                Swal.fire({
                    title: 'Failed To Add Cart Data',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1200
                });
            });
    };

    const handleAddToCart = (name) => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        // Check if an item with the same name and size already exists in the cart
        let itemIndex = items.findIndex(
            (item) => {
                return (item.name === name) && (item.size === size);
            }
        );

        if (itemIndex !== -1) {
            // If item with the same name and size exists, remove it
            let item = { name, size }
            const removeItem = dispatch(removeMenuItem({ item, username }));
            removeItem
                .then((data) => {
                    Swal.fire({
                        title: 'Cart Data Removed Successfully',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1200
                    });
                    // Add the new item after removing the existing one
                    addNewItem();
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        } else {
            // If item with the same name and size does not exist, add the new item directly
            addNewItem();
        }
    };

    let dataformodal = { setQty, priseOption, size, setSize, finalPrice, handleClose, handleAddToCart, img, name, description,isLoading };

    return (
        <>
            {modelView ? <Modal2 dataformodal={dataformodal}></Modal2> : ''}
            <div className='d-flex justify-content-center '>
                <div className="card m-3 " style={{ width: "18rem", objectFit: "fill !important" }}>
                    <img ref={imageRef} className="card-img-top w-100 h-100" src={img} alt="Card" id='card_img' />
                    <div className="card-body">
                        <h5 ref={nameRef} className="card-title">{name}</h5>
                        <p ref={desRef} className="card-text">{description}</p>
                        <div className='pb-2'>
                            <select name="Quantity" dir='ltr' id="" onChange={(e) => setQty(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <select onClick={(e) => setSize(e.target.value)}>
                                {
                                    priseOption.map((data) => {
                                        return (<option key={data} value={data}>{data}</option>)
                                    })
                                }
                            </select>
                            <span className='ps-4'>Total : </span>
                            <span>{finalPrice}</span>
                        </div>
                        <div>
                            <button style={{ cursor: isLoading ? 'wait' : 'pointer' }} onClick={(event) => { handleAddToCart({ name, size }) }} className='btn mt-2' >
                                {isLoading ? 'Loading...' : 'Add To Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
