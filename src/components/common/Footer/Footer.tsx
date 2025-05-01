import { Link } from "react-router"

const Footer = () => {



    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <footer className="flex bg-white border-gray-200 border-t shadow-sm w-full bottom-0 dark:bg-gray-800 dark:border-gray-600 fixed left-0 md:block z-20">
            <div className="max-w-screen-xl md:flex md:items-center md:justify-between md:p-4 mx-auto">

                <ul className="flex flex-wrap p-2 text-gray-500 text-sm dark:text-gray-400 font-medium items-center mt-3 sm:mt-0">
                    <li>
                        <Link to="/" className="hover:underline md:me-6 me-4">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/#" className="hover:underline md:me-6 me-4">
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:underline md:me-6 me-4">
                            Licensing
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:underline">
                            Contact
                        </Link>
                    </li>
                </ul>
                <span className="text-gray-500 text-sm dark:text-gray-400 sm:text-center">
                    © {new Date().getFullYear()}{" "}
                    <Link to="/" className="hover:underline">
                        My E-Commerce™
                    </Link>
                    . All Rights Reserved.
                </span>
            </div>

        </footer>


    )
}

export default Footer
