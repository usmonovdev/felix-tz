import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: null,
        user: [],
        isLoggedIn: false
    },
    reducers: {
        registerUserStart: (state, action) => {
            state.loading = true
        },
    }
})

export const { registerUserStart } = userSlice.actions
export default userSlice.reducer