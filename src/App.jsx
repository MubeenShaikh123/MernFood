import './App.css';
import {Route,Routes} from 'react-router-dom'
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Cart from './components/imports/Cart';
import ForgotPass from './components/imports/ForgotPassword/ForgotPass';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/register' element={<Register/>}></Route>
        <Route exact path='/mycart' element={<Cart/>}></Route>
        <Route exact path='/forgotPassword' element={<ForgotPass/>}></Route>
      </Routes>
    </>
  )
}

export default App;