
import { useState } from "react"


import SubmitingOrder from "./SubmitingOrder"
import { useAppSelector } from "src/store/hooks";
import { useNavigate } from "react-router";





const SubtotalCard = ({ totalprice, totalCount, totalDiscount }: { totalprice: number, totalCount: number, totalDiscount: number }) => {

    const [openModal, setOpenModal] = useState(false);
    const { accessToken } = useAppSelector(state => state.auth)

    const navigate = useNavigate()

    const priceBeforeDiscount = `${Number(totalprice) + Number(totalDiscount)}.00`



    return (
        <div className="h-[280px]  lg:w-[300px] mt-9 lg:mt-0 w-[320px] text-gray-700 " >
            <div className='flex justify-evenly items-center flex-col p-4 bg-gray-50 border-gray-100 rounded-t-lg rounded-b-none '>



                <h3 className="text-gray-900 text-xl font-semibold my-1.5 text-center  " >Order Summary</h3>
                <div className="py-5 border-t-2 border-b-2  w-full  flex flex-col justify-evenly items-start">
                    <div className="w-[200px] text-base  font-semibold flex justify-between">
                        <span >Items Count:</span>
                        <span className="w-[40px] text-left">{totalCount}</span>
                    </div>
                    <div className="w-[200px] text-base  font-semibold flex justify-between">
                        <span>Total Price:</span>
                        <span className="w-[40px] text-left">${priceBeforeDiscount}</span>
                    </div>
                    <div className="w-[200px] text-base  font-semibold flex justify-between">
                        <span>Delivery:</span>
                        <span className="text-green-500 w-[40px] text-left">free</span>
                    </div>
                    <div className="w-[200px] text-base  font-semibold flex justify-between">
                        <span>Discount:</span>
                        <span className="text-red-500 w-[40px] text-left">${totalDiscount}</span>
                    </div>
                </div>

                <h3 className="text-gray-900 text-xl w-[200px] font-semibold mt-1.5  flex justify-between self-start" >
                    <span>Subtotal:</span>
                    <span className="w-[40px] text-left">${totalprice}</span>
                </h3>

            </div >
            <>
                <button aria-label='checkout' onClick={accessToken ? () => setOpenModal(true) : () => navigate("/login")} className="h-[40px] bg-blue-400 rounded-b-lg rounded-t-none  text-sm text-white w-full block font-medium px-4 transition">Checkout </button>

                <SubmitingOrder openModal={openModal} onClose={() => { setOpenModal(false) }} totalprice={totalprice} />
            </>


        </div>
    )
}

export default SubtotalCard
