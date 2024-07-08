import React from 'react'

export default function SendOtp(props) {
  const { handleSendOtp, setEmail, otpErr ,isLoading} = props.data
  return (
    <form method='post' className='form' onSubmit={handleSendOtp}>
      <div className="form-group input-group ">
        <input type="text" className='input-text' onChange={(e) => { setEmail(e.target.value.toLowerCase()) }} placeholder='Email Address' />
        <i className="icon fa fa-regular fa-envelope fa-md"></i>
      </div>
      <div className="form-group text-danger fw-bold text-center mb-1 ">
        {
          otpErr ? otpErr.message : ''
        }
      </div>
      <div className="button-group form-group">
        <button style={{ cursor: isLoading ? 'wait' : 'pointer'}}  className='btn primary-button'>{isLoading ? 'Loading...' : 'Send OTP'}</button>
      </div>
    </form>
  )
}
