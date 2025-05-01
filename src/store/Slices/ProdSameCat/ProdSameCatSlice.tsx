import { TLoading } from "@customtypes/TLoading.types";
import { TProducts } from "@customtypes/TProducts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from 'src/api/apiClient';


interface IProducts {
    ProdSameCatsData: TProducts[]
    loading: TLoading
    error: null | string
}

const initialState: IProducts = {
    ProdSameCatsData: [],
    loading: "idle",
    error: null

}


const fetchingProdSameCatsData = createAsyncThunk('ProdSameCat/fetchingProdSameCatsData', async (category: string, thunkApi) => {

    const { rejectWithValue } = thunkApi
    // const apiUrl = `http://localhost:5005/products?category=${category}`
    try {
        const response = await apiClient.get<TProducts[]>(`/api/products?category=${category}`)
        // const response = await axios.get<TProducts[]>(apiUrl)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            rejectWithValue(error.response?.data.message || error.message)
        } else {
            return rejectWithValue("Unexpected Error")
        }

    }
})


const ProdSameCatSlice = createSlice({
    name: "ProdSameCat",
    initialState,
    reducers: {

        cleanUpProdSameCat: (state) => {
            state.ProdSameCatsData = []
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchingProdSameCatsData.pending, (state) => {
            state.loading = "pending"
        })
        builder.addCase(fetchingProdSameCatsData.rejected, (state, action) => {
            state.loading = "failed"
            if (action.error && typeof action.error.message === "string") {
                state.error = action.error.message
            } else {
                state.error = "Failed to fetch products"
            }

        })
        builder.addCase(fetchingProdSameCatsData.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.ProdSameCatsData = action.payload
        })
    }
})








export { fetchingProdSameCatsData }
export const { cleanUpProdSameCat } = ProdSameCatSlice.actions
export const ProdSameCatReducer = ProdSameCatSlice.reducer