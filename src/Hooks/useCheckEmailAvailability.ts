import { useState } from "react"
import apiClient from "src/api/apiClient"


type TState = "available" | "idle" | "notAvailable" | "checking" | "failed"


const useCheckEmailAvailability = () => {

    const [checkEmailAvailability, setCheckEmailAvailability] = useState<TState>("idle")

    const [enteredEmailValue, setEnteredEmailValue] = useState<string | null>(null)




    const checkStoredEmails = async (email: string) => {

        setEnteredEmailValue(email)
        try {
            const response = await apiClient.get(`/users?email=${email}`)
            const data = response.data

            if (!data.length) {
                setCheckEmailAvailability("available")
            } else {
                setCheckEmailAvailability("notAvailable")
            }


        } catch (error) {
            setCheckEmailAvailability("failed")
        }
    }

    const resetCheckEmailAvailability = () => {
        setCheckEmailAvailability("idle");
        setEnteredEmailValue(null);
    };

    return { checkEmailAvailability, enteredEmailValue, checkStoredEmails, resetCheckEmailAvailability }
}

export default useCheckEmailAvailability
