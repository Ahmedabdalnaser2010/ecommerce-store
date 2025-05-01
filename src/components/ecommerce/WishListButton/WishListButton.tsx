import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { removeItemfromWishlist, wishListState } from 'src/store/Slices/WishListPage/WishListSlice'



const WishListButton = ({ id }: { id: number }) => {



    const dispatch = useAppDispatch()

    const [isDisabled, setIsDisabled] = useState(false)

    const toggleState = useAppSelector(state => state.WishList.wishItemState[id])

    // const { selectedItem } = useAppSelector(state => state.WishList)
    const { items } = useAppSelector(state => state.cart)

    const { accessToken } = useAppSelector(state => state.auth)


    // const isItemInCart = useMemo(() => {
    //     return items && typeof items === 'object' && id in items
    // }, [items, id])
    const isItemInCart = id in items




    useEffect(() => {

        if (isItemInCart) {
            dispatch(removeItemfromWishlist(id))
            setIsDisabled(true)

        }
        if (!accessToken) {
            setIsDisabled(true)
        }

    }, [dispatch, isItemInCart, id, accessToken])


    const toggleWishList = () => {

        if (!isItemInCart) {
            dispatch(wishListState(id))

        }

    }

    return (
        <>
            <button aria-label='wishlist' disabled={isDisabled} onClick={toggleWishList} className="bg-white p-1.5 rounded-full text-gray-900 absolute end-4 hover:text-gray-900/75 top-3 transition z-10" >
                <span className="sr-only text-black">Wishlist</span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={toggleState && !isDisabled ? "red" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={toggleState && !isDisabled ? "0.01" : "0.8"}
                    stroke="currentColor"
                    className="size-6 "


                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                </svg>
            </button >
        </>
    )
}

export default WishListButton
