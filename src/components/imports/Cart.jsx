import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeMenuItem } from '../../redux/actions';
import Swal from 'sweetalert2';

function Cart() {
  const [isLoading, setIsLoading] = useState(false)
  const items = useSelector((state) => state.cart.items)
  const username = useSelector((state) => state.cart.email) || "MiyaBhai"
  const dispatch = useDispatch()
  const handleDelete = (name) => {
    if(isLoading){
      return;
    }
    setIsLoading(true)
    const data = {
      username,
      name
    }
    const removeItem = dispatch(removeMenuItem(data))
    removeItem
      .then((data) => {
        setIsLoading(false)
        Swal.fire({
          title: 'Cart Data Removed Successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 1200
        })
      })
      .catch((error) => {
        setIsLoading(false);
        Swal.fire({
          title: 'Cart Data Removing Failed',
          icon: 'error',
          showConfirmButton: false,
          timer: 1200
        })
      })
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
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.qty}</td>
            <td>{item.size}</td>
            <td>&#8377;{item.finalPrice}</td>
            <td><button className='closeButton' onClick={() => handleDelete(item.name)}><i className="fa fa-solid fa-trash fa-lg"></i></button></td>
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
            <button className='closeButton' onClick={() => handleDelete(item.name)}><i className="fa fa-solid fa-trash"></i></button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cart;