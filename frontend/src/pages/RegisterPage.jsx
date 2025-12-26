import React from "react"
import {useAuth} from '../hooks/useAuth'


export default function RegisterPage() {
  const [error,setError] = React.useState(null)
  const {register} = useAuth()




  async function handleRegister(formData) {
     setError(null)

    const email = formData.get("email")
    const password = formData.get("password")
    const result = await register(email,password)
    if (result.error){
      setError(result.error)
    }
  }
 return(
  
   <div className=" mt-15 flex flex-col items-center justify-center">
    <h2 className="text-center font-bold text-2xl sm:text-3xl">Register</h2>
  <form className="registration-form" action={handleRegister} > 
  <label htmlFor="email">Email

  </label>
  <input type="email" name="email"  id="email" required/>
  <label htmlFor="password">Password

  </label>
  <input type="password" name="password" id="passsword"  required/>
  <button className="btn" type="submit">Register</button>
  
 {error && <p style={{ color: "red" }}>{error}</p>}


  </form>
  </div>

  
 ) 
}