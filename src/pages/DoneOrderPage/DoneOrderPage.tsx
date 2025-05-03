import { Link } from "react-router"
// import logo from "../../../public/empty cart.png"
import Lottie from "lottie-react"
import animation from '../../../public/animation/OrderDone.json'

const DoneOrderPage = () => {
    return (

        <div className="flex flex-col items-center justify-evenly h-[320px] mx-auto text-blue-400">
            <Lottie animationData={animation} style={{ width: "300px" }} />
            <div className="font-bold text-2xl mt-4 text-center">Thank you for Ordering <br /> We are preparing your order now.</div>
            <Link to="/">
                <button aria-label='go to homepage' className="h-[40px] bg-blue-400 rounded-md text-sm text-white w-full block font-medium px-4 transition mt-4">Back To Home</button>
            </Link>
        </div>
    )
}

export default DoneOrderPage
