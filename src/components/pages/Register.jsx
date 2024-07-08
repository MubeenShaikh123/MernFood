import RegisterForm from '../imports/RegisterForm'
import { useState } from 'react'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { sendOtpUnregistered, userRegister, verifyOtp } from '../../redux/actions'
import { Link, useNavigate } from 'react-router-dom'
import VerifyOtp from '../imports/ForgotPassword/VerifyOtp'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')
  const [filled, setFilled] = useState(false)
  const [otp, setOtp] = useState('')
  const [verifyErr, setVerifyErr] = useState([])
  const [icon, setIcon] = useState(' fa fa-lock fa-lg')
  const [type, setType] = useState('password')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const Otp = dispatch(sendOtpUnregistered({ email, name, password, location }))
    Otp
      .then((data) => {
        setFilled(true)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error.error[0])
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
        setIsLoading(false)
        const user = {
          email,
          password,
          location,
          name
        }
        const register = dispatch(userRegister(user))
        register
          .then((data) => {
            navigate('/login')
          })
          .catch((error) => {
            setError(error.error[0])
            setVerifyErr(error.error[0])
          })
      })
      .catch((error) => {
        setIsLoading(false)
        setVerifyErr(error.error[0])
      });
  };

  const handleResendOtp = (event) => {
    event.preventDefault();
    setVerifyErr([])
    handleSubmit(event);
  }

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(' fa fa-solid fa-unlock ')
      setType('text')
    } else {
      setIcon(' fa fa-lock fa-lg');
      setType('password')
    }
  }

  const registerData = {
    error, setName, setEmail, setPassword, setLocation, handleSubmit, isLoading
  }

  const verifyData = {
    handleVerifyOtp, handleResendOtp, setOtp, verifyErr, isLoading
  }

  const showPass = {
    icon, type, handleToggle
  }

  return (
    <div>
      <div className="container-fluid centered-login">
        <div className='loginform p-1'>
          <div className="page-buttons p-1">
            <Link to='/login'>
              <button>Login</button>
            </Link>
            <Link to='/register'>
              <button className='active '>Register</button>
            </Link>
          </div>
          {
            filled ?
              <VerifyOtp data={verifyData}></VerifyOtp>
              :
              <RegisterForm registerData={{ registerData, showPass }} />
          }
        </div>
      </div>
    </div>
  )
}
