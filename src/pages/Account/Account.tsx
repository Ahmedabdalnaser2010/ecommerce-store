// import Loading from "@components/feedback/Loading/Loading"
import { Link } from "react-router-dom"
import logoOne from "../../assets/Account page/security._CB657836742_.webp"
import logoTwo from "../../assets/Account page/order._CB657847415_.webp"
import logoThree from "../../assets/Account page/11_lists._CB608110873_.webp"
import logoFour from "../../assets/Account page/contact_us._CB665051409_.webp"



const Account = () => {

    const accountPageContent = [
        { link: "/profile", name: "Profile Info", content: "Your full info first name, last name, email .", image: logoOne },
        { link: "/cart", name: "Your Orders", content: "Track, return, cancel an order,  buy again .", image: logoTwo },
        { link: "/wishlist", name: "Your Wishlist", content: "View, modify and share your lists .", image: logoThree },
        { link: "/contact", name: "Contact Us", content: "Browse self service options, help articles or contact us . ", image: logoFour },


    ]


    const mappingPageContent = accountPageContent.map((items) => {

        return (
            <>
                <Link to={items.link} className=" flex w-[340px] h-[120px] p-3 bg-white shadow-md rounded-xl items-center justify-around ">
                    <div className="mr-4 w-[150px] ">
                        <img
                            alt={items.name}
                            src={items.image}
                            className="size-16 rounded-full object-cover sm:size-[72px]"
                        />
                    </div>
                    <div>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white py-2">
                            {items.name}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {items.content}
                        </p>
                    </div>
                </Link>
            </>

        )

    })

    return (
        <div className=" flex flex-col">

            <h2 className="text-3xl p-2 mx-auto text-blue-400 font-bold">Your Account </h2>
            <div className="flex items-center justify-center flex-wrap  mt-5  gap-4">
                {mappingPageContent}
            </div>

        </div>


    )
}

export default Account



