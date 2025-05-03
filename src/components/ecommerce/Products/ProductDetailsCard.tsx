import { TProducts } from "@customtypes/TProducts.types"
import { RatingComponent } from "../Rating/RatingComponent";
import { LuHeartOff } from "react-icons/lu";
// import logoImg from "../../../../public/15d547ef4677eb4bcc5f1b7e8d8a451e7c2446254af55f4bd50fb203b4771ad4 (1).jpeg"
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { useDispatch } from "react-redux";
import { wishListState } from "src/store/Slices/WishListPage/WishListSlice";
import { removeItem } from "src/store/Slices/Cart/CartSlice";
import { CiHeart } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useAppSelector } from "src/store/hooks";






const ProductDetailsCard = ({ title, image, price, description, brand, model, color, category, discount, id }: TProducts) => {

    const dispatch = useDispatch()

    const [disableSaveButton, setDisableSaveButton] = useState(false)

    const { wishItemState } = useAppSelector(state => state.WishList)


    const savedItems = Object.keys(wishItemState).map(it => {
        return Number(it)
    })


    const effectiveDiscount = discount ?? 0;


    const checkDiscount = effectiveDiscount == 0 ? "" : "$" + (price * (1 + (effectiveDiscount / 100))).toFixed(0) + '.00'
    const offBadge = () => {

        if (effectiveDiscount == 0) {
            return <span className="bg-green-500 rounded px-3">
                New Arrival
            </span>
        } else {
            return <span className="bg-blue-500 rounded px-3">
                {discount}% off
            </span>
        }
    }

    useEffect(() => {

        if (savedItems.includes(Number(id))) {
            setDisableSaveButton(false)
        } else {
            setDisableSaveButton(true)
        }
    }, [id, savedItems])


    const saveItemsLaterHandler = () => {
        if (id !== undefined) {
            dispatch(wishListState(id))
            dispatch(removeItem(id))
            setDisableSaveButton(!disableSaveButton)
        }
    }



    return (
        <div className="rounded-xl shadow-md w-[full] bg-white">
            <div className="flex flex-col justify-between sm:flex-row  sm:align-items-start">
                <div className="md:w-[400px] w-[300px] p-4 flex mt-2 mx-auto flex-col items-center">
                    <div className="flex items-center justify-start gap-2 text-xl  self-center ">
                        <button aria-label='Save for later/remove dislike' onClick={saveItemsLaterHandler} className='flex items-center justify-between text-gray-500'> {!disableSaveButton ? <LuHeartOff className='text-2xl' /> : <CiHeart className='text-2xl' />}<span className=' text-sm font-semibold ml-2 '>{!disableSaveButton ? "Remove from Wishlist" : "Save for later"}</span></button>

                    </div>

                    <img
                        src={image}
                        alt={title}
                        className="w-[180px] duration-500 group-hover:scale-105 object-contain sm:h-72 transition"
                    />

                    <form className="flex justify-center gap-4 items-center md:mt-12 mt-6 pb-7" onSubmit={(e) => e.preventDefault()}>
                        {/* <button className="bg-blue-400 rounded-lg text-sm text-white w-[200px] block font-medium hover:scale-105 md:w-[260px] px-4 py-3 transition"
                        >
                            Add to Cart
                        </button> */}
                        <div className="w-[200px] rounded-lg overflow-hidden">
                            <AddToCartButton id={id} />
                        </div>

                    </form>

                </div>



                <div className="flex flex-col bg-white border-gray-100 border-t justify-between p-6 items-start  rounded-xl" >
                    <div className="flex flex-col  justify-between items-start mb-3">
                        <h3 className="text-gray-900 text-lg font-medium mt-1 overflow-hidden" >{title}</h3>
                        <span className="text-xl text-orange-700 capitalize font-bold">{brand}</span>
                        <RatingComponent />
                        <div className="price">
                            <span className="text-xl text-blue-600 font-bold pr-3 ">${price.toFixed(2)}  </span>
                            <span className="text-gray-400 text-2xl font-semibold line-through">{checkDiscount}</span>
                            <span className="text-[0.9em] text-white font-medium px-3">
                                {offBadge()}
                            </span>
                        </div>
                    </div>

                    <div className="text-gray-700">
                        <h2 className="border-t text-xl font-bold pt-1">Product Overview </h2>
                        <p className="text-xl text-green-500 font-bold">In stock</p>
                        <div>
                            <div className="mt-1">
                                <span className="text-base font-bold">Brand:</span>
                                <span className="text-gray-700 capitalize  pl-2">
                                    {brand}
                                </span>
                            </div>
                            <div className="mt-1">
                                <span className="text-base font-bold">Category:</span>
                                <span className="text-gray-700 capitalize  pl-2">
                                    {category}
                                </span>
                            </div>
                            <div className="mt-1">
                                <span className="text-base font-bold">Product Model:</span>
                                <span className="text-gray-700 capitalize pl-2">
                                    {model}
                                </span>
                            </div>
                            <div className="mt-1">
                                <span className="text-base font-bold">Description:</span>
                                <span className="text-gray-700 pl-2 leading-tight ">
                                    {description}
                                </span>
                            </div>
                            <div className="mt-1">
                                <span className="text-base font-bold">Available Colors:</span>
                                <span className="text-gray-700 capitalize  pl-2">
                                    {color}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div >

        </div>

    )
}

export default ProductDetailsCard
