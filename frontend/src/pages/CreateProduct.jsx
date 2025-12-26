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
 <div className='flex flex-col items-center justify-center gap-7'>   
  <h1 className="font-bold text-2xl sm:text-3xl">Make a Product</h1>
    <form className="registration-form " action={handleCreate}>
    <label htmlFor="">Name
    </label>
      <input type="text" name="name"/>

    <label htmlFor="">Category
    </label>
      <input type="text" name="category"/>

    <label htmlFor="">Description
    </label>
      <input type="text" name="description"/>

    <label htmlFor="">Price
    </label>
      <input min="0"  type="number" name="price"/>


    <label htmlFor="">Image
    </label>
      <input type="url" name="image"/>

    <button className="btn" type="submit">Create</button>
{error && <p style={{color: "red"}}>{error}</p>}
{success && <p style={{color: "green"}}>{success}</p>}
</form>

    </div>
  )
}