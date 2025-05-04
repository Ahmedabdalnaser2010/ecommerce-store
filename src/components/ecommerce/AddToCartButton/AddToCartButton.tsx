import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { AddingItemModal } from "../AddingItemModal/AddingItemModal"
import Lottie from "lottie-react"
import { getItemsinCart, increamentItems } from "src/store/Slices/Cart/CartSlice"
import loading from "../../../../public/loading 2.json"
import { removeItemfromWishlist } from "src/store/Slices/WishListPage/WishListSlice"
import { Link } from "react-router"
import toast from "react-hot-toast"




const AddToCartButton = ({ id }: { id: number }) => {

    const dispatch = useAppDispatch()

    const [openModalClick, setOpenModalClick] = useState(false)

    const [isDisabled, setIsDisabled] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    const { items } = useAppSelector(state => state.cart)
    const { selectedItem } = useAppSelector(state => state.WishList)



    const addItemstoCart = () => {

        const toastId = toast.loading('Adding to cart...', {
            position: 'top-center'
        });

        setIsDisabled(true)

        if (!items[id] || items[id] < 5) {
            setTimeout(() => {
                setOpenModalClick(true)
                toast.success('Item added to cart!', {
                    id: toastId,
                    icon: '🛒',
                    duration: 3000
                })
            }
                , 1000)


        } else {
            toast.error('Maximum quantity reached!', {
                id: toastId,
                icon: '⚠️'
            });
        }
        dispatch(increamentItems(id))



        dispatch(getItemsinCart())



        if (selectedItem[id]) {
            dispatch(removeItemfromWishlist(id))
            toast('Removed from wishlist', {
                icon: '❤️',
                position: 'top-center'
            });
        }






    }


    useEffect(() => {

        if (!isDisabled) {
            return;
        } else if (items[id] < 5) {
            setTimeout(
                () => setIsDisabled(false),
                1000)
        } else {

            setIsCompleted(true)

        }


    }, [isDisabled, items, id])

    const MessageContent = () => {
        if (isDisabled && !isCompleted) {
            return (<div className="flex justify-center items-center ">
                <Lottie animationData={loading} style={{ width: "2em", marginLeft: "-2em", paddingRight: "0.5em", display: isCompleted ? "none" : "" }} />
                <span className="">Adding to Cart </span>
            </div>)
        } else if (isCompleted) {
            return (<div className="flex justify-center items-center flex-col leading-4"><span className="text-[0.85em]"> You Reached Your Limit .. </span ><Link to='/cart' className="text-blue-500 ">please check your Cart</Link></div>
            )


        } else {
            return (<div className="flex justify-center items-center flex-col leading-4 "><span>Add to Cart</span>  {items[id] <= 4 && <span className="text-[0.85em]">Remaining Items : {5 - (items[id] ?? 0)} / 5</span>}</div>)
        }


    }


    return (
        <>



            <div className="flex gap-4">
                <button
                    aria-label={isCompleted ? ("You Reached Your Limit ..") : ("Add to Cart<")}
                    disabled={isDisabled} style={{ backgroundColor: isDisabled ? "rgb(180 180 181)" : "" }} className="h-[40px] bg-blue-400 hover:bg-blue-500 rounded-sm text-sm text-white w-full block font-medium px-4 transition" onClick={addItemstoCart}
                >
                    {/* {isDisabled ? <div className="flex justify-center items-center "><Lottie animationData={loading} style={{ width: "2em", marginLeft: "-2em", paddingRight: "0.5em", display: isCompleted ? "none" : "" }} /> <span className="">Add to Cart</span></div> : isCompleted ? <span> You Exceeded Your Limit</span> : <span>Add to Cart</span>} */}
                    {MessageContent()}
                </button>

                <AddingItemModal status={openModalClick} onClose={() => { setOpenModalClick(false) }} id={id} />
            </div>

        </>
    )
}

export default AddToCartButton
