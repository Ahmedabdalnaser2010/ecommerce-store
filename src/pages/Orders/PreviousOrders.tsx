import Loading from "@components/feedback/Loading/Loading"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getUserOrder } from "src/store/Slices/PlaceOrder/PlaceOrderSlice"




const PreviousOrders = () => {

    const dispatch = useAppDispatch()
    const { order, loading, error } = useAppSelector(state => state.placeOrder)
    const { user } = useAppSelector(state => state.auth)
    // const getUserId = order.filter(ele => { return ele.userId == user?.id })



    useEffect(() => {
        if (user) {
            dispatch(getUserOrder())
        }


    }, [dispatch, user])




    const filterUserOrders = Array.isArray(order) ? order.filter(ele => Number(ele.userId) == Number(user?.id) && ele.excuted === true) : []



    const ordersforUser = filterUserOrders.map(el => el.itemsInCart)

    const idOfOrdersforUser = filterUserOrders.map(el => el.id)

    const getItemsInEachOrder = ordersforUser.map(ele => ele.length)

    // const getIdsInEachOrder = ordersforUser.map(ele => ele.map((curr) => curr.id))

    // const concatenatedIds = getIdsInEachOrder.map(el => el.map(ele => { return `id=${ele}` }).join("&"))




    const getQuantities = ordersforUser.map(ele => ele.reduce((prev, curr) => prev + (curr.quantities ?? 0), 0))


    const mappingOrders = filterUserOrders.map(ele => {

        return (

            <tr key={ele.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    # {filterUserOrders.indexOf(ele) + 1}
                </th>
                <td className="px-6 py-4">{getItemsInEachOrder[filterUserOrders.indexOf(ele)]} item(s)/ <Link className="text-blue-400 hover:text-blue-500 text-sm" to={`/previousOrdersDetails/${idOfOrdersforUser[filterUserOrders.indexOf(ele)]}/${Number([filterUserOrders.indexOf(ele)]) + 1}`} >Product Details</Link ></td>
                <td className="px-6 py-4">{getQuantities[filterUserOrders.indexOf(ele)]}</td>
                <td className="px-6 py-4 text-base font-semibold text-gray-950">${ele.subTotal}</td>

            </tr>
            // { concatenatedIds[filterUserOrders.indexOf(ele)] }
        )
    })
    console.log(mappingOrders)
    return (

        <div>
            <h2 className='font-bold text-3xl text-center p-2 text-blue-400  italic mb-5 '>Your Previous Orders</h2>
            <Loading loading={loading} error={error}>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:w-[70%] m-auto">
                    <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400  ">
                        <thead className="text-base text-gray-700 shadow-md bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr className="">
                                <th scope="col" className="px-6 py-3">
                                    Order Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Items
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Counts
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Price
                                </th>

                            </tr>
                        </thead>
                        <tbody>


                            {mappingOrders}

                        </tbody>
                    </table>
                </div>
            </Loading >
        </div >

    )
}

export default PreviousOrders

