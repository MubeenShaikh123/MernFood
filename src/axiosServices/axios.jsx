import axios from "axios"

// const baseUrl = 'https://mernfoodserver.onrender.com/api'
const baseUrl = 'http://localhost:4000/api'

export const login = (userCredentials) => {
  return axios.post(`${baseUrl}/login`, userCredentials)
    .then((response) => {
      localStorage.setItem('x-access-token', response.data.token)
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error.response.data)
    })
}

export const register = (userCredentials) => {
  return axios.post(`${baseUrl}/register`, userCredentials)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error.response.data)
    })
}

export const logout = () => {
  localStorage.removeItem('x-access-token')
  return { msg: 'Logout successful' }
}

export const sendOtp = (userMail) => {
  return axios.post(`${baseUrl}/sendOtp`, userMail)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error.response.data)
    })
}

export const sendOtpUnregistered = (userMail) => {
  return axios.post(`${baseUrl}/sendOtpUnregistered`, userMail)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
}

export const verifyOtp = (verificationData) => {
  return axios
    .post(`${baseUrl}/verifyOtp`, verificationData)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

export const changePassword = (userPasswords) => {

  return axios.post(`${baseUrl}/changePassword`, userPasswords)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

export const addMenu = (menuData) => {
  return axios.post(`${baseUrl}/addmenu`, menuData)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error.response.data)
    })
}

export const removeMenu = (menuData) => {
  return axios.post(`${baseUrl}/removemenu`, menuData)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error.response.data)
    })
}

export const checkout = (checkoutData) => {
  return axios.delete(`${baseUrl}/checkout/${checkoutData.username}`)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response.data);
  });
}
