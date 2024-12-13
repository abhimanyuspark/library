import { createSlice } from "@reduxjs/toolkit";
import { loginToBoth, signupToBoth, userDetails } from "../server/server";

const userFromStorage = JSON.parse(localStorage.getItem("userToken")) || {};
const isLogin = Boolean(localStorage.getItem("userToken"));

const initialState = {
  appUser: userFromStorage,
  loading: false,
  error: null,
  isLogin: isLogin,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.loading = false;
      state.appUser = null;
      state.isLogin = false;
      // Clear user from localStorage
      localStorage.removeItem("userToken");
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle applogin
      .addCase(loginToBoth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginToBoth.fulfilled, (state, action) => {
        state.loading = false;
        state.appUser = action.payload;
        state.isLogin = true;
      })
      .addCase(loginToBoth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      // Handle appsignup
      .addCase(signupToBoth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupToBoth.fulfilled, (state, action) => {
        state.loading = false;
        state.appUser = action.payload;
        state.isLogin = true;
      })
      .addCase(signupToBoth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      // Handle user details
      .addCase(userDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.appUser = action.payload;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
