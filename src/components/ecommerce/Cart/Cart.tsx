
import { Link } from "react-router-dom"
import useCart from "src/Hooks/useCart"





const Cart = () => {


    // const { order } = useAppSelector(state => state.placeOrder)
    // const { accessToken, user } = useAppSelector(state => state.auth)
    // const { productInfo, items } = useAppSelector(state => state.cart)
    // const getOrder = order.filter(ele => Number(ele.userId) == Number(user?.id) && ele.excuted === false).length



    // const countOfItems = useAppSelector(totalQuantitiesOfAllItems)

    // const countOfExistingItems = useAppSelector(existingItems)

    // const checkingExistingItems = getOrder > 0 ? countOfExistingItems : 0
    // const productCount = productInfo.map((item) => ({ ...item, quantities: items[item.id ?? 0] }))

    // const gettingStoredItems = order.filter(ele => Number(ele.userId) === Number(user?.id) && ele.excuted === false).slice(-1).flatMap(el => el.itemsInCart).concat(productCount)



    // const totalCountOfProducts = accessToken ? (countOfItems ?? 0) + (checkingExistingItems ?? 0) : (countOfItems ?? 0)


    // const dispatch = useAppDispatch()

    // useEffect(() => {

    //     dispatch(getItemsinCart())
    //     dispatch(getUserOrder())

    // }, [dispatch])



    // const gettingSubtotal = () => {
    //     if (Object.keys(gettingStoredItems)) {
    //         return (gettingStoredItems.map(el => el.price * (el.quantities ?? 0))).reduce((prev, curr) => { return prev + curr }, 0)
    //     }

    // }

    const { totalCountOfProducts, gettingSubtotal } = useCart()




    return (
        <div className="flex-none">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-circle btn-ghost mr-0">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                        <span className="w-[18px] h-[18px] rounded-[50%] text-white bg-blue-400 text-[00.8em] font-semibold indicator-item right-[0em] top-[-0.5em]">{totalCountOfProducts}</span>
                    </div>
                </div>
                <div
                    tabIndex={0}
                    className="card card-compact dropdown-content bg-base-100 shadow w-52 mt-3 z-1">
                    <div className="card-body">
                        <span className="text-lg font-bold">{totalCountOfProducts} Items</span>
                        <span className="text-info">Subtotal: ${gettingSubtotal()}</span>
                        <div className="card-actions ">
                            <Link to="/cart"> <button aria-label="go to cart" className="btn btn-block text-white bg-blue-400">Go to your Cart</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
