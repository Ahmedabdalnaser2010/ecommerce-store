import { TProducts } from '@customtypes/TProducts.types'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { CiHeart } from "react-icons/ci";
import QuantitiyButton from '../AddToCartButton/QuantitiyButton/QuantitiyButton'
import { useDispatch } from 'react-redux'
import { removeItem } from 'src/store/Slices/Cart/CartSlice'
import { wishListState } from 'src/store/Slices/WishListPage/WishListSlice';
import { useAppSelector } from 'src/store/hooks';
// import useCart from 'src/Hooks/useCart';


const SelectedItemCard = ({ title, color, price, image, quantities, id }: TProducts) => {

    const { accessToken } = useAppSelector(state => state.auth)

    const dispatch = useDispatch()

    const removeItemsfromCart = () => {

        dispatch(removeItem(id))

    }

    const saveItemsLaterHandler = () => {
        dispatch(wishListState(id))
        dispatch(removeItem(id))
    }


    return (
        <div className='flex justify-between sm:justify-start items-center flex-col sm:flex-row p-3 border-gray-100 rounded-lg shadow-md h-[380px] sm:h-[250px] bg-white text-black'>
            <div className='sm:w-[280px] w-[180] '>
                <img src={image} alt={title} className='w-[180px]  mx-auto pt-4 sm:pt-0' />
            </div>
            <div className="flex flex-col  justify-between p-2 items-start sm:w-[380px] " >

                <h3 className="text-gray-900 text-sm font-medium mt-1.5 overflow-hidden max-h-[40px]" >{title}</h3>
                <span className="text-base text-gray-400 capitalize font-semibold">Available Color: {color}</span>
                <span className="text-base text-blue-400 font-semibold pr-3">price: ${price.toFixed(2)}  </span>
                <p className="text-xl text-green-400 font-bold">In stock</p>
                <div className='flex justify-between items-center gap-6'>
                    <div className="flex items-center justify-start gap-2 text-xl w-full">
                        <button aria-label='remove' onClick={removeItemsfromCart} className='flex items-center justify-between text-gray-500 hover:text-gray-700'> <RiDeleteBin5Line /><span className=' text-sm font-semibold ml-2 '>Remove</span></button>
                        <QuantitiyButton quantities={quantities} id={Number(id)} />
                    </div>
                    <div className="flex items-center justify-start gap-2 text-xl w-full ">
                        <button aria-label='Save for later' onClick={saveItemsLaterHandler} disabled={!accessToken ? true : false} className='flex items-center justify-between text-gray-500 hover:text-red-500'> <CiHeart className='text-2xl' /><span className=' text-sm font-semibold ml-2 '>Save for later</span></button>

                    </div>
                </div>



            </div>

        </div >

    )
}

export default SelectedItemCard
