import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
    name: 'Store',
    initialState: {
        email: '',
        isLoggedIn: false,
        searchText: '',
        items: []
    },
    reducers: {
        search: (state, action) => {
            state.searchText = action.payload
        }
        ,
        addItemToCart: (state, action) => {
            const itemToBeRemoved = state.items.findIndex(item => item.name === action.payload.name)
            if (itemToBeRemoved !== -1) {
                state.items.splice(itemToBeRemoved, 1)
            }
            state.items.push(action.payload)
        },
        removeItemFromCart: (state, action) => {
            const itemToBeRemoved = state.items.findIndex(item => item.name === action.payload)
            if (itemToBeRemoved !== -1) {
                state.items.splice(itemToBeRemoved, 1)
            }
        },
        loginSuccess: (state, action) => {
            state.isLoggedIn = true
        },
        loginFailure: (state, action) => {
            state.isLoggedIn = false
        },
        registerSuccess: (state, action) => {
            state.isLoggedIn = false
        },
        registerFailure: (state, action) => {
            state.isLoggedIn = false
        },
        logoutSuccess: (state, action) => {
            state.isLoggedIn = false
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        checkoutSuccess: (state, action) => {
            state.items = [];
        }
    }
})

export const { addItemToCart, removeItemFromCart, search, addEmail, loginFailure, loginSuccess, registerFailure, registerSuccess, logoutSuccess, setEmail, checkoutSuccess } = storeSlice.actions
export default storeSlice.reducer;