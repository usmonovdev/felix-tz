import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    books: []
  },
  reducers: {
    getBooksStart: (state, action) => {
      state.loading = true
    },
    getBooksSuccess: (state, action) => {
      state.loading = false
      state.books = action.payload
      state.error = null
    },
    getBooksFail: (state, action) => {
      state.loading = false,
      state.books = []
      state.error = action.payload
    }
  }
})

export const { getBooksStart, getBooksSuccess, getBooksFail } = booksSlice.actions
export default booksSlice.reducer