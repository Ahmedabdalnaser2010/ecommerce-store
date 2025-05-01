import { useState } from 'react'
import SearchingInput from './SearchingInput'
import SearchResults from './SearchResults'

const SearchingArea = () => {

    const [searchingInput, setSearchingInput] = useState("")

    return (
        <div className='flex flex-col md:order-2 absolute left-[50%] translate-x-[-50%] md:relative md:left-0 md:translate-x-[0] '>
            <SearchingInput input={searchingInput} setInput={setSearchingInput} />
            <SearchResults input={searchingInput} setInput={setSearchingInput} />
        </div>
    )
}

export default SearchingArea
