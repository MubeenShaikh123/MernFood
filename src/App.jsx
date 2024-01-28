import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Cart from './components/imports/Cart';
import ForgotPass from './components/imports/ForgotPassword/ForgotPass';
import { useSelector } from 'react-redux';
import SendOtp from './components/imports/ForgotPassword/SendOtp';

function App() {
  const isLoggedIn = useSelector(state => state.cart.isLoggedIn);
  return (
    <>
      <Routes>
        <Route exact path='/' element={isLoggedIn?<Home />:<Navigate to="/login"></Navigate>}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/myCart' element={isLoggedIn?<Cart />:<Navigate to="/login"></Navigate>}></Route>
        <Route exact path='/forgotPassword' element={<ForgotPass />}></Route>
        <Route SendOtp path='/sendOtp' element={<SendOtp />}></Route>
      </Routes>
    </>
  )
}

export default App;