import * as Authservice from '../axiosServices/axios'
import { loginFailure, loginSuccess, registerFailure, registerSuccess, logoutSuccess, setEmail, addItemToCart, removeItemFromCart } from './reducer'

export const userLogin = (userCredentials) => async (dispatch) => {
  return Authservice.login(userCredentials)
    .then((data) => {
      dispatch(loginSuccess(data))
      return Promise.resolve(data)
    })
    .catch((error) => {
      dispatch(loginFailure(error.errors))
      return Promise.reject(error)
    })
}

export const userRegister = (userCredentials) => async (dispatch) => {
  return Authservice.register(userCredentials)
    .then((data) => {
      dispatch(registerSuccess(data))
      return Promise.resolve(data)
    })
    .catch((error) => {
      dispatch(registerFailure(error))
      return Promise.reject(error)
    })
}

export const userlogout = () => (dispatch) => {
  const msg = Authservice.logout()
  dispatch(logoutSuccess(msg))
  Promise.resolve(msg)
}

export const sendOtp = (userMail) => (dispatch) => {
  return Authservice.sendOtp(userMail)
    .then((data) => {
      dispatch(setEmail(data))
      return Promise.resolve(data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export const sendOtpUnregistered = (userMail) => (dispatch) => {
  return Authservice.sendOtpUnregistered(userMail)
    .then((data) => {
      return Promise.resolve(data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};


export const verifyOtp = (verificationData) => (dispatch) => {
  return Authservice.verifyOtp(verificationData)
    .then((data) => {
      return Promise.resolve(data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const changePassword = (userPasswords) => (dispatch) => {
  return Authservice.changePassword(userPasswords)
    .then((data) => {
      return Promise.resolve(data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const addMenuItem = (menuData) => async (dispatch) => {
  return Authservice.addMenu(menuData)
    .then((data) => {
      dispatch(addItemToCart(menuData.cartData[0]));
      return Promise.resolve(data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export const removeMenuItem = (menuData) => async (dispatch) => {
  return Authservice.removeMenu(menuData)
    .then((data) => {
      dispatch(removeItemFromCart(menuData.name))
      return Promise.resolve(data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
