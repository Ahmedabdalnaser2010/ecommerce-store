import { TLoading } from '@customtypes/TLoading.types'
import React from 'react'


interface ILoading {
    loading: TLoading
    error: string | null
    children: React.ReactNode
}





const Loading = ({ loading, error, children }: ILoading) => {

    if (loading === "pending") {
        return (
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-2xl'>
                Please Wait for Loading    <span className="loading loading-spinner loading-xl"></span>
            </div>)
    }
    if (loading === "failed") {
        return <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-2xl'>Error:{error}</div>
    }
    return <>{children}</>
}

export default Loading

