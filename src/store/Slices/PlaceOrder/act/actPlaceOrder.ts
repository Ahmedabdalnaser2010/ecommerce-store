import { TOrder } from "@customtypes/TOrder.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from 'src/api/apiClient';











const postUserOrder = createAsyncThunk("placeOrder/postUserOrder", async (orderDataContent: TOrder, thunkApi) => {

    const { rejectWithValue } = thunkApi



    try {
        const res = await apiClient.post("/orders", orderDataContent)
        // const res = await axios.post("http://localhost:5005/orders", orderDataContent)

        return res.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data || err.message)

        } else {
            return rejectWithValue("Unexpected Error")
        }
    }

})



export default postUserOrder