import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMenuItem, removeMenuItem } from '../../../redux/actions'

export default function Card(props) {

    const username = useSelector((state) => state.cart.email) || "MiyaBhai"
    const { img, name, description } = props.cardData
    const dispatch = useDispatch()
    const items = useSelector((state) => state.cart.items)
    const [qty, setQty] = useState(1)
    let options = props.cardData.options[0]
    let priseOption = Object.keys(options)
    const [size, setSize] = useState(priseOption[0])
    let finalPrice = qty * parseInt(options[size])
    const handleAddToCart = () => {

        const itemIndex = items.findIndex(
            (item) => item.name === name
        );

        if (itemIndex !== -1) {
            const removeItem = dispatch(removeMenuItem(name))
            removeItem
                .then((data) => {
                    console.log("Cart Data Removed Successfully")
                })
                .catch((error) => {
                    console.log("Cart Data Removing Failed")
                })
        }

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
        }

        const addMenuItems = dispatch(addMenuItem(data))
        addMenuItems
            .then((data) => {
                console.log("Cart Data Added Successfully")
            })
            .catch((error) => {
                console.log("Cart Data Addiing Failed")
            })
    }

    return (
        <div>
            <div className="card m-3 " style={{ width: "18rem", objectFit: "fill !important" }}>
                <img className="card-img-top w-100 h-100" src={img} alt="Card" id='card_img' />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <div>
                        <select name="Quantity" dir='rtl' id="" onChange={(e) => setQty(e.target.value)}>
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
                        <button onClick={() => { handleAddToCart(name) }} className='btn btn-primary mt-2' >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
