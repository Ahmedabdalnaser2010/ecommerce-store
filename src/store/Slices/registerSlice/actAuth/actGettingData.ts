
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from 'src/api/apiClient';



type TFormData = {
    fName: string,
    lName: string,
    email: string,
    password: string
}


const actGettingRegisterData = createAsyncThunk("auth/actGettingData", async (formData: TFormData, thunk) => {

    const { rejectWithValue } = thunk

    try {

        const res = await apiClient.post("/register", formData)
        // const res = await axios.post("http://localhost:5005/users", formData)

        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {

            return (rejectWithValue(error.response?.data || error.message))
        } else {
            return rejectWithValue("Unexpected Error")
        }


    }


})


export default actGettingRegisterData