import React from 'react'

export default function ChangePass(props) {
  const { changePassErr, setPassword, setConfirmPassword, handleChangePassword, isLoading } = props.data
  return (
    <div>
      <form method='post' className='form' onSubmit={handleChangePassword}>
        <div className="form-group input-group ">
          <input type="text" className='input-text' onChange={(e) => { setPassword(e.target.value) }} placeholder='New Password' />
          <i className="icon fa fa-solid fa-unlock"></i>
        </div>
        <div className="form-group text-danger fw-bold text-center mb-1 ">
          {
            changePassErr ? changePassErr.message : ''
          }
        </div>
        <div className="form-group input-group ">
          <input type="password" className='input-text' onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder='Confirm New Password' />
          <i className="icon fa fa-lock fa-lg "></i>
        </div>
        <div className="button-group form-group">
          <button style={{ cursor: isLoading ? 'wait' : 'pointer' }} className='btn primary-button'>{isLoading ? 'Loading...' : 'Change Password'}</button>
        </div>
      </form>
    </div>
  )
}