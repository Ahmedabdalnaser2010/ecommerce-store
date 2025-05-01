
import { z } from "zod";


const signUpSchema = z.object({
    fName: z.string().min(1, { message: "First Name is Required" }),
    lName: z.string().min(1, { message: "Last Name is Required" }),
    email: z.string().min(1, { message: "Email Address is Required" }).email({ message: "Email form is wrong" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-])[A-Za-z\d@$!%*?&+]{8,}$/, { message: "Password must contains at least at least one uppercase letter, one lowercase letter, one number and one special character " }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is Required" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password must match Password",
    path: ["confirmPassword"], // Specify the path to the field that has the error
});

type TSignUPInputs = z.infer<typeof signUpSchema>


export { signUpSchema, type TSignUPInputs }