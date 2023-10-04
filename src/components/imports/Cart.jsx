import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeItemFromCart } from '../../redux/reducer';

function Cart() {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    dispatch(removeItemFromCart(id))
  }
  return (
    <>
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
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.qty}</td>
            <td>{item.size}</td>
            <td>&#8377;{item.finalPrice}</td>
            <td><button className='closeButton' onClick={()=>handleDelete(item.id)}><i class="fa fa-solid fa-trash fa-lg"></i></button></td>
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
            <button className='closeButton' onClick={()=>handleDelete(item.id)}><i class="fa fa-solid fa-trash"></i></button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cart;