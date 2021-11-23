import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserContext} from '../../context'

const AuthRoutes = ({...rest}) => {
    const [state] = useContext(UserContext)

    //console.log('authRoute', state)

    if(!state) {
        return(
            <Navigate to="/login"/>
        )
    }
    return state && state.token ?<Outlet {...rest}/>: '';

}

export default AuthRoutes
