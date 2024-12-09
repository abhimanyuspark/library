import { configureStore } from '@reduxjs/toolkit'
import authSlice from "../redux/fetures/auth"
import booksSlice from "../redux/fetures/books"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    books: booksSlice,
  },
})
