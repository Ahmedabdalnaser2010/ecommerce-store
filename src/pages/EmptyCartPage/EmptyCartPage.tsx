import { Link } from "react-router"
import Lottie from "lottie-react"
import animation from '../../../public/animation/Empty Cart.json'
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getUserOrder } from "src/store/Slices/PlaceOrder/PlaceOrderSlice"
import { useEffect, useMemo } from "react"

const EmptyCartPage = () => {

    const { user } = useAppSelector(state => state.auth)
    const { order } = useAppSelector(state => state.placeOrder)

    const dispatch = useAppDispatch()

    const getUserId = useMemo(() => { return Array.isArray(order) ? order.filter(ele => { return ele.userId == user?.id }) : [] }, [order, user?.id]);

    const checkExcutionOfLastOrder = getUserId.flatMap(el => el.itemsInCart)

    useEffect(() => {
        if (getUserId.length == 0) {
            dispatch(getUserOrder())
        }

    }, [dispatch])

    const checkUser = () => {



        if (getUserId.length > 0 && checkExcutionOfLastOrder.length > 0) {

            return (<Link to="/previousOrders">
                <button aria-label='Previous Orders' className="h-[40px] bg-blue-400 hover:bg-blue-500 rounded-md text-sm text-white w-[140px]  block font-medium px-4 transition ">Previous Orders </button>

            </Link>)
        }
    }

    return (
        <div className="flex flex-col items-center justify-evenly  mx-auto text-blue-400">
            {/* <div className="w-[250px]"><img src={logo} alt="" /></div> */}
            <Lottie animationData={animation} style={{ width: "230px" }} />
            <div className="font-bold text-2xl mt-4">Your Cart is Empty</div>
            <div className=" flex justify-between gap-5  mt-4">
                <Link to="/">
                    <button aria-label="Shopping now" className="h-[40px] bg-blue-400 rounded-md text-sm text-white  w-[140px] block font-medium px-4 transition">Shopping Now</button>

                </Link>
                {checkUser()}
            </div>
        </div>
    )
}

export default EmptyCartPage
