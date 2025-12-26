import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import AdminProductsTable from "../components/AdminProductsTable"
import {useAuth} from '../hooks/useAuth'
export default function AdminProductsPage() {

  const [products,setProducts]=useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const {token} = useAuth()


  
  useEffect(()=>{
    async function fetchProducts(){
      try {
        const res = await fetch("http://localhost:5000/products",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await res.json()
      setProducts(data.products)
      } catch  {
        setError("Failed to fetch")
      }finally{
          setLoading(false)

      }
    }
    fetchProducts()
  },[])

  async function handleDelete(id) {
    const ok = window.confirm("Delete this product? This cannot be undone.")
    if (!ok) return
   
      const res = await fetch(`http://localhost:5000/products/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      })

      const data = await res.json()
      if (!res.ok) {
        return setError(data.error)
      }

      setProducts(prev=> prev.filter(p=>p._id !== id))
   
  }
  
 
  
  return(
    <div className='flex flex-col items-center justify-center gap-7'>     
     <h1 className="font-bold text-2xl sm:text-3xl">Admin Product List</h1>
  {loading && <p>Loading...</p>}


     {(products.length === 0)? 
      <p>No products found</p>
      :
      <AdminProductsTable
      products={products}
      handleDelete={handleDelete}
      />
    }
    {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  )
} 