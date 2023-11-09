import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    books: [],
    addBooks: false,
    editBooks: false,
    editBooksData: []
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
    },
    addBooksOpen: (state, action) => {
      state.addBooks = !state.addBooks
    },
    addBookSuccess: (state, action) => {
      state.books = action.payload
    },
    editBooksOpen: (state, action) => {
      state.editBooks = true,
        state.editBooksData = action.payload
    },
    editBooksClose: (state, action) => {
      state.editBooks = false,
        state.editBooksData = []
    }
  }
})

export const { getBooksStart, getBooksSuccess, getBooksFail, addBooksOpen, editBooksOpen, editBooksClose, addBookSuccess } = booksSlice.actions
export default booksSlice.reducer