import AddToCartButton from "@components/ecommerce/AddToCartButton/AddToCartButton"
import Loading from "@components/feedback/Loading/Loading"
import { TProducts } from "@customtypes/TProducts.types"
import { useEffect } from "react"
import { Link, useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getUserOrder } from "src/store/Slices/PlaceOrder/PlaceOrderSlice"


const ProductsInPreviousOrders = () => {

    const dispatch = useAppDispatch()

    const { order, loading, error } = useAppSelector(state => state.placeOrder)

    const { orderID, Id } = useParams<{ orderID: string | undefined, Id: string | undefined }>()

    const getOrder = order.filter(ele => (ele.id) === (Number(orderID)))

    const getItems = getOrder.flatMap(ele => ele.itemsInCart)



    useEffect(() => {

        dispatch(getUserOrder())


    }, [dispatch])



    const productsCard = () => {

        if (getItems.length > 0) {

            return getItems.map((item: TProducts) => (
                <>
                    <div key={item.id}>
                        <Link to={`/categories/${item.category}/${item.id}`}>
                            <div className='flex justify-between sm:justify-start items-center flex-col gap-3 sm:flex-row p-3 border-gray-100  rounded-t-lg shadow-lg md:h-[200px] h-[320px] bg-white'>
                                <div className='w-[200px] '>
                                    <img src={item.image} alt={item.title} className='w-[160px] mx-auto pt-4 sm:pt-0' />
                                </div>
                                <div className="flex flex-col  bg-white justify-between p-2 items-start sm:w-[380px] " >

                                    <h3 className="text-gray-900 text-sm font-medium mt-1.5 overflow-hidden max-h-[40px]" >{item.title}</h3>
                                    <span className="text-base text-gray-400 font-semibold pr-3">price: ${item.price.toFixed(2)}  </span>
                                    <p className="text-xl text-green-400 font-bold">In stock</p>
                                    <div className='flex justify-between items-center gap-8'>


                                    </div>
                                </div>

                            </div >
                        </Link>
                        <AddToCartButton id={item.id ?? 0} />
                    </div>
                </>
            ))
        } else {
            return <p>No products found for this brand.</p>;
        }

    }



    return (
        <div>
            <Loading loading={loading} error={error}>
                <div >
                    <h2 className='font-bold text-3xl text-center p-2 text-blue-400 italic mb-5'>Your order No. # {Id} </h2>


                    <div className='grid grid-cols-1 sm:grid-cols-1  gap-x-4 gap-y-6 md:grid-cols-1 lg:grid-cols-1 justify-items-center'>
                        {productsCard()}

                    </div>




                </div>
            </Loading>
        </div>
    )
}

export default ProductsInPreviousOrders
