import { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'

export default function EditProductPage () {

  const navigate = useNavigate()
  const {id} = useParams()
  const [loading,setLoading] = useState(true)
  const {token} = useAuth()

  const [name,setName]=useState("")
  const [category,setCategory]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [image,setImage]=useState("")

 useEffect(()=>{
  async function fetchProduct() {
try {
  const res = await fetch(`http://localhost:5000/products/${id}`)

  const data = await res.json()

  setName(data.product.name)
  setCategory(data.product.category)
  setDescription(data.product.description)
  setPrice(data.product.price)
  setImage(data.product.image)




} catch (error) {
  console.log(error)
}finally{
  setLoading(false)
}  


}
fetchProduct()
 },[id])



 async function handleUpdate(e) {
  e.preventDefault()
  const updatedObject ={
    name, 
    category,
    description,
    price,
    image,
  }

    const res = await fetch(`http://localhost:5000/products/${id}`,{
      method:"PUT",
      body:JSON.stringify(updatedObject),
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }
    })
     const data = await res.json()

    if (!res.ok) {
      console.log(data.error)
      return 
    }

      navigate("/admin/products")






 }
if (loading) return <p>Loading...</p>

  return(
 <div className='flex flex-col items-center justify-center gap-7'>
      <h1 className='font-bold text-lg sm:text2xl'>Edit Product <small>{id}</small></h1>
      <form className='registration-form' onSubmit={handleUpdate}>
        <label>Name
        </label>
          <input type="text"  value={name} onChange={(e)=>setName(e.target.value)} />

        <label>Category
        </label>
          <input type="text"  value={category} onChange={(e)=>setCategory(e.target.value)} />

        <label>Description
        </label>
          <input type="text"  value={description} onChange={(e)=>setDescription(e.target.value)} />
      
        <label>Price
        </label>
          <input type="number"  value={price} onChange={(e)=>setPrice(e.target.value)} />
        
        <label>Image
        </label>
          <input type="url"  value={image} onChange={(e)=>setImage(e.target.value)} />
      <button className='btn' type='submit'>Update</button>
      </form>
    </div>
  )
}