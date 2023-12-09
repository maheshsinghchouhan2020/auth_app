import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {

  const {user} = useSelector ((state) => state.auth)

  const navigate = useNavigate ()

  useEffect (() => {
    if (!user){
      navigate("/login")
      toast.error ("Unauthorized access")
    }
  }, [user])

  return (
    <div className='container p-5'>
        <h1 className='text-center'>Welcome to the Home Page</h1>
    </div>
  )
}

export default Home