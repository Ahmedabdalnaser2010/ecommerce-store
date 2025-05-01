
import { useAppSelector } from "src/store/hooks"
import { FaFilter, FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { MdSort } from "react-icons/md";




const FilteringAndSortingList = ({ filterByBrands, reset, sortByPrice }: { filterByBrands: (brand: string | undefined) => void, reset: () => void, sortByPrice: (order: string) => void }) => {


    const { ProdSameCatsData } = useAppSelector(state => state.ProdSameCat)


    const getProductsByBrandArr = ProdSameCatsData.map((item) => {

        return item.brand


    })

    const removeDupliaction = getProductsByBrandArr.filter((el, ind) => {
        return getProductsByBrandArr.indexOf(el) == ind
    })



    const getBrandstoDropDown = removeDupliaction.map((item, index) => {
        return <li key={index} onClick={() => filterByBrands(item)} >
            <a className="font-semibold">{item}</a>
        </li>
    })

    const ascendingSort = () => {
        sortByPrice("ascending")
    }
    const descendingSort = () => {
        sortByPrice("descending")
    }


    return (
        <div className="rounded-lg shadow-md flex  group p-4 mx-4 justify-between lg:items-start items-center relative flex-col md:flex-row bg-white">

            <div className="flex flex-row lg:flex-col justify-between lg:items-center ">
                <div className="flex lg:flex-col items-start">
                    <div className="flex justify-between lg:items-center mb-2 flex-col lg:flex-row">
                        <div className="flex flex-row items-center"><FaFilter className=" w-[20px]" />  <h1 className="font-bold ml-2 py-2">Filter</h1></div>
                    </div>

                    <div className="flex justify-center flex-col items-center ">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1 bg-blue-400 md:w-[200px] w-[60px]  text-white font-bold"> Brands</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-white  rounded-box z-1 w-52 p-2 shadow-md ">
                                {getBrandstoDropDown}

                            </ul>
                        </div>
                        {/* <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1 bg-blue-400 md:w-[200px] w-[60px]  text-white font-bold"> Sale</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                {getBrandstoDropDown}

                            </ul>
                        </div> */}
                    </div>
                </div>
                <div className="flex lg:flex-col items-start">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex flex-row items-center"><MdSort className="text-2xl w-[20px]" />  <h1 className="font-bold ml-2 py-2">Sort</h1></div>

                    </div>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1 bg-blue-400 md:w-[200px] w-[60px] text-white font-bold"> Prices</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-md">

                            <li onClick={ascendingSort} ><a className="flex justify-evenly items-center"><span className="font-semibold w-[120px]">Price Low to High</span> <FaLongArrowAltUp /> </a></li>
                            <li onClick={descendingSort} > <a className="flex justify-evenly items-center"><span className="font-semibold w-[120px]">Price High to Low</span> <FaLongArrowAltDown /> </a></li>

                        </ul>
                    </div>
                </div>
            </div>
            <button aria-label='reset all' className=" p-1 rounded-lg bg-zinc-300 text-zinc-600 w-[80px] lg:absolute right-[20px] top-[22px]  font-medium text-[0.85em] self-center" onClick={reset}>Reset All</button>
        </div >
    )
}

export default FilteringAndSortingList


