import * as Authservice from '../axiosServices/axios'
import { loginFailure, loginSuccess, registerFailure, registerSuccess, logoutSuccess } from './reducer'

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