
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { PiUserCircleDuotone } from "react-icons/pi";
import { Link } from "react-router";
import { useEffect } from "react";
import { getUserOrder } from "src/store/Slices/PlaceOrder/PlaceOrderSlice";

const Profile = () => {

    const { user } = useAppSelector(state => state.auth)
    const { order } = useAppSelector(state => state.placeOrder)




    const dispatch = useAppDispatch()

    useEffect(() => {

        dispatch(getUserOrder())


    }, [dispatch])

    const checkUser = () => {

        const getUserId = Array.isArray(order) ? order.filter(ele => { return ele.userId == user?.id }) : []
        // const getUser = getUserId.map(ele => { return ele.itemsInCart })


        if (getUserId.length > 0) {
            return (<Link to="/previousOrders">
                <button aria-label="preview your pervious orders" className="h-[40px] bg-blue-400 rounded-md text-sm text-white w-[180px]  block font-medium px-4 transition ">Your Previous Orders </button>

            </Link>)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <div className="rounded-xl shadow-md w-full md:w-[400px] md:m-auto h-[350px] bg-white">




                <div className="flex flex-col  border-gray-100 justify-between p-6 items-start" >

                    <PiUserCircleDuotone className="m-auto text-5xl fill-blue-400 my-2" />
                    <div className="flex flex-col  justify-between items-start mb-3 mx-auto">
                        <h3 className="text-gray-700 text-lg font-medium mt-1.5 overflow-hidden" >Welcome,<span className="capitalize text-2xl text-black">{user?.fName}</span></h3>

                    </div>

                    <div>
                        <h2 className=" text-xl font-bold my-4 pb-2 border-b-2 ">Your Profile Info </h2>

                        <div>
                            <div className="mt-2">
                                <span className="text-base font-bold py-2 text-gray-900">First Name:</span>
                                <span className="text-gray-700 capitalize mt-1 pl-2 font-semibold">
                                    {user?.fName}
                                </span>
                            </div>
                            <div className="mt-2">
                                <span className="text-base font-bold py-2 text-gray-900">Last Name:</span>
                                <span className="text-gray-700 capitalize mt-1 pl-2 font-semibold">
                                    {user?.lName}
                                </span>
                            </div>
                            <div className="mt-2">
                                <span className="text-base font-bold py-2 text-gray-900">Email:</span>
                                <span className="text-gray-700  mt-1 pl-2 font-semibold">
                                    {user?.email}
                                </span>
                            </div>


                        </div>

                    </div>

                </div>

            </div>
            {checkUser()}

        </div>


    )
}

export default Profile
