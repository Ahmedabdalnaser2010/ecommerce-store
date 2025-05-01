import apiClient from 'src/api/apiClient';

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const getUserOrderByID = createAsyncThunk("placeOrder/getUserOrderByID", async (OrderID: string, thunkApi) => {

    const { rejectWithValue } = thunkApi



    try {
        const res = await apiClient.get(`/api/orders/${OrderID}`)
        // const res = await axios.get(`http://localhost:5005/orders/${OrderID}`)

        return res.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data || err.message)

        } else {
            return rejectWithValue("Unexpected Error")
        }
    }

})



export default getUserOrderByID