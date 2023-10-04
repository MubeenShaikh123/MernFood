import React, { useState } from 'react'
import { useDispatch } from 'react-redux/es/exports'
import LoginForm from '../imports/LoginForm'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../../redux/actions'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = { email, password }
    const login = dispatch(userLogin(user))
    login
      .then((data) => {
        console.log('data', data)
        navigate('/')
      })
      .catch((error) => {
        console.log(error.error)
        setError(error.error[0])
        })
  }

  const loginData = {
    error, setEmail, setPassword, handleSubmit
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
        <LoginForm loginData={loginData} />
      </div>
    </div>
  )
}
