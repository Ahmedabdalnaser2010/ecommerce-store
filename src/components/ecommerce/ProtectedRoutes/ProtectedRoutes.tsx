

import { Navigate } from 'react-router-dom'
import { useAppSelector } from 'src/store/hooks'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {

    const { accessToken } = useAppSelector(state => state.auth)

    // useEffect(() => {
    //     if (!accessToken) {
    //         toast.error("You must be logged in ...");
    //     }
    // }, [accessToken]);


    if (!accessToken) {

        return (
            <Navigate to={"/login"} />
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoutes
