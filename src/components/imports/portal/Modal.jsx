import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import Cart from '../Cart'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutAction } from '../../../redux/actions';
import Swal from 'sweetalert2';

export default function Modal({ onClose }) {
  const [isLoading, setIsLoading] = useState(false)
  const items = useSelector((state) => state.cart.items)
  const username = useSelector((state) => state.cart.email) || "MiyaBhai"
  const dispatch = useDispatch()
  const user = { username }
  const onCheckout = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true)
    const check = dispatch(checkoutAction(user))
    check
      .then((data) => {
        setIsLoading(false)
        Swal.fire({
          title: 'Checkout Successful',
          icon: 'success',
          showConfirmButton: false,
          timer: 1200
        })
      })
      .catch((error) => {
        setIsLoading(false)
        Swal.fire({
          title: 'Checkout Failed',
          icon: 'error',
          showConfirmButton: false,
          timer: 1200
        })
      })
  }

  return ReactDOM.createPortal(
    <div className="modal-parent">
      <div className="modal-content">
        <div className="m-auto mt-2">
          {
            items.length === 0 ? <h1 className='text-center '>No Items Here</h1> :
              <>
                <table className='d-none d-sm-table table table-responsive cartTable'>
                  <Cart></Cart>
                </table>
                <div className="tableDiv d-sm-none">
                  <Cart></Cart>
                </div>
                <button style={{ cursor: isLoading ? 'wait' : 'pointer' }} className='checkout-button btn btn-success ' onClick={onCheckout}>{isLoading ? 'Loading...' : 'Checkout'}</button>
              </>
          }

        </div>
        <button className='close-button' onClick={onClose}><i className="fa fa-times fa-lg"></i></button>
      </div>
    </div>,
    document.getElementById('cartRoot')
  )
}
