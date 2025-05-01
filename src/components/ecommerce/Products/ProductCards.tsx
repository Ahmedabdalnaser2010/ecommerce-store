import { TProducts } from "@customtypes/TProducts.types"
import { Link } from "react-router";

// import logoImg from "../../../../public/15d547ef4677eb4bcc5f1b7e8d8a451e7c2446254af55f4bd50fb203b4771ad4 (1).jpeg"

import AddToCartButton from "../AddToCartButton/AddToCartButton";

import WishListButton from "../WishListButton/WishListButton";








const ProductCards = ({ title, description, price, discount, id, category, image }: TProducts) => {



    const effectiveDiscount = discount ?? 0;

    const checkDiscount = effectiveDiscount == 0 ? "" : "$" + (price / (1 - (effectiveDiscount / 100))).toFixed(0) + '.00'



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





    return (

        <div className="rounded-lg shadow-md block group max-w-[300px] overflow-hidden relative">

            <WishListButton id={id} />

            <span className="text-[0.9em] text-white absolute font-medium left-4 px-3 top-3 z-10">
                {offBadge()}
            </span>


            <div className="shadow-lg">
                <Link to={`/categories/${category}/${id}`} >
                    <img
                        src={image}
                        alt={title}
                        className="h-[200px] p-2 w-full duration-500 group-hover:scale-105 object-contain sm:h-72 transition bg-white shadow-lg"
                    />

                    <div className="bg-slate-50 border-gray-100 border-t h-[140px] p-4 relative" >
                        <div className=" ">
                            <span className="text-blue-700 font-bold pr-3">${price.toFixed(2)}  </span>
                            <span className="text-gray-400 font-semibold line-through">{checkDiscount}</span>

                        </div>
                        <h3 className="h-[30px] text-gray-900 text-base font-medium mt-1 overflow-hidden" title={title}>{title.substring(0, 25)} ...</h3>

                        <p className="h-[60px] text-gray-700 text-sm line-clamp-3 mt-1">
                            {description?.substring(0, 55)} ... <Link to="#" className="text-blue-400 text-sm underline">More Details</Link>
                        </p>
                    </div>
                </Link>
            </div>


            <div className=" ">

                <AddToCartButton id={id} />
            </div>
        </div >


    )
}

export default ProductCards
