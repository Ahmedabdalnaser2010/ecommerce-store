import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { TSignInInputs, signInSchema } from "../../validation/signInValidation "
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { actLogInData } from "src/store/Slices/registerSlice/registerSlice";
import toast from "react-hot-toast";
import { HiCheck } from "react-icons/hi";
import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";




const Login = ({ openLoginModal, onCloseModal }: { openLoginModal: boolean, onCloseModal: () => void }) => {

    const [showPassword, setShowPassword] = useState(false)

    const showPasswordIcon = <BiShow />
    const HidePasswordIcon = <BiHide />

    const displayPasswordHandler = (e: any) => {
        setShowPassword(!showPassword)
        e.preventDefault()
    }

    useEffect(() => {
        setShowPassword(false)
    }, [])

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const { loading, accessToken } = useAppSelector(state => state.auth)


    const { register, handleSubmit, formState: { errors } } = useForm<TSignInInputs>({ resolver: zodResolver(signInSchema), mode: "onBlur" })


    const onSubmit: SubmitHandler<TSignInInputs> = async (data) => {
        dispatch(actLogInData(data)).unwrap().then(() => {
            navigate("/")
            toast.success("You Successfully Logged in", {
                icon: <HiCheck className="h-5 w-5 fill-green-600" />,
            })

        })

    }


    if (accessToken) {
        return <Navigate to={"/"} />
    }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (

        <Modal show={openLoginModal} size="md" onClose={onCloseModal} popup >
            <ModalHeader />

            <ModalBody>
                <div className="flex flex-col justify-between items-center text-gray-900">

                    <h3 className="text-xl font-medium text-gray-900 dark:text-white py-2">Let's get started!</h3>
                    <div className="flex justify-center text-sm font-medium text-gray-500 dark:text-gray-300 py-4">
                        Not registered?&nbsp;
                        <Link to="/register" className="text-blue-500 hover:underline dark:text-cyan-500">
                            Create account
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col gap-3 mx-auto mt-5 w-full" method="get">


                        <div className=" flex flex-col">
                            <label htmlFor="email2" className="mb-2 text-gray-900 font-medium text-sm">Your E-Mail</label>

                            <input placeholder="xxxxxxxx@xxx.xxx" aria-invalid={!!errors.email} className={`focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.email ? "border-red-600" : "border-gray-300"}`} id="email2" type="text" {...register("email")} />
                            {errors.email && <span className="text-sm font-semibold self-end  text-red-600">{errors.email.message} </span>}
                        </div>



                        <div className=" flex flex-col">
                            <label htmlFor="password2" className="mb-2 text-gray-900 font-medium text-sm">Your password</label>
                            <div >
                                <input placeholder="MyEcommerce@2025" aria-invalid={!!errors.password} className={` focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.password ? "border-red-600" : "border-gray-300"}`} id="password" type={showPassword ? "text" : "password"} {...register("password")} />
                                {showPassword ? (<button onClick={displayPasswordHandler} className="absolute right-10 -translate-y-[-0.75em]">{HidePasswordIcon}</button>) : (<button onClick={displayPasswordHandler} className="absolute right-10 -translate-y-[-0.75em]">{showPasswordIcon}</button>)}
                                {errors.password && <span className="text-sm font-semibold self-end  text-red-600">{errors.password.message} </span>}

                            </div>
                        </div>




                        <button aria-label="login" disabled={loading === "pending"} className="bg-blue-400 mt-4 text-white capitalize font-semibold focus:bg-blue-500 text-sm  p-2.5  border-gray-300 border-[1px] rounded-lg w-full" type="submit">
                            {loading === "pending" ?
                                (<>Please Wait for Checking <span className="loading loading-spinner loading-sm"></span></>) :
                                ("Log in")}
                        </button>

                    </form>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default Login



