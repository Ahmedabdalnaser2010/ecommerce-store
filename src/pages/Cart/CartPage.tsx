import SelectedItemCard from '@components/ecommerce/Cart/SelectedItemCard'
import SubtotalCard from '@components/ecommerce/SubTotal/SubtotalCard'
import Loading from '@components/feedback/Loading/Loading'
import EmptyCartPage from '@pages/EmptyCartPage/EmptyCartPage'
import { useEffect } from 'react'
import useCart from 'src/Hooks/useCart'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { getItemsinCart } from 'src/store/Slices/Cart/actGetItemsinCart'




const CartPage = () => {

    const { productDetails } = useCart(true)

    const dispatch = useAppDispatch()

    const { loading, error } = useAppSelector(state => state.cart)



    useEffect(() => {

        dispatch(getItemsinCart())

    }, [dispatch])


    const checkedoutItemsPrice = () => {
        const mapping = productDetails.map(items => {
            const price = items.price * (items.quantities ?? 1)
            return price
        })
        const TotalPrice = mapping.reduce((prev, curr) => { return prev + curr }, 0)
        return `${TotalPrice}.00`
    }


    const checkedoutItemsCount = () => {
        const mapping = productDetails.map(items => {
            const count = items.quantities
            return count
        })
        const TotalQuantities = mapping.reduce((prev, curr) => { return Number(prev) + Number(curr) }, 0)
        return TotalQuantities
    }


    const checkedoutItemsdiscount = () => {
        const mapping = productDetails.map(items => {
            const discount = items.price / ((1 - ((items.discount ?? 0) / 100))) - items.price
            return Number(discount.toFixed(0)) * (items.quantities ?? 1)
        })
        const totalDiscountAmount = mapping.reduce((prev, curr) => { return prev + curr }, 0)
        return `${totalDiscountAmount}.00`
    }



    return (

        <div>
            <h2 className='font-bold text-3xl text-center p-2 text-blue-400 italic mb-5'>Your Shopping Cart</h2>
            <Loading loading={loading} error={error}>

                {Object.keys(productDetails).length > 0 ? (

                    <div className='flex justify-between flex-col lg:flex-row items-center lg:items-start '>
                        < div className='flex flex-col gap-y-5  max-w-[400px] sm:max-w-[600px]' >
                            {
                                productDetails.map((pro) => (

                                    <div key={pro.id} className=''>
                                        <SelectedItemCard {...pro} />
                                    </div>
                                )
                                )
                            }

                        </ div >
                        <div>
                            <SubtotalCard totalprice={checkedoutItemsPrice()} totalCount={checkedoutItemsCount()} totalDiscount={checkedoutItemsdiscount()} />
                        </div>
                    </div>
                ) :
                    (<EmptyCartPage />)}
            </Loading>

        </div>

    )
}

export default CartPage