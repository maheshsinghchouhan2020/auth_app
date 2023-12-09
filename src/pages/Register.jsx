import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { registerUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const {user, isSuccess, isError, isLoading, message} = useSelector (state => state.auth)

    const dispatch = useDispatch ()
    const navigate = useNavigate ()

    const [formData, setFormData] = useState ({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const {name, email, password, password2} = formData

    const handleChange = (e) => {
        setFormData ({
            ...formData,
            // niche wali line ka puchna h
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(password !== password2){
            toast.error ("Passwords not matched !!")
        }

        dispatch (registerUser (formData))
    }

    useEffect (() => {
        if(user || isSuccess){
            navigate ("/")
        }

        if(isError && message){
            toast.error (message)
        }
    }, [user, isSuccess, isError, isLoading, message])

    if(isLoading){
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
            <h1 className='text-center'>Register Here!</h1>
            <form className="my-3" onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Name Here...' className="form-control my-2" name='name' value={name} onChange={handleChange}/>
                <input type="email" placeholder='Enter Email Here...' className="form-control my-2" name='email' value={email} onChange={handleChange}/>
                <input type="password" placeholder='Enter Password Here...' className="form-control my-2" name='password' value={password} onChange={handleChange}/>
                <input type="password" placeholder='Enter Confirm Password Here...' className="form-control my-2" name='password2' value={password2} onChange={handleChange}/>
                <button className="btn btn-success w-100">Register</button>
            </form>
        </div>
    )
}

export default Register