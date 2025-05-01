import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent'
import CarouselforOffers from '@components/ecommerce/carousel/CarouselforOffers'
import CategoryCard from '@components/ecommerce/Categories/CategoryCard'
import ProductCards from '@components/ecommerce/Products/ProductCards'
import Loading from '@components/feedback/Loading/Loading'
import { TProducts } from '@customtypes/TProducts.types'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { fetchingCategory } from 'src/store/Slices/Categories/CategorySlice'
import { getUserOrder } from 'src/store/Slices/PlaceOrder/PlaceOrderSlice'
import { fetchingProductsData } from 'src/store/Slices/Products/ProductsSlice'


const Home = () => {
    const dispatch = useAppDispatch()
    const { categorydata, loading: categoryLoading, error: categoryError } = useAppSelector(state => state.category)
    const { productData, loading: productsLoading, error: productsError } = useAppSelector(state => state.products)

    useEffect(() => {

        dispatch(fetchingCategory())
        dispatch(getUserOrder())


        if (productData.length == 0) {
            dispatch(fetchingProductsData())
        }

    }, [dispatch, productData])


    const categoryList = () => {

        if (categorydata.length > 0) {
            return categorydata.map((item) => (
                <div key={item.id}>
                    <CategoryCard category={item.category} image={item.image} />
                </div>
            ));
        } else {
            return <span>No data available</span>; // Message for empty data
        }

    };

    // ///////////////////////////////////////////////
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page: number) => setCurrentPage(page);



    const productsCountPerPage = 20
    const numberOfPages = Math.ceil(productData.length / productsCountPerPage)



    const firstIndex = ((currentPage - 1) * productsCountPerPage)
    const lastIndex = (firstIndex + productsCountPerPage)

    const ProductsPerPage = productData.slice(firstIndex, lastIndex)

    // ///////////////////////////////////////////////


    const productsList = () => {

        if (ProductsPerPage.length > 0) {
            return ProductsPerPage.map((item: TProducts) => (
                <div key={item.id}><ProductCards {...item} /></div>
            ))

        }

    }




    return (
        <div className='flex justify-center flex-col '>
            <CarouselforOffers />
            <Loading loading={categoryLoading} error={categoryError}>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6 justify-items-center mb-10 pb-10 '>
                    {categoryList()}
                </div>
            </Loading>
            <hr className='border-b-[1px] shadow-2xl'></hr>
            <Loading loading={productsLoading} error={productsError}>

                <div className='grid grid-cols-1 sm:grid-cols-2  gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4  justify-items-center mt-20 '>{productsList()}</div>
            </Loading>
            <PaginationComponent pagesCount={numberOfPages} currentPage={currentPage} onPageChange={onPageChange} />
        </div>

    )
}

export default Home
