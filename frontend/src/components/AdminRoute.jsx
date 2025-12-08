import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function AdminRoute({children}) {

  const {token,user} = useAuth()

    if (!token) {
      return <Navigate to='/auth/login' />
    }
    if (user?.role !== "admin") {
      return <Navigate to='/' />
    }


  return children
}