import React from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { Navigate ,Outlet} from 'react-router-dom'
const Privste = () => {
 
   
    const {currentUser} = useSelector(state => state.user)
    return currentUser ? <Outlet/> : <Navigate to='/signin'/>
  
}

export default Privste