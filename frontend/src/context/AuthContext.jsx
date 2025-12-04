import {createContext,useState} from 'react'
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext()

export function AuthProviderComponent ({children}){
  //restore session
 const [user, setUser] = useState(() => {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
});

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const navigate = useNavigate()




  
  // LOGIN
  async function login(email,password) {
    const res = await fetch ("http://localhost:5000/auth/login",{
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
  async function register (email,password) {
    const res = await fetch("http://localhost:5000/auth/register",{
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

  return(
    <AuthContext.Provider value={{user,token,login,register}}>
      {children}
    </AuthContext.Provider>
  )
}

