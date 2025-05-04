import { TOrder } from "@customtypes/TOrder.types";
import { ModalBody, ModalFooter, ModalHeader, Modal } from "flowbite-react";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useCart from "src/Hooks/useCart";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { clearItemsAfterOrdering, setItems } from "src/store/Slices/Cart/CartSlice";
import { getUserOrder, postUserOrder } from "src/store/Slices/PlaceOrder/PlaceOrderSlice";
import { getItemsinWishList } from "src/store/Slices/WishListPage/actGetItemsinWishList";
import loading from "../../../../public/loading 2.json"


const SubmitingOrder = ({ openModal, onClose, totalprice }: { openModal: boolean, onClose: () => void, totalprice: number }) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.auth)
    const { items } = useAppSelector(state => state.cart)
    const { loading: orderloading } = useAppSelector(state => state.placeOrder)
    const { productDetails, gettingSubtotal } = useCart(false)
    const { selectedItem, wishItemState } = useAppSelector(state => state.WishList)


    const [submitOrder, setSubmitOrder] = useState(false)
    const [isButtonDisabled, setIsButtonDisabledn] = useState(false)




    const orderDitails: TOrder = {

        userId: user?.id ?? 0,
        itemsInCart: productDetails,
        itemsInWishList: selectedItem,
        stateItemsInWishList: wishItemState,
        allItems: items,
        excuted: !submitOrder,
        subTotal: gettingSubtotal(),

    }



    useEffect(() => {
        dispatch(getItemsinWishList())
        dispatch(getUserOrder())
    }, [dispatch])



    const handleCheckoutClick = () => {

        setIsButtonDisabledn(true)
        setTimeout(() => {



            dispatch(postUserOrder(orderDitails)).unwrap().then(() => {


                navigate("/doneOrder")


                dispatch(clearItemsAfterOrdering())

                dispatch(setItems({}))
                setIsButtonDisabledn(false)

                setSubmitOrder(true)
            })

        }, 3000)
    }




    return (
        <>

            <Modal show={openModal} onClose={onClose}>
                <ModalHeader>Submitting Your Order !</ModalHeader>
                <ModalBody>

                    <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400">
                        You are about to submit your order !<br />Are you sure you want to place order with <span className="font-bold">${totalprice}</span> ?
                    </p>


                </ModalBody>
                <ModalFooter className="flex justify-end">

                    <button disabled={isButtonDisabled} aria-label='accept order' onClick={handleCheckoutClick} className=" disabled:bg-gray-400 flex items-center justify-center w-[120px] h-[40px] bg-blue-400 hover:bg-blue-500 rounded-lg  text-sm text-white font-medium px-4 "> <Lottie animationData={loading} style={{ width: "2em", marginLeft: "-2em", paddingRight: "0.5em", display: isButtonDisabled == false ? "none" : "" }} />I accept</button>
                    <button aria-label='secline order' onClick={onClose} className="h-[40px] bg-gray-400 hover:bg-gray-500 rounded-lg  text-sm text-white  block font-medium px-4 ">Decline</button>

                </ModalFooter>
            </Modal >
        </>
    );
}

export default SubmitingOrder
