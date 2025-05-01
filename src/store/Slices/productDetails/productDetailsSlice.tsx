import { createSlice } from "@reduxjs/toolkit";
import { TProducts } from "@customtypes/TProducts.types";
import { fetchingProductDetails } from "./actFetchingProductDetails";
import { TLoading } from "@customtypes/TLoading.types";


interface IProducts {
    productData: TProducts[]
    loading: TLoading
    error: null | string
}

const initialState: IProducts = {
    productData: [],
    loading: 'idle',
    error: null
}





const productDetailsSlice = createSlice({

    name: "productDetails",
    initialState,
    reducers: {

        cleanUpProductsDetails: (state) => {
            state.productData = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchingProductDetails.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(fetchingProductDetails.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.productData = action.payload;
        })
        builder.addCase(fetchingProductDetails.rejected, (state, action) => {
            state.loading = "failed"
            if (action.error && typeof action.error.message === "string") {
                state.error = action.error.message
            } else {
                state.error = "Failed to fetch products"
            }
        })

    }

})




export { fetchingProductDetails }
export const { cleanUpProductsDetails } = productDetailsSlice.actions
export const productDetailsReducer = productDetailsSlice.reducer