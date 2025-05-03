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
    console.log(location)

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
    // const newAddedProduct = [...productInfo]

    const mergingAllItems = [...gettingStoredItems, ...newAddedProduct]
    // .reduce(

    //     (mergedItems, currentItem) => {
    //         // Find if item already exists in merged array
    //         const existingIndex = mergedItems.findIndex(item => item.id === currentItem.id);
    //         console.log(existingIndex)
    //         if (existingIndex >= 0) {
    //             // Merge quantities if item exists
    //             mergedItems[existingIndex].quantities =
    //                 (mergedItems[existingIndex].quantities || 0) +
    //                 (currentItem.quantities || 0);
    //         } else {
    //             // Add new item with normalized quantity
    //             mergedItems.push({
    //                 ...currentItem,
    //                 quantities: currentItem.quantities || 0
    //             });
    //         }
    //         return mergedItems;
    //     },
    //     [] as TProducts[]
    // );
    // const productDetails: TProducts[] = [...productInfo]
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



    const hh = !Object.keys(items).filter(el => el in getAllItems)
    console.log(hh)
    const [intialization, setIntialization] = useState(false)

    useEffect(() => {
        // 
        // &&JSON.stringify(getAllItems).length >= JSON.stringify(items).length
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




    // stored items+new items
    // const countOfExistingItems = productDetails.length > 0 ? productDetails.flatMap(el => el.quantities).reduce((prev, curr) => { return Number(prev) + Number(curr) }, 0) : 0
    // const countOfExistingItems = mergingAllItems.length > 0 ? mergingAllItems.flatMap(el => el.quantities).reduce((prev, curr) => { return Number(prev) + Number(curr) }, 0) : 0
    // const checkingExistingItems = getStoredOrderLength > 0 ? countOfExistingItems : 0

    // const totalCountOfProducts = accessToken ? (countOfExistingItems) : (countOfItems)
    const totalCountOfProducts = (countOfItems)


    const gettingSubtotal = () => {
        if (Object.keys(productDetails)) {
            return (productDetails.map(el => el.price * (el.quantities ?? 0))).reduce((prev, curr) => { return prev + curr }, 0)
        }

    }


    console.log(getStoredOrder)
    console.log(getStoredOrderLength)
    console.log(gettingStoredItems)
    console.log(getAllItems)
    console.log(items)




    return { gettingStoredItems, getStoredOrderLength, productDetails, getAllItems, totalCountOfProducts, gettingSubtotal, newAddedProduct, mergingAllItems }


}

export default useCart