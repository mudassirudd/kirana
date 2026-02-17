import React from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import type { Product } from '../components/ProductCard';
const API_URL = import.meta.env.VITE_API_BASE_URL;


export default function ProductPage(){
  const {addToCart} = useCart()
  const {id}= useParams()
  // console.log(id)
  
  const [product,setProduct] = React.useState<Product>()
  const [loading,setLoading] = React.useState(true)
  const [error,setError] = React.useState<string|null>(null)
  

  React.useEffect(()=>{
    async function fetchProduct(){
       try {
       setLoading(true)
      const res = await fetch(`${API_URL}/products/${id}`)
      if (!res.ok) {
        throw new Error("product not found");
        
        
      }
      const data = await res.json()
      setProduct(data.product)
    } catch (err){
      if(err instanceof Error){

        setError(err.message)
      }
    }finally{
      setLoading(false)
    }
  }
  fetchProduct()

 
  },[id])



  if(loading) return <h2>Loading...</h2>
  if(error) return <h2>{error}</h2>
  if (!product) return null
   
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