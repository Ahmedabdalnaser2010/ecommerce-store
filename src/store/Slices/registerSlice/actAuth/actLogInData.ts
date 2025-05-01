
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"
import apiClient from 'src/api/apiClient';





type TFormData = {
    password: string,
    email: string,

}


type TFormLogin = {
    accessToken: string,
    user: {
        id: number,
        fName: string,
        lName: string,
        email: string,

    }
}




const actLogInData = createAsyncThunk("auth/actLoginData", async (formData: TFormData, thunkApi) => {

    const { rejectWithValue } = thunkApi

    try {
        const res = await apiClient.post<TFormLogin>("/login", formData)
        // const res = await axios.post<TFormLogin>("http://localhost:5005/login", formData)

        return res.data

    } catch (error) {



        if (axios.isAxiosError(error)) {
            toast.error(`${error.response?.data}...`)
            return rejectWithValue(error.response?.data)
        } else {
            return rejectWithValue("Unexpected Error")
        }
    }

})


export default actLogInData 