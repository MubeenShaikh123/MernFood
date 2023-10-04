import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
    name: 'Store',
    initialState: {
        isLoggedIn: false,
        searchText: '',
        items: []
    },
    reducers: {
        search: (state, action) => {
            state.searchText = action.payload
        },
        addItemToCart: (state, action) => {
            state.items.push(action.payload)
        },
        removeItemFromCart: (state, action) => {
            const itemToBeRemoved = state.items.findIndex(item => item.id === action.payload)
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
        }
    }
})

export const { addItemToCart, removeItemFromCart, search, loginFailure, loginSuccess, registerFailure, registerSuccess, logoutSuccess } = storeSlice.actions
export default storeSlice.reducer;