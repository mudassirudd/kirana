import React from 'react'
import ProductCard from '../components/ProductCard'
import {Link} from 'react-router-dom'

export default function Home(){
    const [products,setProducts] = React.useState([])

      React.useEffect(()=>{
        async function fetchProducts() {
          const res = await fetch('http://localhost:5000/products')
          const data = await res.json()
          setProducts( data.products )
        }

        fetchProducts()
      },[])

      
      const productList = products.map(product=>(
       <Link  to = {`/products/${product._id}`}
              key={product._id}> 
           <ProductCard  product={product}/>
       </Link>
       
      ))
      console.log(products)

  return(
    <>
      {productList}
    </>
  )
}