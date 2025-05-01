import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import apiClient from 'src/api/apiClient';





export const getItemsinCart = createAsyncThunk("cart/getItemsinCart", async (_, thunkApi) => {

    const { rejectWithValue, fulfillWithValue, getState } = thunkApi
    const { cart } = getState() as RootState   //to get current selected items == useAppSelecor(dtate=>state.cart.items) 

    const itemsArray = Object.keys(cart.items)
    const concatenatedId = itemsArray.map((id) => `id=${id}`).join("&")



    if (!itemsArray.length) {
        return fulfillWithValue([]) //علشان ميستدعيش كل الداتا حتى لو الكارت فاضية
    }

    try {
        // const apiUrl = `http://localhost:5005/products/?${concatenatedId}`

        const response = await apiClient.get(`/api/products/?${concatenatedId}`)
        // const response = await axios.get(apiUrl)
        return response.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message)
        } else {
            return rejectWithValue("unexpected Error")
        }
    }
})
