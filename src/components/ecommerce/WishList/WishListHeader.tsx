
import { Link } from 'react-router'
import useWishlist from 'src/Hooks/useWishlist'

import { useAppSelector } from 'src/store/hooks'

const WishListHeader = () => {

    const { selectedItem } = useAppSelector(state => state.WishList)
    const { accessToken } = useAppSelector(state => state.auth)

    const { newAddedItems } = useWishlist()

    const wishlistLength = () => {
        if (accessToken) {
            if (Object.keys(selectedItem)) {
                return Object.keys(selectedItem).length
            }
        }
    }


    return (
        <div className="flex-none">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-circle btn-ghost hover:bg-blue-100 hover:border-none">
                    <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={"red"}
                            viewBox="0 0 24 24"
                            strokeWidth={"0.0"}
                            stroke="currentColor"
                            className="size-6 "
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                        </svg>
                        <span className={`w-[18px] h-[18px] rounded-[50%] text-white ${accessToken ? "bg-red-400" : "bg-transparent"} text-[00.8em] font-semibold indicator-item right-[0em] top-[-0.5em]`}>{wishlistLength()}</span>
                    </div>
                </div>
                <div
                    tabIndex={0}
                    className="card card-compact dropdown-content bg-base-100 shadow w-52 mt-3 z-1">
                    <div className="card-body bg-white">
                        <span className="text-lg font-bold text-gray-900">{wishlistLength()} Items</span>

                        <div className="card-actions">
                            <Link to="/wishlist">
                                <button aria-label='go to wishlist page' disabled={accessToken ? false : true} className="btn btn-block text-white bg-blue-400 border-none hover:bg-blue-500">Go to your WishList</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishListHeader
