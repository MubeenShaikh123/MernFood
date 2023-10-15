import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart} from '../../../redux/reducer'

export default function Card(props) {

    const { img, name, description } = props.cardData
    const dispach = useDispatch()
    const items = useSelector((state) => state.cart.items)
    const [qty, setQty] = useState(1)
    let options = props.cardData.options[0]
    let priseOption = Object.keys(options)
    const [size, setSize] = useState(priseOption[0])
    let finalPrice = qty * parseInt(options[size])

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
                        <button onClick={() => {
                            const itemIndex = items.findIndex(item => (item.name === name) && (item.size === size));
                            if (itemIndex !== -1) {
                                // if (items[itemIndex.qty] !== qty) {
                                //     let tempId = items[itemIndex]
                                //     console.log('itemIndex : ',itemIndex)
                                //     console.log('tempID : ',tempId)
                                //     console.log('itemsi : ',tempId)

                                //     dispach(removeItemFromCart(itemIndex))
                                //     let length = items.length
                                //     dispach(addItemToCart(
                                //         {
                                //             id: ++length,
                                //             name,
                                //             qty,
                                //             size,
                                //             finalPrice
                                //         }))
                                // }
                            }
                            else {
                                let length = items.length
                                dispach(addItemToCart(
                                    {
                                        id: ++length,
                                        name,
                                        qty,
                                        size,
                                        finalPrice
                                    }))
                            }
                        }} className='btn btn-primary mt-2' >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
