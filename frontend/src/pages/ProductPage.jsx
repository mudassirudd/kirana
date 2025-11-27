import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProductPage(){

  const {id}= useParams()
  console.log(id)
  
  const [product,setProduct] = React.useState(null)
  const [loading,setLoading] = React.useState(true)
  const [error,setError] = React.useState(null)
  

  React.useEffect(()=>{
    async function fetchProduct(){
       try {
       setLoading(true)
      const res = await fetch(`http://localhost:5000/products/${id}`)
      if (!res.ok) {
        throw new Error("product not found");
        
        
      }
      const data = await res.json()
      setProduct(data)
    } catch (err){
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }
  fetchProduct()

 
  },[id])



  if(loading) return <h2>Loading...</h2>
  if(error) return <h2>{error}</h2>
   
    return(
      <div className="product-page">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <strong>₹{product.price}</strong>
    </div>
  )
}