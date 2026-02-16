// import { Children } from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from '../hooks/useAuth.js'
import type { ReactNode } from "react";

export interface ProtectedRouteProp{
  children:ReactNode
}
export default function ProtectedRoute ({children}:ProtectedRouteProp){

  const {token} =  useAuth()

  if (!token) {
    
    return <Navigate  to='/auth/login'/>
  }else{
    return children
  }
}