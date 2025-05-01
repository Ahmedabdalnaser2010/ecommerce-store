import { TCategories } from '@customtypes/Categories.types'
import { Link } from 'react-router'
// import logoImg from "../../../../public/15d547ef4677eb4bcc5f1b7e8d8a451e7c2446254af55f4bd50fb203b4771ad4 (1).jpeg"



const CategoryCard = ({ category, image }: TCategories) => {


    return (
        <Link to={`/categories/${category}`}>
            <div className="bg-white border border-gray-200 p-2 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 max-w-330px max-w-sm overflow-hidden">
                <div className='flex justify-center w-full'>
                    <img className="rounded-t-lg w-[330px] h-[170px] duration-[0.5s] hover:rotate-[1.5deg] hover:scale-[1.12] object-contain" src={image} alt={category} />
                </div>
                <div className="pb-2 px-5">
                    <div >
                        <h5 className="p-2 text-2xl text-center text-blue-400 capitalize dark:text-white font-bold mb-4 tracking-tight">
                            {category}
                        </h5>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default CategoryCard
