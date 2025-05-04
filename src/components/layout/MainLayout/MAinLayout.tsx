import Footer from "@components/common/Footer/Footer"
import Header from "@components/common/Header/Header"
import ToTopArrow from "@components/common/TopArrow/ToTopArrow"
import { Outlet } from "react-router"


const MAinLayout = () => {


    return (
        <>


            <Header />
            <div className="bg-zinc-50 relative ">
                <div className="m-auto mt-[130px] min-h-[80vh] pt-[30px] px-4 max-w-screen-xl w-full pb-[100px] bg-slate-50" >
                    <Outlet />
                </div>
            </div>
            <ToTopArrow />
            <Footer />

        </>
    )
}

export default MAinLayout
