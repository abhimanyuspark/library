import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://openlibrary.org/search.json";

const details = "https://openlibrary.org/works/";

const authURL = "https://6758099f60576a194d0e735c.mockapi.io/users";

export const fetchBooks = createAsyncThunk(
  "books",
  async ({ query, page, resultsPerPage }) => {
    const response = await axios.get(
      `${url}?q=${query}&limit=${resultsPerPage}&offset=${page}&ebooks=true`
    );
    return response.data;
  }
);

export const fetchBookDetails = createAsyncThunk("bookDetails", async (id) => {
  const response = await axios.get(`${details}${id}.json?ebooks=true`);
  return response.data;
});

export const signupToBoth = createAsyncThunk(
  "auth/signupToBoth",
  async (data, { rejectWithValue }) => {
    try {
      // Signup to your app
      const appResponse = await axios.post(authURL, data);
      const appUser = appResponse.data; // Assuming the API returns user data

      // Signup to Archive.org
      // const archiveResponse = await axios.post("https://archive.org/services/signup", data);
      // const archiveUser = archiveResponse.data; // Assuming the API returns user data

      if (appUser) {
        localStorage.setItem("userToken", JSON.stringify(appUser?.email));
        // Return both responses
        return {
          appUser,
          // archiveUser
        };
      }
    } catch (error) {
      // Handle errors from either signup
      return rejectWithValue({ email: "Signup failed" });
    }
  }
);

// Combined signup for your app and Archive.org
export const loginToBoth = createAsyncThunk(
  "auth/loginToBoth",
  async (data, { rejectWithValue }) => {
    const { email, password } = data;
    try {
      // Login to your app
      const response = await axios.get(`${authURL}?email=${email}`);
      const appUser = response.data[0]; // Assuming you expect only one user

      // Signup to Archive.org
      // const archiveResponse = await axios.post("https://archive.org/services/login", data);
      // const archiveUser = archiveResponse.data; // Assuming the API returns user data

      // Return both responses
      if (!appUser) {
        return rejectWithValue({ email: "User not found" });
      }

      if (appUser.password === password) {
        localStorage.setItem("userToken", JSON.stringify(appUser?.email));
        // Return both responses
        return {
          appUser,
          // archiveUser
        };
      } else {
        return rejectWithValue({ password: "Please enter valid credentials" });
      }
    } catch (error) {
      return rejectWithValue({ email: "Error occurred while authenticating" });
    }
  }
);
