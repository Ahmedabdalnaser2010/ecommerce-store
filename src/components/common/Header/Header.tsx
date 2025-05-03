import Cart from '@components/ecommerce/Cart/Cart'
import WishListHeader from '@components/ecommerce/WishList/WishListHeader'
import { TOrder } from '@customtypes/TOrder.types'
import { TCategories } from '@customtypes/Categories.types'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { fetchingCategory } from 'src/store/Slices/Categories/CategorySlice'
import { logOutCurrentUser } from 'src/store/Slices/registerSlice/registerSlice'
import { getUserOrder, postUserOrder } from 'src/store/Slices/PlaceOrder/PlaceOrderSlice'
import { cleanUPWishList } from 'src/store/Slices/WishListPage/WishListSlice'
import { clearItemsAfterOrdering } from 'src/store/Slices/Cart/CartSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useCart from 'src/Hooks/useCart'
import { FiUser } from "react-icons/fi";
import { FaAngleDown, FaUserCheck } from 'react-icons/fa'
import SearchingArea from '@components/ecommerce/SearchingArea.tsx/SearchingArea'







const Header = () => {


    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const location = useLocation().pathname

    const { productDetails } = useCart(false)

    const { categorydata, loading, error } = useAppSelector(state => state.category)

    const { accessToken, user } = useAppSelector(state => state.auth)

    const { productInfo, items } = useAppSelector(state => state.cart)

    const { selectedItem, wishItemState } = useAppSelector(state => state.WishList)






    useEffect(() => {

        dispatch(fetchingCategory())
        dispatch(getUserOrder())


    }, [dispatch])

    const getCategoryName = () => {
        if (loading === "pending") {
            return <span className="loading loading-spinner loading-xl"></span>;
        } else if (error) {
            return <span>{error}</span>; // Ensure error is wrapped in JSX
        } else {
            if (categorydata.length > 0) {
                return (
                    <>
                        {categorydata.map((item: TCategories) => (

                            <li key={item.id}
                                className='border-b-[1px] last:border-none border-b-blue-200 rounded-sm font-bold p-2 uppercase'
                            >
                                <Link
                                    to={`/categories/${item.category}`}
                                    className={`${location === `/categories/${item.category}` ? "bg-blue-300 text-white md:text-blue-400 " : ""} rounded-sm   block md:bg-transparent  md:hover:text-blue-300  md:p-0  px-3 py-2 `}

                                >
                                    {item.category}
                                </Link>
                            </li >
                        ))}
                    </>
                );
            } else {
                return <span>No data available</span>;
            }
        }
    };



    const orderDitails: TOrder = {

        userId: user?.id ?? 0,
        itemsInCart: productDetails,
        itemsInWishList: selectedItem,
        stateItemsInWishList: wishItemState,
        allItems: items,
        excuted: false,

    }


    const logOutHandler = () => {

        setTimeout(() => {

            dispatch(logOutCurrentUser())
            // /////////////////////////////////////////////////////////////////////////////////
            if (productInfo.length >= 0 || Object.keys(selectedItem).length >= 0) {

                dispatch(postUserOrder(orderDitails))
            }
            dispatch(clearItemsAfterOrdering())

            dispatch(cleanUPWishList())



            navigate("/")

        }, 1000)
    }



    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <header className='w-full fixed top-0 z-20'>
            <nav className='bg-white border-b border-gray-200 start-0 top-0 z-20'>
                <div className="flex flex-wrap navbar justify-between items-center max-w-screen-xl mx-auto px-4">
                    <div className="flex-1">
                        <Link to="/" className="text-xl font-bold px-0 text-black ">My <span className='bg-blue-400 p-2 rounded-xl text-white'>E-Commerce</span></Link>
                    </div>




                    <div className='flex justify-between w-[80px] items-center'>

                        <WishListHeader />

                        <Cart />

                    </div>


                </div>
            </nav>


            <nav className="bg-gray-50 border-b border-gray-200 start-0 shadow-lg">
                <div className="flex justify-between items-center max-w-screen-xl mx-auto px-4 py-2 ">


                    <div className="flex justify-between w-full md:order-4 md:w-auto">



                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="dropdown h-10 justify-center p-2 rounded-lg text-gray-500 text-sm w-10 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-gray-100 inline-flex items-center md:hidden"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                            aria-label="Open main menu"

                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-5 w-5 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                                tabIndex={0} role="button"
                            >
                                <path
                                    stroke="#6e7278"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                            <ul
                                tabIndex={0} className="dropdown-content menuabsolute border-b-[1px]  border-b-blue-200  font-bold p-2 Capitalize absolute top-[50px] left-[0] py-2 text-sm text-gray-700  bg-white rounded-lg shadow-sm w-44 "
                                aria-labelledby="dropdownDelayButton"
                            >
                                <li className='hover:bg-blue-300 hover:text-white'>
                                    <Link
                                        to="/"
                                        className={`${location === "/" ? "bg-blue-300 text-white md:text-blue-400 " : ""} rounded-sm block md:bg-transparent  md:hover:text-blue-300  md:p-0 md:text-gray-900 px-3 py-2 `}
                                        aria-current="page"
                                    >
                                        Home
                                    </Link>
                                </li>


                                {/* ///////////////////////// */}
                                <div className="dropdown w-[100%]" >
                                    <div tabIndex={0} role="button" className="flex justify-center items-center gap-2 rounded-sm  text-gray-900  hover:text-white hover:bg-blue-300  md:hover:bg-transparent md:hover:text-blue-300 md:p-0 px-3 py-2">Categories <FaAngleDown /></div>

                                    <ul
                                        tabIndex={0} className="dropdown-content menuabsolute py-2 text-sm text-gray-700  bg-white rounded-lg shadow-sm w-44"
                                        aria-labelledby="dropdownDelayButton"
                                    >
                                        {getCategoryName()}
                                    </ul>
                                </div>

                                <li className='border-b-[1px] border-t-blue-200 rounded-sm font-bold  capitalize hover:bg-blue-300 hover:text-white'>
                                    <Link
                                        to="/contact"
                                        className={`${location === "/contact" ? "bg-blue-300 text-white md:text-blue-400 " : ""} rounded-sm   block md:bg-transparent md:hover:text-blue-300  md:p-0 md:text-gray-900 px-3 py-2 `}
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </button>

                        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}




                        <div className='flex items-center space-x-4'>


                            {accessToken ?
                                (
                                    <button className='flex items-center ' aria-label="Open main menu">

                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-blue-100 hover:border-none focus:bg-blue-100 focus:border-none">


                                                <FaUserCheck className='text-2xl fill-blue-500 ' />

                                            </div>

                                            <ul
                                                tabIndex={0}
                                                className="menu menu-sm dropdown-content bg-gray-50 rounded-box z-1 mt-3 w-52 p-2 shadowfont-medium flex flex-col text-gray-900">
                                                <Link to="/account"> <li className='mb-1'><a className=' text-sm font-semibold'>Your Account </a></li></Link>
                                                <Link to="/cart"><li className='mb-1'><a className=' text-sm font-semibold'>Orders</a></li></Link>
                                                <li className='bg-red-200 text-red-600 self-center w-full ' onClick={logOutHandler}>
                                                    <a className=' text-sm font-semibold '>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="#6e7278"
                                                            className="size-4 "
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                                            />
                                                        </svg>Logout
                                                    </a>
                                                </li>

                                            </ul>
                                        </div>
                                        <div className='flex flex-col justify-between items-start ml-2'>
                                            <span className='text-sm '>Hello, </span>
                                            <span className='font-semibold'>{user?.fName ? user.fName.charAt(0).toUpperCase() + "" + user.fName.slice(1).toLowerCase() : "Guest"}</span>

                                            {/* <span className='font-bold text-blue-400'>LogOut</span> */}
                                        </div>

                                    </button>
                                ) :
                                (<Link to={"/login"}>
                                    <button className='flex items-center ' aria-label='Login'>

                                        <FiUser className='text-2xl text-black  ' />
                                        <div className='flex flex-col justify-between items-start ml-2 '>
                                            <span className='text-sm'>Hello,</span>
                                            <span className='font-bold '>Login</span>
                                        </div>

                                    </button>
                                </Link>)}

                        </div>


                    </div>

                    {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


                    <SearchingArea />

                    {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                    <div

                        className="justify-between w-full hidden items-center md:flex md:order-1 md:w-auto text-gray-700"
                        id="navbar-sticky"
                    >
                        <ul className="flex flex-col bg-gray-50 border border-gray-100 p-4 rounded-lg  font-medium md:border-0  md:flex-row md:mt-0 md:p-0 md:space-x-8 mt-4 rtl:space-x-reverse">
                            <li>
                                <Link
                                    to="/"
                                    className={`${location === "/" ? "bg-blue-300 text-white md:text-blue-400 " : ""} rounded-sm block md:bg-transparent md:hover:text-blue-300  md:p-0  px-3 py-2 `}
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>


                            {/* ///////////////////////// */}
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="flex justify-between rounded-sm text-gray-900  w-full  hover:bg-gray-100 items-center  md:hover:bg-transparent md:focus:text-blue-300 md:p-0 px-3 py-2">Categories <FaAngleDown /></div>

                                <ul
                                    tabIndex={0} className="dropdown-content menuabsolute py-2 text-sm text-gray-700 bg-white rounded-lg shadow-sm w-44"
                                    aria-labelledby="dropdownDelayButton"
                                >
                                    {getCategoryName()}
                                </ul>
                            </div>
                            {/* <li>
                                <Link
                                    to="/about"
                                    className={`${location === "/about" ? "bg-blue-300 text-white md:text-blue-400 " : ""} rounded-sm   block md:bg-transparent md:dark:hover:text-blue-500  md:dark:text-blue-500 md:hover:text-blue-500  md:p-0 md:text-gray-900 px-3 py-2 `}
                                >
                                    About us
                                </Link>
                            </li> */}
                            <li>
                                <Link
                                    to="/contact"
                                    className={`${location === "/contact" ? "bg-blue-300 text-white md:text-blue-400 " : ""} rounded-sm md:bg-transparent   md:hover:text-blue-300  md:p-0  px-3 py-2 `}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}



                </div>

            </nav>

        </header >
    )
}

export default Header
