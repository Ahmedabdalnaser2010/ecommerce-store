import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { decreamentItems, increamentItems } from 'src/store/Slices/Cart/CartSlice'

const QuantitiyButton = ({ quantities, id }: { quantities: number | undefined, id: number }) => {

    const [isIncreasingDisabled, setIsIncreasingDisabled] = useState(false)
    const [isDecreasingDisabled, setIsDecreasingDisabled] = useState(false)

    // const { totalCountOfProducts } = useCart(false)

    const dispatch = useAppDispatch()

    const { items } = useAppSelector(state => state.cart)

    const increamentItemsCount = useCallback(() => {
        dispatch(increamentItems(id))
    }, [dispatch, id])

    const decraseeItemsCount = useCallback(() => {
        dispatch(decreamentItems(id))
    }, [dispatch, id])


    const updateIncreasedItemsCount = () => {


        increamentItemsCount()

    }
    const updatedecreasedItemsCount = () => {

        decraseeItemsCount()
    }

    useEffect(() => {
        if (items[id] >= 5) {
            setIsIncreasingDisabled(true)
        } else {
            setIsIncreasingDisabled(false)
        }
        if (items[id] <= 1) {
            setIsDecreasingDisabled(true)
        } else {
            setIsDecreasingDisabled(false)
        }
    }, [items, id])



    return (
        <form className="flex justify-center gap-4 items-center " onSubmit={(e) => e.preventDefault()}>



            <div className="flex">

                <input title="counter" type="text" className="border-gray-200 h-[40px] rounded-l text-center w-14" value={quantities} />
                <div className='flex flex-col font-bold'>
                    <button aria-label='add item' disabled={isIncreasingDisabled} onClick={updateIncreasedItemsCount} className="btn btn-soft h-[20px] p-2 rounded-b-none rounded-tl-none w-8">+</button>
                    <button aria-label='remove item' disabled={isDecreasingDisabled} onClick={updatedecreasedItemsCount} className="btn btn-soft h-[20px] p-2 rounded-bl-none rounded-t-none w-8">-</button>

                </div>
            </div>

        </form >
    )
}

export default QuantitiyButton
