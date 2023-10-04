import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginForm(props) {
  const { error, setEmail, setPassword, handleSubmit } = props.loginData
  return (
    <div>
      <form method='post' className='form' onSubmit={handleSubmit}>
        <div className="form-group input-group ">
          <input type="text" className='input-text' onChange={(e) => { setEmail(e.target.value) }} placeholder='Email Address' />
          <i className="icon fa fa-regular fa-envelope fa-md"></i>
        </div>
        <div className="form-group text-danger fw-bold text-center mb-1 ">
          {
            (error.field === "email") ? error.message : ''
          }
        </div>
        <div className="form-group input-group ">
          <input type="text" className='input-text' onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />
          <i className="icon fa fa-lock fa-lg"></i>
        </div>
        <div className="form-group text-danger fw-bold  text-center ">
          {
            (error.field === "password" || !error.field) ? error.message : ''
          }
        </div>
        <div className="form-group text-danger fw-bold text-start ms-4">
          {
            <Link className='text-danger ' to='/forgotPassword'>Forgot Password?</Link>
          }
        </div>
        <div className="button-group form-group">
          <button className='btn primary-button'>Login</button>
        </div>
      </form>
    </div>
  )
}
