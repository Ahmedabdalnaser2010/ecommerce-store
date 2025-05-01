import { RxCross1 } from "react-icons/rx";




const SearchingInput = ({ input, setInput }: { input: string, setInput: (e: string) => void }) => {







    return (
        <>


            <form className=" mx-auto lg:w-[500px] sm:w-[300px] w-[160px]">
                <label
                    htmlFor="search"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >


                    <div className="flex">
                        <span className="cursor-pointer inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg className="h-[1.25em] opacity-50 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"

                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                        </span>
                        <div className="flex items-center  mx-auto lg:w-[500px] sm:w-[300px] w-[160px]">
                            <input
                                type="text"
                                id="search"
                                className="rounded-none rounded-e-lg bg-white border border-gray-300 text-gray-900 focus:ring-blue-200 focus:border-blue-200 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
                                placeholder="Search"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}


                            />
                            <RxCross1 className="absolute right-4 cursor-pointer " onClick={() => setInput("")} />
                        </div>
                    </div>
                </label>
            </form>



        </>
    )
}

export default SearchingInput
