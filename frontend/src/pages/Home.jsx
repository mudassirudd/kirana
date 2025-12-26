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
       <Link className='w-fit mx-auto h-full ' to = {`/products/${product._id}`}
              key={product._id}> 
           <ProductCard  product={product}/>
       </Link>
       
      ))
      // console.log(products)

  return(
    <>
    <h1 className='text-center p-15  text-6xl sm:text-8xl font-bold'>New Arrivals</h1>
    <section className='bg-linear-to-br from-slate-200 to-gray-200'>
      <section className='  mx-auto w-[70%]  p-6 text-center grid grid-cols-1   sm:grid-cols-2  gap-6 ' >
        {productList}
      </section >
    </section>
    </>
  )
}