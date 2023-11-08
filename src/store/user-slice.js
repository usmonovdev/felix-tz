import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    user: [],
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false
  },
  reducers: {
    registerUserStart: (state, action) => {
      state.loading = true
    },
    registerUserSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
      localStorage.setItem("isLoggedIn", true)
      localStorage.setItem("secret", action.payload.secret)
      localStorage.setItem("key", action.payload.key)
      state.isLoggedIn = true
      state.error = null
    },
    registerUserError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    loginUserStart: (state, action) => {
      state.loading = true
    },
    loginUserSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
      localStorage.setItem("isLoggedIn", true)
      localStorage.setItem("secret", action.payload.secret)
      localStorage.setItem("key", action.payload.key)
      state.isLoggedIn = true
      state.error = null
    },
    loginUserError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    logOut: (state, action) => {
      state.isLoggedIn = false
      state.user = []
    }
  }
})

export const { registerUserStart, registerUserSuccess, registerUserError, loginUserStart, loginUserSuccess, loginUserError, logOut } = userSlice.actions
export default userSlice.reducer