import React, { useState } from 'react'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { sendOtp, verifyOtp, changePassword } from '../../../redux/actions'
import SendOtp from './SendOtp'
import VerifyOtp from './VerifyOtp'
import ChangePass from './ChangePass'
import { useNavigate } from 'react-router-dom'

export default function ForgotPass(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [otpErr, setOtpErr] = useState([])
  const [verifyErr, setVerifyErr] = useState([])
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [changePassErr, setChangePassErr] = useState([]);
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  const handleSendOtp = (event) => {
    if (event) {
      event.preventDefault();
    }
    const Otp = dispatch(sendOtp({ email }))
    Otp
      .then((data) => {
        setIsOtpSent(true)
      })
      .catch((error) => {
        console.log("sendotp error",error)
        setOtpErr(error.error[0])
      })
  }

  const handleVerifyOtp = (event) => {
    event.preventDefault();
    dispatch(verifyOtp({ email, otp }))
      .then((data) => {
        setIsOtpVerified(true)
      })
      .catch((error) => {
        setVerifyErr(error.error[0])
      });
  };

  const handleResendOtp = (event) => {
    handleSendOtp(event);
  }

  const handleChangePassword = (event) => {
    event.preventDefault();
  
    const validatePassword = () => {
      return new Promise((resolve, reject) => {
        if (password === confirmPassword && password.length > 7) {
          resolve();
        } else if (password.length < 8) {
          reject('Password is too short');
        } else {
          reject('Password and Confirm Password do not match');
        }
      });
    };
  
    validatePassword()
      .then(() => {
        // Password and confirmPassword match, dispatch changePassword action
        return dispatch(changePassword({ email, password, confirmPassword }));
      })
      .then((data) => {
        // You can also redirect the user to another page
        console.log('Password changed successfully', data);
        navigate('/login')
      })
      .catch((error) => {
        console.log("error", error);
        console.log("changepasserr : ", changePassErr);
        setChangePassErr({ message: error });
      });
  };

  return (
    <div className="centered-login">
      <div className={`loginform ${isOtpVerified ? '' : 'd-flex align-items-center'}`}>
        {
          isOtpSent ?
            isOtpVerified ?
              <ChangePass data={{ changePassErr, setPassword, setConfirmPassword, handleChangePassword }}></ChangePass>
              :
              <VerifyOtp data={{ handleVerifyOtp, handleResendOtp, setOtp, verifyErr }}></VerifyOtp>
            :
            <SendOtp data={{ handleSendOtp, setEmail, otpErr }}></SendOtp>
        }
      </div>
    </div>
  )
}
