import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import apiClient from 'src/api/apiClient';




const getItemsinWishList = createAsyncThunk("WishList/getItemsinWishList", async (_, thunkApi) => {

    const { rejectWithValue, getState, fulfillWithValue } = thunkApi
    const { WishList, cart } = getState() as RootState


    const iteminCartsArr = Object.keys(cart.items)
    const selectedItemsArr = Object.keys(WishList.selectedItem)

    const filtering = selectedItemsArr.filter(item =>
        !iteminCartsArr.includes(item)
    )

    // const getSelectedItemsId = Object.keys(filtering)
    const concatenatedId = filtering.map((el) => (
        `id=${el}`
    )).join("&")


    // const apiUrl = `http://localhost:5005/products/?${concatenatedId}` // donot forget /? itis very important

    if (!filtering.length) {
        return fulfillWithValue([]) //علشان ميستدعيش كل الداتا حتى لو الكارت فاضية
    }

    try {

        const response = await apiClient.get(`/api/products/?${concatenatedId}`)
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



export { getItemsinWishList }