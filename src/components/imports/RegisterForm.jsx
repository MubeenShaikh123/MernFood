import React from 'react'

export default function RegisterForm(props) {
  const {error,setName,setLocation,setEmail,setPassword,handleSubmit}=props.registerData
  return (
    <div>
      <form method='post' className='form' onSubmit={handleSubmit}>
        <div className="form-group input-group ">
          <input type="text" className='input-text' onChange={(e)=>{setName(e.target.value)}} placeholder='Username' />
          <i className="icon fa fa-user fa-lg"></i>
        </div>
        <div className="form-group text-danger fw-bold text-center mb-1 ">
          {
            (error.field==="name")?error.message:''
          }
        </div>
        <div className="form-group input-group ">
          <input type="text" className='input-text' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email Address' />
          <i className="icon fa fa-regular fa-envelope fa-md"></i>
        </div>
        <div className="form-group text-danger fw-bold text-center mb-1 ">
          {
            (error.field==="email")?error.message:''
          }
        </div>
        <div className="form-group input-group ">
          <input type="text" className='input-text' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' />
          <i className="icon fa fa-lock fa-lg"></i>
        </div>
        <div className="form-group text-danger fw-bold text-center mb-1 ">
          {
            (error.field==="password")?error.message:''
          }
        </div>
        <div className="form-group input-group ">
          <input type="text" className='input-text' onChange={(e)=>{setLocation(e.target.value)}} placeholder='Location' />
          <i className="icon fa fa-map-marker fa-lg"></i>
        </div>
        <div className="form-group text-danger fw-bold  text-center ">
          {
            (error.field==="unknown"||!error.field)?error.message:''
          }
        </div>
        <div className="button-group form-group">
          <button className='btn primary-button'>Register</button>
        </div>
      </form>
    </div>
  )
}
