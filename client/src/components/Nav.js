import React from 'react'
import {useContext} from 'react'
import { Link} from 'react-router-dom'
// localStorage
// import { isAuth } from '../utilities/functions'
//history
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context'

const Nav = () => {

    const [state, setState] = useContext(UserContext)

    const navigate = useNavigate();

    const logout = () => {
        setState({ user: {}, token: ''})
        localStorage.removeItem('auth')
        navigate('/login')
    }

    //console.log('Nav:state', state)
    return (
        <ul className="nav border">
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            {
                state && state.token?(
                <div className="nav-item dropdown">
                    <li className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        {state.user.email}
                    </li>
                    <ul className="dropdown-menu">
                        <li className="nav-item dropdown-item">
                            <Link className="nav" to="/account">アカウント</Link>
                        </li>
                        <li className="nav-item dropdown-item">
                            <span className="nav-link" onClick={logout}>ログアウト</span>
                        </li>
                    </ul>

                </div>)
               :
                <>
                     <li className="nav-item">
                        <Link className="nav-link" to="/register">登録</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">ログイン</Link>
                    </li>
                </>

            }

        </ul>
    )
}

export default Nav

