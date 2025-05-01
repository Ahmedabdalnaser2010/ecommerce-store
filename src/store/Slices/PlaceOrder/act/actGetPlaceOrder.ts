
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from 'src/api/apiClient';



const getUserOrder = createAsyncThunk("placeOrder/getUserOrder", async (_, thunkApi) => {

    const { rejectWithValue } = thunkApi



    try {
        const res = await apiClient.get("/api/orders")
        // const res = await axios.get("http://localhost:5005/orders")

        return res.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data || err.message)

        } else {
            return rejectWithValue("Unexpected Error")
        }
    }

})



export default getUserOrder