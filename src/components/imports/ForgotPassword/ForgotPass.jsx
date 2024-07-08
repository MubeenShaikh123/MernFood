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
  const [isLoading, setIsLoading] = useState(false)
  const handleSendOtp = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (isLoading) {
      return;
    }
    setIsLoading(true)
    setOtpErr([])
    setVerifyErr([])
    const Otp = dispatch(sendOtp({ email }))
    Otp
      .then((data) => {
        setIsOtpSent(true)
        setIsLoading(false)
      })
      .catch((error) => {
        setOtpErr(error.error[0])
        setIsLoading(false)
      })
  }

  const handleVerifyOtp = (event) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true)
    setVerifyErr([])
    dispatch(verifyOtp({ email, otp }))
      .then((data) => {
        setIsOtpVerified(true)
        setIsLoading(false)
      })
      .catch((error) => {
        setVerifyErr(error.error[0])
        setIsLoading(false)
      });
  };

  const handleResendOtp = (event) => {
    handleSendOtp(event);
  }

  const handleChangePassword = (event) => {
    event.preventDefault();
    setChangePassErr([])
    if (isLoading) {
      return;
    }
    setIsLoading(true)
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
        navigate('/login')
        setIsLoading(false)
      })
      .catch((error) => {
        setChangePassErr({ message: error });
        setIsLoading(false)
      });
  };

  return (
    <div className="centered-login">
      <div className={`loginform ${isOtpVerified ? '' : 'd-flex align-items-center'}`}>
        {
          isOtpSent ?
            isOtpVerified ?
              <ChangePass data={{ changePassErr, setPassword, setConfirmPassword, handleChangePassword, isLoading }}></ChangePass>
              :
              <VerifyOtp data={{ handleVerifyOtp, handleResendOtp, setOtp, verifyErr, isLoading }}></VerifyOtp>
            :
            <SendOtp data={{ handleSendOtp, setEmail, otpErr, isLoading }}></SendOtp>
        }
      </div>
    </div>
  )
}
