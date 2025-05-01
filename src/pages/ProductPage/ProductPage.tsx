import Loading from "@components/feedback/Loading/Loading"
import ProductDetailsCard from "@components/ecommerce/Products/ProductDetailsCard"
import { TProducts } from "@customtypes/TProducts.types"
import { useEffect } from "react"
import { useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { fetchingProductDetails } from "src/store/Slices/productDetails/productDetailsSlice"


const ProductPage = () => {


    const dispatch = useAppDispatch()
    const { productData, loading: detailsLoading, error: detailsError } = useAppSelector(state => state.productDetails)
    const { id } = useParams()
    const idNumber = id ? Number(id) : null

    useEffect(() => {

        if (idNumber) {

            dispatch(fetchingProductDetails(idNumber))
        }

    }, [dispatch, idNumber])

    const productDetails = () => {

        if (productData.length) {


            const product = productData.find((item: TProducts) => item.id == idNumber)


            if (product) {
                return (
                    <div key={product.id} >
                        <ProductDetailsCard {...product} />
                    </div >
                )
            }

        } else {
            <div>Product Not Found</div>
        }
    }




    return (
        <div>
            <Loading loading={detailsLoading} error={detailsError}>
                {productDetails()}
            </Loading>
        </div>
    )
}

export default ProductPage



