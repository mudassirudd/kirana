import React from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

export default function ProductPage(){
  const {addToCart} = useCart()
  const {id}= useParams()
  // console.log(id)
  
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
      setProduct(data.product)
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
     <div className =" mt-10">
       <div className="w-80 mx-auto bg-gray-200  flex flex-col items-center justify-end text-center rounded-3xl pb-2">
        <img className='rounded-t-3xl  w-full h-full  object-cover"' src={product.image} alt={product.name} />
        <h2 className='text-3xl font-medium  m-2'>{product.name}</h2>
        <p className='text-sm m-2 text-gray-600'>{product.description}</p>
        <strong className='m-2'>₹{product.price}</strong>
        <button className='btn' onClick={()=>addToCart(product)}>Add to Cart</button>
      </div>
     </div>
  )
}