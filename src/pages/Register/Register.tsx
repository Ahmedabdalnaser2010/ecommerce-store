import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { TSignUPInputs, signUpSchema } from "../../validation/signUpValidation"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import actGettingRegisterData from "src/store/Slices/registerSlice/actAuth/actGettingData";
import { IoIosCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { MdCloudDone } from "react-icons/md";
import useCheckEmailAvailability from "src/Hooks/useCheckEmailAvailability";
import { resetError } from "src/store/Slices/registerSlice/registerSlice";






// const Register = () => {


//     // Handling password input
//     const [showPassword, setShowPassword] = useState(false)
//     const [showRePassword, setShowRePassword] = useState(false)

//     const showPasswordIcon = <BiShow />
//     const HidePasswordIcon = <BiHide />

//     const displayPasswordHandler = (e: any) => {
//         setShowPassword(!showPassword)
//         e.preventDefault()
//     }
//     const displayRePasswordHandler = (e: any) => {
//         setShowRePassword(!showRePassword)
//         e.preventDefault()
//     }

//     useEffect(() => {
//         setShowPassword(false)
//         setShowRePassword(false)
//     }, [])


//     ////////////////////////////////////////////////////////////////////

//     const navigate = useNavigate()

//     const dispatch = useAppDispatch()

//     const { loading, error, accessToken } = useAppSelector(state => state.auth)

//     const { register, handleSubmit, formState: { errors }, reset } = useForm<TSignUPInputs>({ resolver: zodResolver(signUpSchema), mode: "onBlur" })

//     const onSubmit: SubmitHandler<TSignUPInputs> = async (data) => {
//         const { fName, lName, email, password } = data

//         dispatch(actGettingRegisterData({ fName, lName, email, password })).unwrap().then(() => {

//             navigate("/login")

//             toast.success('Your Account Created Successfully, please Login...')

//             reset()
//         }
//         )
//     }



//     const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
//         console.log(e.target.value)
//     }


//     useEffect(() => {
//         if (error) {
//             toast.error(error)
//         }
//     }, [error])


//     if (accessToken) {
//         return <Navigate to={"/"} />
//     }

//     // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//     return (
//         <>

//             <h2 className="font-bold text-3xl text-blue-400 mb-2" >Registeration</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-2 m-auto text-gray-900" method="get">
//                 <div className="flex items-center justify-between gap-1">
//                     <div>
//                         <div className=" flex flex-col w-[160px] sm:w-[210px] ">
//                             <label htmlFor="fName" className="mb-2 text-gray-900 font-medium text-sm">First Name</label>
//                             <input placeholder="xxxxxx" className={` focus:border-blue-300 text-sm  p-2.5 bg-gray-50  border-[1px] rounded-lg  ${errors.fName ? "border-red-400 border-[2px] shadow-sm-light" : "border-gray-300"}`}
//                                 id="fName"
//                                 type="text"
//                                 {...register("fName")}
//                                 aria-invalid={!!errors.fName}
//                             />
//                             {errors.fName && <span className="text-xs mt-1 font-medium self-start  text-red-600">{errors.fName.message} </span>}
//                         </div>

//                     </div>
//                     <div>
//                         <div className=" flex flex-col w-[160px] sm:w-[210px] ">
//                             <label htmlFor="lName" className="mb-2 text-gray-900 font-medium text-sm">Last Name</label>
//                             <input placeholder="xxxxxx" aria-invalid={!!errors.lName} className={`focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg  ${errors.lName ? "border-red-400 border-[2px] shadow-sm-light" : "border-gray-300"}`} id="lName" type="text" {...register("lName")} />
//                             {errors.lName && <span className="text-xs mt-1 font-medium self-start  text-red-600">{errors.lName.message} </span>}
//                         </div>

//                     </div>
//                 </div>
//                 <div>
//                     <div className=" flex flex-col">
//                         <label htmlFor="email2" className="mb-2 text-gray-900 font-medium text-sm" >E-Mail</label>

//                         <input placeholder="xxxxxxxx@xxx.xxx" aria-invalid={!!errors.email} className={`focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.email || error ? "border-red-400 border-[2px] shadow-sm-light" : "border-gray-300"}`} id="email2" type="text" {...register("email")} onBlur={onBlurHandler} />
//                         {errors.email && <span className="text-xs mt-1 font-medium self-end  text-red-600">{errors.email.message} </span>}
//                         {(error && !errors.email) && <span className="flex items-center"><IoIosCloseCircle className="fill-red-600 mr-2" /> <span className="text-xs mt-1 font-medium self-start  text-red-600">{error} </span></span>}
//                         {/* {!error && <span className="flex items-center"><MdCloudDone className="fill-green-400 mr-2" /> <span className="text-sm font-semibold self-start  text-green-600">This Email is Available for Using </span></span>} */}

//                     </div>

//                 </div>
//                 <div>
//                     <div className=" flex flex-col">
//                         <label htmlFor="password2" className="mb-2 text-gray-900 font-medium text-sm">password</label>
//                         {/* <input aria-invalid={!!errors.password} className={`focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.password ? "border-red-400 border-[2px] shadow-sm-light" : "border-gray-300"}`} id="password" type="password" {...register("password")} />
//                         {errors.password && <span className="text-xs mt-1 font-medium self-end  text-red-600">{errors.password.message} </span>} */}
//                         <div className="relative" >
//                             <input placeholder="MyEcommerce@2025" aria-invalid={!!errors.password} className={` focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.password ? "border-red-600" : "border-gray-300"}`} id="password" type={showPassword ? "text" : "password"} {...register("password")} />
//                             {showPassword ? (<button aria-label="show password" onClick={displayPasswordHandler} className="absolute right-6 -translate-y-[-0.75em]">{HidePasswordIcon}</button>) : (<button aria-label="hide password" onClick={displayPasswordHandler} className="absolute right-6 -translate-y-[-0.75em]">{showPasswordIcon}</button>)}
//                             {errors.password && <span className="text-sm font-semibold self-end  text-red-600">{errors.password.message} </span>}

//                         </div>
//                     </div>

//                 </div>
//                 <div>
//                     <div className=" flex flex-col">
//                         <label htmlFor="confirm-password" className="mb-2 text-gray-900 font-medium text-sm">Confirm password</label>
//                         {/* <input aria-invalid={!!errors.confirmPassword} className={`focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.confirmPassword ? "border-red-400 border-[2px] shadow-sm-light" : "border-gray-300"}`} id="confirm-password" type="password" {...register("confirmPassword")} />
//                         {errors.confirmPassword && <span className="text-xs mt-1 font-medium self-end  text-red-600">{errors.confirmPassword.message} </span>} */}
//                         <div className="relative" >
//                             <input placeholder="MyEcommerce@2025" aria-invalid={!!errors.confirmPassword} className={` focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.confirmPassword ? "border-red-600" : "border-gray-300"}`} id="confirm-password" type={showRePassword ? "text" : "password"} {...register("confirmPassword")} />
//                             {showRePassword ? (<button aria-label="show password" onClick={displayRePasswordHandler} className="absolute right-6 -translate-y-[-0.75em]">{HidePasswordIcon}</button>) : (<button aria-label="hide password" onClick={displayRePasswordHandler} className="absolute right-6 -translate-y-[-0.75em]">{showPasswordIcon}</button>)}
//                             {errors.confirmPassword && <span className="text-sm font-semibold self-end  text-red-600">{errors.confirmPassword.message} </span>}

//                         </div>
//                     </div>

//                 </div>



//                 {/* <div className="flex items-center gap-2">
//                 <Checkbox id="agree" />
//                 <Label htmlFor="agree" className="flex">
//                     I agree with the&nbsp;
//                     <Link to="/cart" className="text-blue-400 hover:underline dark:text-blue-600">
//                         terms and conditions
//                     </Link>
//                 </Label>
//             </div> */}
//                 <button aria-label="register" disabled={loading === "pending"} className={`${loading === "pending" ? "bg-gray-400" : "bg-blue-400"}  mt-4 text-white capitalize font-semibold focus:bg-blue-500 text-sm  p-2.5 h-[41.6px] border-gray-300 border-[1px] rounded-lg w-full`} type="submit">
//                     {loading === "pending" ? (<>Please Wait for Checking <span className="loading loading-spinner loading-sm"></span></>) : ("Register new account")}
//                 </button>

//                 <span className="self-center"><span>Already have an account? </span><Link to={"/login"} className="text-blue-400 hover:underline dark:text-cyan-500 font-medium">Log In</Link></span>
//                 {/* {openLoginModaltwo && <Login onCloseModal={() => setOpenLoginModaltwo(false)} openLoginModal={openLoginModaltwo} />} */}

//             </form >

//         </>
//     )
// }

// export default Register





const Register = () => {


    const navigate = useNavigate()
    const location = useLocation().pathname
    const dispatch = useAppDispatch()
    const { loading, error, accessToken } = useAppSelector(state => state.auth)

    // Handling password input
    const [showPassword, setShowPassword] = useState(false)
    const [showRePassword, setShowRePassword] = useState(false)
    const showPasswordIcon = <BiShow />
    const HidePasswordIcon = <BiHide />

    const displayPasswordHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowPassword(!showPassword)
        e.preventDefault()
    }
    const displayRePasswordHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowRePassword(!showRePassword)
        e.preventDefault()
    }


    ////////////////////////////////////////////////////////////////////


    const { checkEmailAvailability, enteredEmailValue, checkStoredEmails, resetCheckEmailAvailability } = useCheckEmailAvailability()

    const { register, handleSubmit, trigger, formState: { errors }, reset, getFieldState } = useForm<TSignUPInputs>({ resolver: zodResolver(signUpSchema), mode: "onBlur" })

    const onSubmit: SubmitHandler<TSignUPInputs> = async (data) => {
        const { fName, lName, email, password } = data

        dispatch(actGettingRegisterData({ fName, lName, email, password })).unwrap().then(() => {

            navigate("/login")

            toast.success('Your Account Created Successfully, please Login...')

            reset()
        }
        )
    }



    useEffect(() => {
        setShowPassword(false)
        setShowRePassword(false)
    }, [])




    const onBlurHandler = debounce(async (e: React.FocusEvent<HTMLInputElement>) => {
        await trigger("email")
        const emailValue = e.target.value



        const { isDirty, invalid } = getFieldState("email")

        console.log(isDirty, invalid, enteredEmailValue)

        if (emailValue) {
            if (isDirty && !invalid && enteredEmailValue != emailValue) {
                checkStoredEmails(emailValue)

            }
            if (isDirty && invalid && enteredEmailValue) {
                return resetCheckEmailAvailability
            }
        }
    }, 300)


    useEffect(() => {
        dispatch(resetError())
        if (error) {
            toast.error(error)
        }
        return () => {
            toast.remove();
            if (location !== "/register") {
                dispatch(resetError())
            }


        }


    }, [error, dispatch, location])


    if (accessToken) {
        return <Navigate to={"/"} />
    }



    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>

            <h2 className="font-bold text-3xl text-blue-400 mb-2" >Registeration</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-2 m-auto text-gray-900" method="get">
                <div className="flex items-center justify-between gap-1">
                    <div>
                        <div className=" flex flex-col w-[160px] sm:w-[210px] ">
                            <label htmlFor="fName" className="mb-2 text-gray-900 font-medium text-sm">First Name</label>
                            <input placeholder="xxxxxx" className={` focus:border-blue-300 text-sm  p-2.5 bg-gray-50  border-[1px] rounded-lg  ${errors.fName ? "border-red-400 border-[2px] shadow-sm-light" : "border-gray-300"}`}
                                id="fName"
                                type="text"
                                {...register("fName")}
                                aria-invalid={!!errors.fName}
                            />
                            {errors.fName && <span className="text-xs mt-1 font-medium self-start  text-red-600">{errors.fName.message} </span>}
                        </div>

                    </div>
                    <div>
                        <div className=" flex flex-col w-[160px] sm:w-[210px] ">
                            <label htmlFor="lName" className="mb-2 text-gray-900 font-medium text-sm">Last Name</label>
                            <input placeholder="xxxxxx" aria-invalid={!!errors.lName} className={`focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg  ${errors.lName ? "border-red-400 border-[2px] shadow-sm-light" : "border-gray-300"}`} id="lName" type="text" {...register("lName")} />
                            {errors.lName && <span className="text-xs mt-1 font-medium self-start  text-red-600">{errors.lName.message} </span>}
                        </div>

                    </div>
                </div>
                <div>
                    <div className=" flex flex-col">
                        <label htmlFor="email2" className="mb-2 text-gray-900 font-medium text-sm" >E-Mail</label>

                        <input placeholder="xxxxxxxx@xxx.xxx" aria-invalid={!!errors.email} className={`focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.email || error ? "border-red-400 border-[2px] shadow-sm-light" : "border-gray-300"}`} id="email2" type="text" {...register("email")} onBlur={onBlurHandler} />
                        {errors.email && <span className="text-xs mt-1 font-medium self-start  text-red-600">{errors.email.message} </span>}
                        <div className="flex items-end">
                            {enteredEmailValue && (checkEmailAvailability == "notAvailable" ? (<span className="flex items-center"><IoIosCloseCircle className="fill-red-600 mr-2" /></span>) :
                                (<span className="flex items-center"><MdCloudDone className="fill-green-400 mr-2" /></span>))}
                            {enteredEmailValue && (checkEmailAvailability == "notAvailable" ? (<span className="text-xs mt-1 font-medium self-start  text-red-600">{"This email is already in use."}</span>) :
                                (<span className="text-xs mt-1 font-medium  self-start  text-green-600">{"This Email is Available for Using."} </span>))}
                        </div>
                        {/* {(register("email") && error && !errors.email) && <span className="flex items-center"><IoIosCloseCircle className="fill-red-600 mr-2" /> <span className="text-xs mt-1 font-medium self-start  text-red-600">This email is already in use.</span></span>} */}
                        {/* {!error && <span className="flex items-center"><MdCloudDone className="fill-green-400 mr-2" /> <span className="text-sm font-semibold self-start  text-green-600">This Email is Available for Using </span></span>} */}

                    </div>

                </div>
                <div>
                    <div className=" flex flex-col">
                        <label htmlFor="password2" className="mb-2 text-gray-900 font-medium text-sm">password</label>
                        {/* <input aria-invalid={!!errors.password} className={`focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.password ? "border-red-400 border-[2px] shadow-sm-light" : "border-gray-300"}`} id="password" type="password" {...register("password")} />
                        {errors.password && <span className="text-xs mt-1 font-medium self-end  text-red-600">{errors.password.message} </span>} */}
                        <div className="relative" >
                            <input placeholder="MyEcommerce@2025" aria-invalid={!!errors.password} className={` focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.password ? "border-red-600" : "border-gray-300"}`} id="password" type={showPassword ? "text" : "password"} {...register("password")} />
                            {showPassword ? (<button aria-label="show password" onClick={displayPasswordHandler} className="absolute right-6 -translate-y-[-0.75em]">{HidePasswordIcon}</button>) : (<button aria-label="hide password" onClick={displayPasswordHandler} className="absolute right-6 -translate-y-[-0.75em]">{showPasswordIcon}</button>)}
                            {errors.password && <span className="text-sm font-semibold self-end  text-red-600">{errors.password.message} </span>}

                        </div>
                    </div>

                </div>
                <div>
                    <div className=" flex flex-col">
                        <label htmlFor="confirm-password" className="mb-2 text-gray-900 font-medium text-sm">Confirm password</label>
                        {/* <input aria-invalid={!!errors.confirmPassword} className={`focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.confirmPassword ? "border-red-400 border-[2px] shadow-sm-light" : "border-gray-300"}`} id="confirm-password" type="password" {...register("confirmPassword")} />
                        {errors.confirmPassword && <span className="text-xs mt-1 font-medium self-end  text-red-600">{errors.confirmPassword.message} </span>} */}
                        <div className="relative" >
                            <input placeholder="MyEcommerce@2025" aria-invalid={!!errors.confirmPassword} className={` focus:border-blue-300 text-sm  p-2.5 bg-gray-50 border-[1px] rounded-lg w-full ${errors.confirmPassword ? "border-red-600" : "border-gray-300"}`} id="confirm-password" type={showRePassword ? "text" : "password"} {...register("confirmPassword")} />
                            {showRePassword ? (<button aria-label="show password" onClick={displayRePasswordHandler} className="absolute right-6 -translate-y-[-0.75em]">{HidePasswordIcon}</button>) : (<button aria-label="hide password" onClick={displayRePasswordHandler} className="absolute right-6 -translate-y-[-0.75em]">{showPasswordIcon}</button>)}
                            {errors.confirmPassword && <span className="text-sm font-semibold self-end  text-red-600">{errors.confirmPassword.message} </span>}

                        </div>
                    </div>

                </div>



                {/* <div className="flex items-center gap-2">
                <Checkbox id="agree" />
                <Label htmlFor="agree" className="flex">
                    I agree with the&nbsp;
                    <Link to="/cart" className="text-blue-400 hover:underline dark:text-blue-600">
                        terms and conditions
                    </Link>
                </Label>
            </div> */}
                <button aria-label="register" disabled={loading === "pending"} className={`${loading === "pending" ? "bg-gray-400" : "bg-blue-400"}  mt-4 text-white capitalize font-semibold focus:bg-blue-500 text-sm  p-2.5 h-[41.6px] border-gray-300 border-[1px] rounded-lg w-full`} type="submit">
                    {loading === "pending" ? (<>Please Wait for Checking <span className="loading loading-spinner loading-sm"></span></>) : ("Register new account")}
                </button>

                <span className="self-center"><span>Already have an account? </span><Link to={"/login"} className="text-blue-400 hover:underline dark:text-cyan-500 font-medium">Log In</Link></span>
                {/* {openLoginModaltwo && <Login onCloseModal={() => setOpenLoginModaltwo(false)} openLoginModal={openLoginModaltwo} />} */}

            </form >

        </>
    )
}

export default Register