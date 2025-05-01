import { Link } from "react-router"
import logo from "../../../public/empty cart.png"

const EmptyWishListPage = () => {
    return (
        <div className="flex flex-col items-center justify-evenly h-[320px] mx-auto">
            <div className="w-[250px]"><img src={logo} alt="Your Wishlist is Empty" /></div>
            <div className="font-bold text-2xl">Your Wishlist is Empty</div>
            <Link to="/">
                <button aria-label="shopping now" className="h-[40px] bg-blue-400 rounded-md text-sm text-white w-full block font-medium px-4 transition">Shopping Now</button>
            </Link>
        </div>
    )
}

export default EmptyWishListPage
