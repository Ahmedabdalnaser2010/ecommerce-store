
import { Pagination } from "flowbite-react";



const PaginationComponent = ({ pagesCount, currentPage, onPageChange }: { pagesCount: number, currentPage: number, onPageChange: (page: number) => void }) => {

    const handlePaginationClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })

    }

    return (
        <div onClick={handlePaginationClick} className="  flex justify-center bg-white border-gray-200  bottom-[-10px] dark:bg-gray-800 dark:border-gray-600 relative left-0 z-50 ">
            <Pagination currentPage={currentPage} totalPages={pagesCount} onPageChange={onPageChange} />
        </div>
    );
}


export default PaginationComponent