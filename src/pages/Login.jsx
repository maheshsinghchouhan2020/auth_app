import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

const Login = () => {

    const { user, isSuccess, isError, isLoading, message } = useSelector(state => state.auth)

    const dispatch = useDispatch ()
    const navigate = useNavigate ()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData

    const handleChange = (e) => {
        setFormData({
            ...formData,
            // niche wali line ka puchna h
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch (loginUser (formData))
    }

    useEffect(() => {

        if (user) {
            navigate("/")
        }

        if (isError && message){
            toast.error (message)
            dispatch (reset())
        }

    }, [isSuccess, isError, isLoading, message, user])

    if (isLoading) {
        return (
            <div className="container p-5">
                <h1 className="display-1 text-center">
                    Loading...
                </h1>
            </div>
        )
    }

    return (
        <div className='container p-5'>
            <h1 className='text-center'>Login Here!</h1>
            <form className="my-3" onSubmit={handleSubmit}>
                <input type="email" placeholder='Enter Email Here...' className="form-control my-2" name='email' value={email} onChange={handleChange} />
                <input type="password" placeholder='Enter Password Here...' className="form-control my-2" name='password' value={password} onChange={handleChange} />
                <button className="btn btn-success w-100">Login</button>
            </form>
        </div>
    )
}

export default Login