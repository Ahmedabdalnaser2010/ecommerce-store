import Footer from "@components/common/Footer/Footer"
import Header from "@components/common/Header/Header"
import ToTopArrow from "@components/common/TopArrow/ToTopArrow"
import { Outlet } from "react-router"


const MAinLayout = () => {


    return (
        <>


            <Header />
            <div className="bg-zinc-50  min-h-screen sticky top-0">
                <div className="m-auto relative top-[150px] px-4 max-w-screen-xl w-full pb-[100px] bg-slate-50" >
                    <Outlet />
                </div>
            </div>
            <ToTopArrow />
            <Footer />

        </>
    )
}

export default MAinLayout
