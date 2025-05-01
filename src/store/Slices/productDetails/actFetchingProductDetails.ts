import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import apiClient from 'src/api/apiClient';




export const fetchingProductDetails = createAsyncThunk('productDetailsSlice/fetchingProductDetails', async (id: number, thunkApi) => {

    const { rejectWithValue } = thunkApi

    // const apiUrl = `http://localhost:5005/products/?id=${id}`
    try {
        const response = await apiClient.get(`/api/products/?id=${id}`)
        // const response = await axios.get(apiUrl)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message)
        } else {
            return rejectWithValue("Unexpected Error")
        }
    }

})