import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { userlogout } from '../../../redux/actions'
import { useState } from 'react'
import Modal from '../portal/Modal'

export default function NavLoggedIn() {
    const [cartView,setCartView]=useState(false)
    const dispatch=useDispatch()
    const handleOpenCart = () => {
        setCartView(true)
      }
    
      const handleClose = () => {
        setCartView(false)
      }
    return (
        <>
            <li className="nav-item">
                <button className="nav-link"  onClick={handleOpenCart}>My Cart</button>
                {cartView?<Modal onClose={handleClose}></Modal>:''}
            </li>
            <li className="nav-item">
                <Link className="nav-link" onClick={()=>{
                    dispatch(userlogout())
                }} to="/login">Logout</Link>
            </li>
        </>
    )
}
