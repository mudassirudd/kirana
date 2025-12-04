import React from 'react'

export default function LoginPage() {
  const [error,setError]= React.useState()
  const [success,setSuccess]= React.useState()
  
  async function login(formData) {
    setError(null)
    setSuccess(null)
    const email=formData.get("email")
    const password = formData.get("password")

    


  }
  return(
    
   <div className="registration-form">
    <h2>Login</h2>
  <form action={login} > 
  <label htmlFor="email">Email:
  <input type="email" name="email" id='email' required/>

  </label>
  <label htmlFor="password">Password:

  <input type="password" name="password" id='password' required/>
  </label>
  <button type="submit">Login</button>
  
 {error && <p style={{ color: "red" }}>{error}</p>}
{success && <p style={{ color: "green" }}>{success}</p>}


  </form>
  </div>

  
  )
}