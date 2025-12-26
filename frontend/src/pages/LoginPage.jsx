import React from 'react'
import {useAuth} from '../hooks/useAuth'

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
    
   <div className="  mt-15 flex flex-col items-center justify-center">
    <h2 className='text-center font-bold text-2xl sm:text-3xl'>Login</h2>
  <form  className="registration-form" action={handleLogin} > 
    <label htmlFor="email">Email

    </label>
    <input type="email" name="email" id='email' required/>
    <label htmlFor="password">Password

    </label>
    <input type="password" name="password" id='password' required/>
    <button className='btn' type="submit">Login</button>
    
  {error && <p style={{ color: "red" }}>{error}</p>}


  </form>
  </div>

  
  )
}