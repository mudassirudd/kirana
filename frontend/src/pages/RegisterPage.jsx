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
  
   <div className="registration-form">
    <h2>Register with us</h2>
  <form action={handleRegister} > 
  <label htmlFor="email">Email:
  <input type="email" name="email"  id="email" required/>

  </label>
  <label htmlFor="password">Password:

  <input type="password" name="password" id="passsword"  required/>
  </label>
  <button type="submit">Register</button>
  
 {error && <p style={{ color: "red" }}>{error}</p>}


  </form>
  </div>

  
 ) 
}