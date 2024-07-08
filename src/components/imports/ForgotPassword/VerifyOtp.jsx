import React from 'react'
import OtpInput from './OtpInput'

export default function VerifyOtp(props) {
  const { handleVerifyOtp, handleResendOtp, setOtp, verifyErr,isLoading } = props.data
  return (
    <form method='post' className='form' >
      <OtpInput numInputs={4} setOtp={setOtp}></OtpInput>
      <div className="form-group text-danger fw-bold text-center mb-1 ">
        {
          verifyErr ? verifyErr.message : ''
        }
      </div>
      <div className='button-group form-group d-flex flex-column flex-sm-row   justify-content-between '>
        <button style={{ cursor: isLoading ? 'wait' : 'pointer'}} className='btn primary-button me-1 mb-3 mb-sm-0 ' onClick={handleResendOtp}>{isLoading ? 'Loading...' : 'Resend'}</button>
        <button style={{ cursor: isLoading ? 'wait' : 'pointer'}} className='btn primary-button ms-1 ' onClick={handleVerifyOtp}>{isLoading ? 'Loading...' : 'Verify'}</button>
      </div>
    </form>
  )
}
