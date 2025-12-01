
import React from "react"
import {useNavigate} from 'react-router-dom'



export default function RegisterPage() {
  const [error,setError] = React.useState(null)
  const [success,setSuccess] = React.useState(null)
    const navigate = useNavigate()




  async function register(formData) {
     setSuccess(null)
     setError(null)

    const email = formData.get("email")
    const password = formData.get("password")
    console.log("Form submitted")

    const res = await fetch("http://localhost:5000/auth/register",{
      method:"POST",
      body:JSON.stringify({email,password}),
      headers:{
        "Content-Type":"application/json"
      }

    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      return
    }
    console.log("rssesponse:",data)
    setSuccess("Registration Successful")
    navigate("/")
  }
 return(
  
   <div className="registration-form">
    <h2>Register with us</h2>
  <form action={register} > 
  <label htmlFor="email">Email:
  <input type="email" name="email"  id="email" required/>

  </label>
  <label htmlFor="password">Password:

  <input type="password" name="password" id="passsword"  required/>
  </label>
  <button type="submit">Register</button>
  
 {error && <p style={{ color: "red" }}>{error}</p>}
{success && <p style={{ color: "green" }}>{success}</p>}


  </form>
  </div>

  
 ) 
}