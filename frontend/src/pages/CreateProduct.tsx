import { useState } from "react"
import {useAuth} from "../hooks/useAuth"
const API_URL = import.meta.env.VITE_API_BASE_URL;


export default function CreateProduct() {
  const [error,setError]=useState<string|null>(null)
  const [success,setSuccess]=useState<string|null>(null)

  const {token} = useAuth()
  
  async function handleCreate(formData:FormData) {

    const name = formData.get("name") as string
    const  category= formData.get("category") as string
    const  description= formData.get("description") as string
    const  price= formData.get("price") as string
    const  image= formData.get("image") as string
    
    const res = await fetch(`${API_URL}/products`,{
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