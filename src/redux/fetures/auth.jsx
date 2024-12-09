import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage
const userFromStorage = JSON.parse(localStorage.getItem("user")) || {};
const isLogin = Boolean(localStorage.getItem("user"));

const initialState = {
  error: null,
  loading: false,
  isLogin: isLogin, // Check if user exists in localStorage
  user: userFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login Reducer
    login(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isLogin = true;

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    // Logout Reducer
    logout(state) {
      state.loading = false;
      state.user = {};
      state.isLogin = false;

      // Clear user from localStorage
      localStorage.removeItem("user");
    },

        // Start Loading Reducer
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },

    // Error Reducer
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
//   extraReducers: {},
});

export const { login, logout, startLoading, setError } = authSlice.actions;

export default authSlice.reducer;
