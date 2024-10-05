import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const {currentuser}=useSelector(state=>state.user)
  return (
    <div>
        {
            currentuser?(<Outlet/>):(<Navigate to='/signin'/>)
        }
    </div>
  )
}

export default PrivateRoutes