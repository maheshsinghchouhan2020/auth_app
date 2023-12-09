import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOutUser } from '../features/auth/authSlice'

const Navbar = () => {

    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch(logOutUser())
        navigate("/login")
    }

    return (
        <nav className="navbar bg-dark">
            <div className="container-fluid">
                <Link to={"/"}><span className="navbar-brand mb-0 h1 text-light">Auth App Redux</span></Link>
                <span className="navbar-brand mb-0 ">
                    {
                        !user ? (
                            <>
                                <Link to={"/login"} className="btn btn-warning">LOGIN</Link>
                                <Link to={"/register"} className="btn btn-warning mx-2">REGISTER</Link>
                            </>
                        ) : (<button className="btn btn-danger mx-2" onClick={handleLogOut}>LOGOUT</button>)
                    }
                </span>
            </div>
        </nav>
    )
}

export default Navbar