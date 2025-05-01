import { createSlice } from "@reduxjs/toolkit";
import actGettingRegisterData from "./actAuth/actGettingData";
import actLogInData from "./actAuth/actLogInData";
import { TLoading } from "@customtypes/TLoading.types";




interface IRegister {
    accessToken: string | null,
    user: {
        id: number,
        fName?: string,
        lName?: string,
        email?: string,

    } | null,
    loading: TLoading
    error: string | null
}




const initialState: IRegister = {
    loading: 'idle',
    error: null,
    accessToken: null,
    user: null
}


const registerSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        resetError: (state) => {

            state.error = null

        },
        resetForm: (state) => {
            if (state.loading === "succeeded" && !state.error) {
                state.loading = "idle"
                state.error = null
            }
        }

        ,
        logOutCurrentUser: (state) => {

            state.accessToken = null
            state.user = null

            localStorage.removeItem("auth")

        }

    },
    extraReducers: (builder) => {

        builder.addCase(actGettingRegisterData.pending, (state) => {
            state.loading = "pending"
            state.error = null

        })
        builder.addCase(actGettingRegisterData.fulfilled, (state) => {
            state.loading = "succeeded"



        })
        builder.addCase(actGettingRegisterData.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof (action.payload) === "string") {
                state.error = action.payload
            }

        })
        // login 

        builder.addCase(actLogInData.pending, (state) => {
            state.loading = "pending"
            state.error = null

        })
        builder.addCase(actLogInData.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.accessToken = action.payload.accessToken
            state.user = action.payload.user





        })
        builder.addCase(actLogInData.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof (action.payload) === "string") {
                state.error = action.payload
            }

        })

    }

})


export { actGettingRegisterData, actLogInData }
export const registerReducer = registerSlice.reducer
export const { resetForm, logOutCurrentUser, resetError } = registerSlice.actions