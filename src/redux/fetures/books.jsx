import { createSlice } from "@reduxjs/toolkit";
import { fetchBookDetails, fetchBooks } from "../server/server";

const initialState = {
  books: {},
  loading: false,
  error: null,
  book: {},
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    removeBooks: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeBooks } = booksSlice.actions;

export default booksSlice.reducer;
