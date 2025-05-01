import { TCategories } from "@customtypes/Categories.types";
import { TLoading } from "@customtypes/TLoading.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from 'src/api/apiClient';

interface ICategory {
    categorydata: TCategories[],
    loading: TLoading
    error: string | null

}

const initialState: ICategory = {
    categorydata: [],
    loading: "idle",
    error: null
}

// action

const fetchingCategory = createAsyncThunk('category/fetchingCategory', async (_, thunkApi) => {

    const { rejectWithValue } = thunkApi

    // const apiUrl = 'http://localhost:5005/categories'
    try {
        const response = await apiClient.get("/api/categories")
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message)
        } else {
            return rejectWithValue("Unexpected Error")
        }
    }
})


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {

        // cleanUpCategories: (state) => {
        //     state.categorydata = []
        // }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchingCategory.pending, (state) => {
            state.loading = 'pending'

        })
        builder.addCase(fetchingCategory.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.categorydata = action.payload
        })
        builder.addCase(fetchingCategory.rejected, (state, action) => {

            state.loading = "failed"
            if (action.error && typeof action.error.message === "string") {
                state.error = action.error.message
            } else {
                state.error = "Failed to fetch products"
            }
        })
    }
})


export { fetchingCategory }
// export const { cleanUpCategories } = categorySlice.actions
export const categorySliceReducer = categorySlice.reducer