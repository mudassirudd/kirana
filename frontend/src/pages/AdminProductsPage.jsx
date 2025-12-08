import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import AdminProductsTable from "../components/AdminProductsTable"

export default function AdminProductsPage() {
  const [products,setProducts]=useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  
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

  
  return(
    <>
      <h1>Admin Product List</h1>
  {loading && <p>Loading...</p>}
  {error && <p>{error}</p>
 }


     {(products.length === 0)? 
      <p>No products found</p>
     :
     <AdminProductsTable products={products}/>
      }
    </>
  )
} 