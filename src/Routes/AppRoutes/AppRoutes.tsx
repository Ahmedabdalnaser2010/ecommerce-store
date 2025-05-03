import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
const MAinLayout = lazy(() => import("@components/layout/MainLayout/MAinLayout"))
// import MAinLayout from "@components/layout/MainLayout/MAinLayout";
const Home = lazy(() => import("@pages/Home/Home"));
const About = lazy(() => import("@pages/About/About"));
const Register = lazy(() => import("@pages/Register/Register"));
const ProductPage = lazy(() => import("@pages/ProductPage/ProductPage"));
const NotFoundPage = lazy(() => import("@pages/Error Page/NotFoundPage"));
const Products = lazy(() => import("@pages/Products/Products"));
const CartPage = lazy(() => import("@pages/Cart/CartPage"));
const WishListPage = lazy(() => import("@pages/WishListPage/WishListPage"));
const ContactUs = lazy(() => import("@pages/ContactUs/ContactUs"));
const Login = lazy(() => import("@pages/Login/Login"));
const Profile = lazy(() => import("@pages/Profile/Profile"));
const ProtectedRoutes = lazy(() => import("@components/ecommerce/ProtectedRoutes/ProtectedRoutes"));
const Account = lazy(() => import("@pages/Account/Account"));
const DoneOrderPage = lazy(() => import("@pages/DoneOrderPage/DoneOrderPage"));
const PreviousOrders = lazy(() => import("@pages/Orders/PreviousOrders"));
const ProductsInPreviousOrders = lazy(() => import("@pages/Orders/ProductsInPreviousOrders"));




const AppRoutes = () => {



    const Routing = createBrowserRouter([



        {
            path: "/",
            element: (

                <Suspense fallback={
                    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-2xl'>
                        Please Wait for Loading    <span className="loading loading-spinner loading-xl"></span>
                    </div>

                } >
                    <MAinLayout />
                </Suspense >

            ),
            // errorElement: <NotFoundPage />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: "/categories/:category",
                    element: <Products />,
                    loader: ({ params }) => {
                        if (typeof params.category !== "string" || !/^[a-z]+$/.test(params.category)) {
                            throw new Response('bad request', { status: 400, statusText: 'invalid category ' })
                        }
                        return true
                    }


                },
                {
                    path: "/categories/:category/:id",
                    element: <ProductPage />,
                    loader: ({ params }) => {
                        if (Number.isNaN(Number(params.id))) {
                            throw new Response('bad request', { status: 400, statusText: 'invalid category id' })
                        }
                        return true
                    }
                }
                ,
                {

                },
                // {
                //     path: "/categories/products/:id/:productId",
                //     element: <ProductPage />
                // },
                {
                    path: "/about",
                    element: <About />
                },
                {
                    path: "/contact",
                    element: <ContactUs />
                },
                {
                    path: "/cart",
                    element: <CartPage />
                },

                {
                    path: "/previousOrders",
                    element: (
                        <ProtectedRoutes>
                            <PreviousOrders />
                        </ProtectedRoutes>
                    )
                },

                {
                    path: "/previousOrdersDetails/:orderID/:Id",
                    element: (
                        <ProtectedRoutes>
                            <ProductsInPreviousOrders />
                        </ProtectedRoutes>
                    )
                },
                {
                    path: "/doneOrder",
                    element: <DoneOrderPage />
                },
                {
                    path: "/wishlist",
                    element: (
                        <ProtectedRoutes>
                            <WishListPage />
                        </ProtectedRoutes>
                    )
                },

                {
                    path: "/register",
                    element: <Register />
                },

                {
                    path: "/login",
                    element: <Login openLoginModal={true} onCloseModal={() => { window.history.back() }} />,

                },
                {

                    path: "/account",
                    element: (
                        <ProtectedRoutes>
                            <Account />
                        </ProtectedRoutes>
                    )
                },

                {

                    path: "/profile",
                    element: (
                        <ProtectedRoutes>
                            <Profile />
                        </ProtectedRoutes>
                    )
                }

            ]

        }

    ])


    return <>

        <RouterProvider router={Routing} />

    </>
}

export default AppRoutes