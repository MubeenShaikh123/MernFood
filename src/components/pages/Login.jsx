import React, { useState } from 'react'
import { useDispatch } from 'react-redux/es/exports'
import LoginForm from '../imports/LoginForm'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../../redux/actions'

export default function Login() {
  const [email, setEmail] = useState('mubeenshaikh8072@gmail.com')
  const [password, setPassword] = useState('asdasdasd')
  const [error, setError] = useState('')
  const [icon, setIcon] = useState(' fa fa-lock fa-lg')
  const [type, setType] = useState('password')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = { email, password }
    const login = dispatch(userLogin(user))
    login
      .then((data) => {
        navigate('/')
      })
      .catch((error) => {
        setError(error.error[0])
      })
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


  const loginData = {
    error, setEmail, setPassword, handleSubmit
  }

  const showPass = {
    icon, type, handleToggle
  }

  return (
    <div className="container-fluid centered-login">
      <div className='loginform p-1'>
        <div className="page-buttons p-1">
          <Link to='/login'>
            <button className='active '>Login</button>
          </Link>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <LoginForm loginData={{ loginData, showPass }} />
      </div>
    </div>
  )
}
