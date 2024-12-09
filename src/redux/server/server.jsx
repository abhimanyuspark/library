import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const url = "https://openlibrary.org/search.json"

const details = "https://openlibrary.org/works/"

export const fetchBooks = createAsyncThunk("books", async({query, page, resultsPerPage}) => {
    const response = await axios.get(`${url}?q=${query}&limit=${resultsPerPage}&offset=${page}&ebooks=true`)
    return response.data
})

export const fetchBookDetails = createAsyncThunk("bookDetails", async(id)=>{
    const response = await axios.get(`${details}${id}.json?ebooks=true`)
    return response.data
})
