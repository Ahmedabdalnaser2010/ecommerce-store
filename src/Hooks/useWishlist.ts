import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getUserOrder } from "src/store/Slices/PlaceOrder/PlaceOrderSlice"
import { getItemsinWishList } from "src/store/Slices/WishListPage/actGetItemsinWishList"
import { setWishList, storedWishListItems } from "src/store/Slices/WishListPage/WishListSlice"


const useWishlist = (autoFetch = true) => {

    const dispatch = useAppDispatch()
    const { selectedItem, wishItemState } = useAppSelector(state => state.WishList)
    const { order } = useAppSelector(state => state.placeOrder)
    const { user, accessToken } = useAppSelector(state => state.auth)

    useEffect(() => {

        if (!selectedItem) {
            dispatch(getItemsinWishList())
            dispatch(getUserOrder())
        }



    }, [dispatch, user?.id, selectedItem])

    const filteringLastOrder = order.filter(ele => ele.userId === user?.id).slice(-1)[0]


    const gettingStateStoredWishlistItems = useMemo(() => { return filteringLastOrder?.stateItemsInWishList ? filteringLastOrder.stateItemsInWishList : [] }, [filteringLastOrder])
    const gettingStoredWishlistItems = useMemo(() => { return filteringLastOrder?.itemsInWishList ? filteringLastOrder.itemsInWishList : [] }, [filteringLastOrder])


    const newAddedItems = selectedItem

    const va = Object.keys(gettingStoredWishlistItems) ? gettingStoredWishlistItems : {}
    const vat = Object.keys(selectedItem) ? selectedItem : {}
    const merge = { ...va, ...vat }


    useEffect(() => {


        if (Object.keys(gettingStoredWishlistItems).length > 0 && Object.keys(selectedItem).length == 0) {
            dispatch(setWishList(gettingStateStoredWishlistItems))
            dispatch(storedWishListItems(gettingStoredWishlistItems))

        } else {
            dispatch(setWishList(wishItemState))
            dispatch(storedWishListItems(selectedItem))
        }


    }, [autoFetch, dispatch, accessToken, gettingStoredWishlistItems, gettingStateStoredWishlistItems, selectedItem, wishItemState])











    return { newAddedItems }
}

export default useWishlist
