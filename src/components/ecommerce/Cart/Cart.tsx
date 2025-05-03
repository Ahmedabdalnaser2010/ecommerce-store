
import { Link } from "react-router-dom"
import useCart from "src/Hooks/useCart"





const Cart = () => {




    const { totalCountOfProducts, gettingSubtotal } = useCart()




    return (
        <div className="flex-none">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-circle btn-ghost mr-0 hover:bg-blue-100 hover:border-none">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="black"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                        <span className="w-[18px] h-[18px] rounded-[50%] text-white bg-blue-400 text-[00.8em] font-semibold indicator-item right-[0em] top-[-0.5em]">{totalCountOfProducts}</span>
                    </div>
                </div>
                <div
                    tabIndex={0}
                    className="card card-compact dropdown-content bg-base-100 shadow w-52 mt-3 z-1">
                    <div className="card-body bg-white">
                        <span className="text-lg font-bold text-gray-900">{totalCountOfProducts} Items</span>
                        <span className="text-info">Subtotal: ${gettingSubtotal()}</span>
                        <div className="card-actions ">
                            <Link to="/cart"> <button aria-label="go to cart" className="btn btn-block text-white bg-blue-400 border-none">Go to your Cart</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
