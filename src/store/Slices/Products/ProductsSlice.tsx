import { TLoading } from "@customtypes/TLoading.types";
import { TProducts } from "@customtypes/TProducts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from 'src/api/apiClient';


interface IProducts {
    productData: TProducts[]
    loading: TLoading
    error: null | string
}

const initialState: IProducts = {
    productData: [],
    loading: "idle",
    error: null

}


const fetchingProductsData = createAsyncThunk('products/getProductsData', async (_, thunkApi) => {

    const { rejectWithValue } = thunkApi
    // const apiUrl = "http://localhost:5005/products"
    try {
        const response = await apiClient.get("/api/products")
        // const response = await axios.get<TProducts>(apiUrl)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message)
        } else {
            return rejectWithValue("Unexpected Error")
        }
    }
})


const productSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {

        cleanUpProducts: (state) => {
            state.productData = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchingProductsData.pending, (state) => {
            state.loading = "pending"
        })
        builder.addCase(fetchingProductsData.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.productData = action.payload
        })
        builder.addCase(fetchingProductsData.rejected, (state, action) => {
            state.loading = "failed"
            if (action.error && typeof action.error.message === "string") {
                state.error = action.error.message
            } else {
                state.error = "Failed to fetch products"
            }
        })

    }
})








export { fetchingProductsData }
export const { cleanUpProducts } = productSlice.actions
export const productReducer = productSlice.reducer

// import { TProducts } from "@customtypes/TProducts";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import type { AxiosError } from "axios";

// interface IProductsState {
//     productData: TProducts[];
//     loading: 'idle' | 'pending' | 'succeeded' | 'failed';
//     error: string | null;
// }

// const initialState: IProductsState = {
//     productData: [],
//     loading: 'idle',
//     error: null
// };

// Properly typed async thunk
// export const fetchingProductsData = createAsyncThunk<
//     TProducts[], // Return type
//     void, // Argument type (none in this case)
//     { rejectValue: string } // Type for rejectWithValue
// >(
//     'products/fetchProductsData',
//     async (_, { rejectWithValue }) => {
//         const apiUrl = "http://localhost:5005/products";
//         try {
//             const response = await axios.get<TProducts[]>(apiUrl);
//             return response.data; // This will be TProducts[]
//         } catch (error) {
//             const axiosError = error as AxiosError<{ message?: string }>;
//             return rejectWithValue(
//                 axiosError.response?.data?.message ||
//                 axiosError.message ||
//                 "Failed to fetch products"
//             );
//         }
//     }
// );

// const productSlice = createSlice({
//     name: "products",
//     initialState,
//     reducers: {
//         cleanUpProducts: (state) => {
//             state.productData = [];
//             state.loading = 'idle';
//             state.error = null;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchingProductsData.pending, (state) => {
//                 state.loading = 'pending';
//                 state.error = null;
//             })
//             .addCase(fetchingProductsData.fulfilled, (state, action) => {
//                 state.loading = 'succeeded';
//                 // TypeScript now knows action.payload is TProducts[]
//                 state.productData = action.payload;
//             })
//             .addCase(fetchingProductsData.rejected, (state, action) => {
//                 state.loading = 'failed';
//                 // TypeScript knows action.payload is string (from rejectValue)
//                 state.error = action.payload || "Unknown error occurred";
//             });
//     }
// });

// export const { cleanUpProducts } = productSlice.actions;
// export const productReducer = productSlice.reducer