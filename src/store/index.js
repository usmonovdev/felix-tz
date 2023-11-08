import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import booksSlice from './books-slice';

export default configureStore({
    reducer: {
        user: userSlice,
        books: booksSlice
    }
})