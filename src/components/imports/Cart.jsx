import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeMenuItem } from '../../redux/actions';

function Cart() {
  const items = useSelector((state) => state.cart.items)
  const username = useSelector((state) => state.cart.email) || "Mubeen"
  const dispatch = useDispatch()
  const handleDelete = (name) => {
    const data = {
      username,
      name
    }
    const removeItem = dispatch(removeMenuItem(data))
    removeItem
      .then((data) => {
        console.log("Cart Data Removed Successfully")
      })
      .catch((error) => {
        console.log("Cart Data Removing Failed")
      })
  }
  return (
    <>
      console.log("cart rendered")
      <div className='d-none d-sm-table'>
        <tr className='tr'>
          <th>#</th>
          <th>Title</th>
          <th>Qty.</th>
          <th>Size</th>
          <th>Price</th>
          <th></th>
        </tr>
        {items.map((item, index) => (
          <tr className='tr' key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.qty}</td>
            <td>{item.size}</td>
            <td>&#8377;{item.finalPrice}</td>
            <td><button className='closeButton' onClick={() => handleDelete(item.name)}><i class="fa fa-solid fa-trash fa-lg"></i></button></td>
          </tr>
        ))}
      </div>
      <div className="d-sm-none">
        {items.map((item, index) => (
          <div className='cartDiv' key={index}>
            <span>{item.name}</span>
            <span>{item.qty}</span>
            <span>{item.size}</span>
            <span>&#8377;{item.finalPrice}</span>
            <button className='closeButton' onClick={() => handleDelete(item.name)}><i class="fa fa-solid fa-trash"></i></button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cart;