import React from 'react'
import {useAuth} from '../context/AuthContext'

export default function LoginPage() {
  const [error,setError]= React.useState()
  const {login} = useAuth()
  
  async function handleLogin(formData) {
    setError(null)
    const email=formData.get("email")
    const password = formData.get("password")

    const result = await login(email,password)


    if (result.error) {
      return setError(result.error)
    }


  }
  return(
    
   <div className="registration-form">
    <h2>Login</h2>
  <form action={handleLogin} > 
  <label htmlFor="email">Email:
  <input type="email" name="email" id='email' required/>

  </label>
  <label htmlFor="password">Password:

  <input type="password" name="password" id='password' required/>
  </label>
  <button type="submit">Login</button>
  
 {error && <p style={{ color: "red" }}>{error}</p>}


  </form>
  </div>

  
  )
}