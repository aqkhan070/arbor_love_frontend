import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchQuoteOptions = createAsyncThunk('quote/fetechQuoteOptions', async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quote/options`);
        return response.data;
    } catch (err) {
        console.error(err)
        return "Failed to fetch quote options"
    }
},)

export const createQuote = createAsyncThunk('quote/createQuote', async (payload) => {
    console.log("payload",payload)
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quote/create`, payload);
        return response.data;
    } catch (err) {
        console.error(err)
        return "Failed to create quote"
    }
})