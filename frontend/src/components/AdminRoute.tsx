import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import type { ReactNode } from "react"

export  interface AdminRouteProps{
  children:ReactNode
}
export default function AdminRoute({children}:AdminRouteProps) {

  const {token,user} = useAuth()

    if (!token) {
      return <Navigate to='/auth/login' />
    }
    if (user?.role !== "admin") {
      return <Navigate to='/' />
    }


  return children
}