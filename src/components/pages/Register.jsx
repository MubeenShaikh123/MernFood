import RegisterForm from '../imports/RegisterForm'
import { useState } from 'react'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { userRegister } from '../../redux/actions'
import { Link, useNavigate } from 'react-router-dom'
export default function Register() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [location,setLocation]=useState('')
  const [error, setError] = useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSubmit=(event)=>{
    event.preventDefault();
    const user={
      email,
      password,
      location,
      name
    }
    console.log(user)
    const register=dispatch(userRegister(user))
    register
    .then((data)=>navigate('/login'))
    .catch((error)=>{
      console.log(error.error)
        setError(error.error[0])
    })
  }
  const registerData={
    error,setName,setEmail,setPassword,setLocation,handleSubmit
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
          <RegisterForm registerData={registerData}/>
        </div>
      </div>
    </div>
  )
}
