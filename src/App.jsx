/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { Route, Routes, Navigate,useNavigate } from 'react-router-dom'
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Cart from './components/imports/Cart';
import ForgotPass from './components/imports/ForgotPassword/ForgotPass';
import { useDispatch, useSelector } from 'react-redux';
import SendOtp from './components/imports/ForgotPassword/SendOtp';
import { useEffect} from 'react';
import { loginSuccess, setEmail } from './redux/reducer';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isLoggedIn = false;
  useEffect(() => {
    const x_access_token = localStorage.getItem('x-access-token');
    if (!x_access_token) {
      console.log("No access token found on localstorage")
    }

    fetch('https://mern-food-app-l9yn.onrender.com/api/authenticate', {
      method: 'GET',
      headers: {
        'x-access-token': x_access_token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to authenticate');
        }
        return response.json();
      })
      .then(data => {
        dispatch(setEmail({ email: data.email }))
        dispatch(loginSuccess())
        isLoggedIn=true;
        navigate("./")
      })
      .catch(error => {
        console.error('Authentication error:', error);
      });
  }, []);
  isLoggedIn=useSelector(state => state.cart.isLoggedIn)
  // setIsLoggedin();
  console.log(isLoggedIn)
  return (
    <>
      <Routes>
        <Route exact path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login"></Navigate>}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/myCart' element={isLoggedIn ? <Cart /> : <Navigate to="/login"></Navigate>}></Route>
        <Route exact path='/forgotPassword' element={<ForgotPass />}></Route>
        <Route SendOtp path='/sendOtp' element={<SendOtp />}></Route>
      </Routes>
    </>
  )
}

export default App;