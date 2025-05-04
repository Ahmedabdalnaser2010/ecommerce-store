import { TProducts } from "@customtypes/TProducts.types"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getItemsinCart } from "src/store/Slices/Cart/actGetItemsinCart"
import { setItems } from "src/store/Slices/Cart/CartSlice"
import { getUserOrder } from "src/store/Slices/PlaceOrder/PlaceOrderSlice"
import { totalQuantitiesOfAllItems } from "src/store/Slices/selectors/Selectors"


const useCart = (autoFetch = true) => {

    const dispatch = useAppDispatch()
    const { order } = useAppSelector(state => state.placeOrder)
    const { user, accessToken } = useAppSelector(state => state.auth)
    const { productInfo, items } = useAppSelector(state => state.cart)

    const location = useLocation().pathname

    const countOfItems = useAppSelector(totalQuantitiesOfAllItems) || 0



    useEffect(() => {
        if (autoFetch) {
            dispatch(getItemsinCart())
            dispatch(getUserOrder())
        }

    }, [dispatch, autoFetch, user?.id])




    //  stored Items 



    const getLastOrderforUser = order.filter(ele => Number(ele.userId) == Number(user?.id)).slice(-1)

    const checkExcutionOfLastOrder = getLastOrderforUser.flatMap(el => el.excuted)
    // checking if order was executed or not (true/false) 
    // if true so cart will start from scratch 
    // ,if false it will display stored data 

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // stored data from orders not excuted

    const getStoredOrder = checkExcutionOfLastOrder[0] == false ? order.filter(ele => Number(ele.userId) == Number(user?.id) && ele.excuted === false).slice(-1) : []

    const getStoredOrderLength = checkExcutionOfLastOrder[0] == false ? getStoredOrder.length : 0

    const gettingStoredItems = getStoredOrder.flatMap(el => el.itemsInCart)

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const newAddedProduct = productInfo.map((item) => ({ ...item, quantities: items[item.id ?? 0] }))

    const mergingAllItems = [...gettingStoredItems, ...newAddedProduct]

    const productDetails: TProducts[] = productInfo.map((ele: TProducts) => (
        {
            ...ele,
            quantities: items[ele.id || 0],
        }
    )
    )


    const getAllItems = useMemo(() => {
        return mergingAllItems.reduce((prev, curr) => {
            if (curr.id) {
                prev[curr.id] = curr.quantities || 0;
            }
            return prev;
        }, {} as { [key: string]: number });
    }, [newAddedProduct]);



    const [intialization, setIntialization] = useState(false)

    useEffect(() => {

        if (accessToken) {
            setIntialization(false)
        }
        if (Object.keys(getAllItems).length > 0 && Object.keys(items).length >= 0 && intialization == false) {

            dispatch(setItems(getAllItems));
            setIntialization(true)

        } else if (intialization == true) {

            dispatch(setItems(items))
            setIntialization(false)
        }
        if (location == "/cart") {
            dispatch(setItems(items))
        }



    }, [dispatch, accessToken]);




    const totalCountOfProducts = (countOfItems)


    const gettingSubtotal = () => {
        if (Object.keys(productDetails)) {
            return (productDetails.map(el => el.price * (el.quantities ?? 0))).reduce((prev, curr) => { return prev + curr }, 0)
        }

    }






    return { gettingStoredItems, getStoredOrderLength, productDetails, getAllItems, totalCountOfProducts, gettingSubtotal, newAddedProduct, mergingAllItems }


}

export default useCart