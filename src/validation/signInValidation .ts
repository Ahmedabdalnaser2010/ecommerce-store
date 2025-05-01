
import { z } from "zod";




const signInSchema = z.object({

    email: z.string().min(1, { message: "Email Address is Required" }).email({ message: "Email form is wrong" }),
    password: z.string().min(1, { message: "Password must be at least 8 characters" })

})

type TSignInInputs = z.infer<typeof signInSchema>


export { signInSchema, type TSignInInputs }
