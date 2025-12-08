import { useState } from "react"
import {useAuth} from "../hooks/useAuth"

export default function CreateProduct() {
  const [error,setError]=useState(null)
  const [success,setSuccess]=useState(null)

  const {token} = useAuth()
  
  async function handleCreate(formData) {

    const name = formData.get("name")
    const  category= formData.get("category")
    const  description= formData.get("description")
    const  price= formData.get("price")
    const  image= formData.get("image")
    
    const res = await fetch("http://localhost:5000/products",{
      method:"POST",
      body:JSON.stringify({name,category,description,price,image}),
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
      }
    })

      const data  = await res.json()

    if(!res.ok){
      setError(data.error)
      return
    }

      setSuccess("Product Created Successfully")

    
  }
  return(
    <>
    <h1>Make a Product</h1>
    <form action={handleCreate}>
    <label htmlFor="">Name: 
      <input type="text" name="name"/>
    </label>

    <label htmlFor="">Category: 
      <input type="text" name="category"/>
    </label>

    <label htmlFor="">Description: 
      <input type="text" name="description"/>
    </label>

    <label htmlFor="">Price: 
      <input min="0"  type="number" name="price"/>
    </label>


    <label htmlFor="">Image: 
      <input type="url" name="image"/>
    </label>

    <button type="submit">Create</button>
{error && <p style={{color: "red"}}>{error}</p>}
{success && <p style={{color: "green"}}>{success}</p>}
</form>

    </>
  )
}