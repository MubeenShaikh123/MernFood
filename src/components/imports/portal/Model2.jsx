import React from 'react'
import { useState } from 'react';
import ReactDOM from 'react-dom';

export default function Modal2({ onClose, items, handleAddToCart }) {
  
  const [qty, setQty] = useState(1)
  let options = items.options[0]
  let priseOption = Object.keys(options)
  const [size, setSize] = useState(priseOption[0])
  let finalPrice = qty * parseInt(options[size])

  return ReactDOM.createPortal(
    <div className="modal-parent">
      <div className="modal-content">
        <div className="m-auto mt-2 d-flex flex-column">
          <h5 className="p-1">{items.name}</h5>
          <div className='w-100 h-100 justify-content-center d-flex overflow-hidden'>
            <span className='over position-relative'>
            <img src={items.img} alt="Food Image"/>
            </span>
          </div>
          <h6 className='p-2'>{items.description}</h6>
          <div className='d-flex flex-column col-12 p-2'>
            <div className='d-flex flex-row'>
              <select className='p-1 mx-2' name="Quantity" dir='ltr' id="" onChange={(e) => setQty(e.target.value)}>
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
              <span className='ps-3'>Total : </span>
              <span>{finalPrice}</span>
            </div>
            <button onClick={() => { handleAddToCart(items.name) }} className='btn btn-success mt-4' >
              Add To Cart
            </button>
          </div>
        </div>
        <button className='close-button' onClick={onClose}><i className="fa fa-times fa-lg"></i></button>
      </div>
    </div>,
    document.getElementById('itemModel')
  )
}