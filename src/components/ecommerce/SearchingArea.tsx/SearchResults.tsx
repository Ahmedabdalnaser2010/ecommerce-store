import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { fetchingProductsData } from "src/store/Slices/Products/ProductsSlice"


const SearchResults = ({ input, setInput }: { input: string, setInput: (e: string) => void }) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const { productData } = useAppSelector(state => state.products)

    useEffect(() => {
        if (productData.length == 0) {
            dispatch(fetchingProductsData())
        }

    }, [dispatch, productData])


    const SearchingEquation = productData.filter(ele => ele.category?.trim().toLocaleLowerCase().includes(input.toLocaleLowerCase()) || (ele.title.trim().toLocaleLowerCase().includes(input.toLocaleLowerCase())) || (ele.brand?.trim().toLocaleLowerCase().includes(input.toLocaleLowerCase())))



    const mapingSearchingResults = () => {

        if (input) {

            return (


                <>
                    <div className="absolute top-[50px] left-[50%] translate-x-[-50%] p-2 bg-white shadow-lg opacity-[96%] flex flex-col w-full rounded-2xl max-h-[450px] overflow-y-scroll gap-2 min-w-[300px]" >
                        {SearchingEquation.length > 0 ? (SearchingEquation.map(el => {
                            return (
                                <div className="  h-[60px] text-wrap flex items-center hover:bg-gray-200 p-1 rounded-md">
                                    <img src={el.image} alt={el.title} className="w-[40px] h-[30px]" />
                                    <div key={el.id} onClick={() => { navigate(`/categories/${el.category}/ ${el.id}`); setInput("") }} className="h-[100%] w-full px-2  hover:text-blue-400 cursor-pointer overflow-hidden">{el.title}</div>
                                </div>

                            )
                        }
                        )
                        ) : (<div className="font-semibold m-auto"> No Results found</div>)}
                    </div>
                </>
            )

        } else {
            return null
        }


    }

    return (
        <>
            {mapingSearchingResults()}
        </>




    )
}

export default SearchResults
