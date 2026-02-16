import {createContext,useState, type ReactNode} from 'react'
import {useNavigate} from 'react-router-dom'
import { useCart } from '../hooks/useCart';
const API_URL = import.meta.env.VITE_API_BASE_URL; 

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

interface User {
  email: string
  role: 'user' | 'admin'
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<{error: string} | undefined>
  register: (email: string, password: string) => Promise<{error: string} | undefined>
  logout: () => void
  
}



export const AuthContext = createContext<AuthContextType|undefined>(undefined)

export interface AuthProviderComponentProps{
  children:ReactNode
}

export function AuthProviderComponent ({children}:AuthProviderComponentProps){
  
  const {clearCart} = useCart()
  //restore session
 const [user, setUser] = useState(() => {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
});

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const navigate = useNavigate()




  
  // LOGIN
  async function login(email:string,password:string) {

    const res = await fetch (`${API_URL}/auth/login`,{
      method:"POST",
      body:JSON.stringify({email,password}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await res.json()
    
    if (!res.ok) {
      return {error:data.error}
    }
    localStorage.setItem("token",data.token)
    localStorage.setItem("user",JSON.stringify(data.user))
    setToken(data.token)
    setUser(data.user)
    navigate("/")

  }

  // REGISTER
  async function register (email:string,password:string) {
    const res = await fetch(`${API_URL}/auth/register`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password}),
    })

    const data = await res.json()
    if (!res.ok) {
      return {error:data.error}
    }
    return login(email,password)

  }
  //LOGOUT 
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    clearCart()

    setToken(null)
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{user,token,login,register,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

