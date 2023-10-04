import React from 'react'
import ReactDOM from 'react-dom';
import Cart from '../Cart'
import { useSelector } from 'react-redux'

export default function Modal({ onClose }) {
  const items = useSelector((state) => state.cart.items)
  return ReactDOM.createPortal(
    <div className="modal-parent">
      <div className="modal-content">
        <div className="m-auto mt-2">
          { 
          items.length===0?<h1 className='text-center '>No Items Here</h1>:
          <>
          <table className='d-none d-sm-table table table-responsive cartTable'>
            <Cart></Cart>
          </table>
          <div className="tableDiv d-sm-none">
            <Cart></Cart>
          </div>
          </>
          }

        </div>
        <button className='close-button' onClick={onClose}><i className="fa fa-times fa-lg"></i></button>
      </div>
    </div>,
    document.getElementById('cartRoot')
  )
}
