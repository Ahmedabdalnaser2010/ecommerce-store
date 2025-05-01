import { createSlice } from "@reduxjs/toolkit";
import postUserOrder from "./act/actPlaceOrder";
import { TOrder } from "@customtypes/TOrder.types";
import { TLoading } from "@customtypes/TLoading.types";
import getUserOrder from "./act/actGetPlaceOrder";
import getUserOrderByID from "./act/actGetOrderByID";


export interface IOrder {
    order: TOrder[]
    loading: TLoading
    error: string | null
}


const initialState: IOrder = {
    order: [],
    loading: 'idle',
    error: null,
}





const placeOrderSlice = createSlice({
    name: "placeOrder",
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder.addCase(postUserOrder.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(postUserOrder.fulfilled, (state) => {
            state.loading = "succeeded"
            state.error = null

        })
        builder.addCase(postUserOrder.rejected, (state, action) => {
            state.loading = "failed"
            if (action.error && typeof action.error.message === "string") {
                state.error = action.error.message
            } else {
                state.error = 'Failed to get data'
            }

        })
        // ///////////////////////////////////////////////////////////
        builder.addCase(getUserOrder.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(getUserOrder.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.error = null
            state.order = action.payload



        })
        builder.addCase(getUserOrder.rejected, (state, action) => {
            state.loading = "failed"
            if (action.error && typeof action.error.message === "string") {
                state.error = action.error.message
            } else {
                state.error = 'Failed to get data'
            }

        })
        // ///////////////////////////////////////////////////////////////////////////

        builder.addCase(getUserOrderByID.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(getUserOrderByID.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.error = null
            state.order = action.payload


        })
        builder.addCase(getUserOrderByID.rejected, (state, action) => {
            state.loading = "failed"
            if (action.error && typeof action.error.message === "string") {
                state.error = action.error.message
            } else {
                state.error = 'Failed to get data'
            }

        })
    }
})


export const placeOrderReducer = placeOrderSlice.reducer
export { postUserOrder, getUserOrder, getUserOrderByID }