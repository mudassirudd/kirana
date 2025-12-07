// import { Children } from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from '../hooks/useAuth.js'

export default function ProtectedRoute ({children}){

  const {token} =  useAuth()

  if (!token) {
    
    return <Navigate  to='/auth/login'/>
  }else{
    return children
  }
}