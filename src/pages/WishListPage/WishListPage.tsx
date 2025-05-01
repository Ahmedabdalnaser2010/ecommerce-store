import ProductCards from "@components/ecommerce/Products/ProductCards"
import Loading from "@components/feedback/Loading/Loading"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getItemsinWishList } from "src/store/Slices/WishListPage/actGetItemsinWishList"
import EmptyWishListPage from "./EmptyWishListPage"




const WishListPage = () => {

    const dispatch = useAppDispatch()

    const { products, loading, error, selectedItem } = useAppSelector(state => state.WishList)
    const { items } = useAppSelector(state => state.cart)


    useEffect(() => {

        dispatch(getItemsinWishList())


    }, [dispatch, selectedItem, items])



    return (
        <>
            <h2 className='font-bold text-3xl text-center p-2 text-blue-400 italic mb-5'>Your WishList

            </h2>

            <Loading loading={loading} error={error}>
                {Object.keys(selectedItem).length > 0 ? <div className='grid grid-cols-1 sm:grid-cols-2  gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4  justify-items-center mt-20 '>
                    {products.map((item) => (

                        <div key={item.id}>

                            <ProductCards {...item} />

                        </div>
                    ))}
                </div >
                    :
                    <EmptyWishListPage />}
            </Loading>

        </>
    )
}

export default WishListPage
