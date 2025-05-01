import PaginationComponent from "@components/common/PaginationComponent/PaginationComponent"
import FilteringAndSortingList from "@components/ecommerce/FilteringAndSorting/FilteringAndSortingList"
import ProductCards from "@components/ecommerce/Products/ProductCards"
import Loading from "@components/feedback/Loading/Loading"
import { TProducts } from "@customtypes/TProducts.types"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { fetchingProdSameCatsData } from "src/store/Slices/ProdSameCat/ProdSameCatSlice"




const Products = () => {


    const [filteringByBrand, setFilteringByBrand] = useState<string | undefined>("")
    const [sortByPrices, setSortByPrices] = useState<string | undefined>("")

    const dispatch = useAppDispatch()
    const { ProdSameCatsData, loading, error } = useAppSelector(state => state.ProdSameCat)
    const { category } = useParams()



    useEffect(() => {
        // let category: string

        if (category && typeof category === "string") {

            dispatch(fetchingProdSameCatsData(category))

        }

    }, [dispatch, category])



    // ///////////////////////////////////////////////
    // Pagination

    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page: number) => setCurrentPage(page);

    const filter = ProdSameCatsData.filter((item: TProducts) => item.brand == filteringByBrand)

    const productsCountPerPage = 12

    const getNumberofPages = () => {
        if (filter.length > 0) {
            return filter.length
        } else {
            return ProdSameCatsData.length
        }
    }

    const numberOfPages = Math.ceil(getNumberofPages() / productsCountPerPage)



    const firstIndex = ((currentPage - 1) * productsCountPerPage)
    const lastIndex = (firstIndex + productsCountPerPage)

    const ProductsPerPage = ProdSameCatsData.slice(firstIndex, lastIndex)

    // ///////////////////////////////////////////////


    const getFilteredProducts = filter.length > 0 ? filter : ProductsPerPage

    const prod = [...getFilteredProducts]

    const sortingByPrice = sortByPrices === "ascending" ?
        prod.sort((a, b) => a.price - b.price) :
        sortByPrices === "descending" ?
            prod.sort((a, b) => b.price - a.price) :
            prod



    const ProdSameCatsList = () => {

        if (sortingByPrice.length > 0) {

            return sortingByPrice.map((item: TProducts) => (
                <>
                    <div key={item.id}>
                        <ProductCards {...item} />
                    </div>
                </>
            ))
        } else {
            return <p>No products found for this brand.</p>;
        }

    }


    const resetFilteration = () => {
        setFilteringByBrand(undefined)
        setSortByPrices(undefined)

    }



    return (
        <div>
            <Loading loading={loading} error={error}>
                <div >
                    <h1 className="text-xl font-bold capitalize text-center text-gray-600 flex items-baseline justify-center">
                        Product Category : <span className="text-blue-400 text-2xl pl-1">{category}</span> <span className="bg-zinc-300 text-zinc-600 ml-4 px-2 rounded-full font-semibold text-base  " >
                            {getNumberofPages()} products</span> </h1>
                    <div className="flex justify-between  lg:mt-20 mt-5 flex-col lg:flex-row">
                        <div className="mb-4">
                            <FilteringAndSortingList sortByPrice={setSortByPrices} filterByBrands={setFilteringByBrand} reset={resetFilteration} />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2  gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-3  justify-items-center'>
                            {ProdSameCatsList()}
                        </div>

                    </div>


                </div>
                <PaginationComponent pagesCount={numberOfPages} currentPage={currentPage} onPageChange={onPageChange} />
            </Loading>
        </div>

    )
}

export default Products
