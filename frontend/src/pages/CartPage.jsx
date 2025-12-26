import {useCart} from '../hooks/useCart'
import {useAuth} from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



export default function CartPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const {token} = useAuth()
  const {cart,updateQty,clearCart,removeFromCart} =useCart()
  const navigate = useNavigate()

  const total= cart.reduce((sum,item)=>{
    return sum + item.price * item.quantity
  },0)
  
 const totalItems = cart.reduce((sum,item)=>{
    return sum+item.quantity
  },0)
  

  async function order() {
   try {
    setLoading(true)
    //make itms
    const items = cart.map(item=>{
    return {
      productId:item._id,
      quantity:item.quantity
    }
  })
     const res = await fetch("http://localhost:5000/order",{
      method:"POST",
      body:JSON.stringify({items}),
      headers:{
        "Content-Type":"application/json",
         Authorization:`Bearer ${token}`
      }
    })

    const data = await res.json()
    if (res.ok) {
      clearCart()
      navigate("/order/orders")
    }
    if (!res.ok) {
      setError(data.error)
      return
    }
    
   }   finally{
          setLoading(false)

      }

  }
 

if (cart.length === 0)return <p>Your cart is empty.</p> 
  return(
    <div className='flex flex-col items-center justify-center gap-7'>
      <h1 className='text-center font-bold text-2xl sm:text-3xl' text>CartPage</h1>
      <table>
        <thead>
      <tr>
          <th>Image</th>
          <th>Price</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Actions</th>
      </tr>
        </thead>
        <tbody>
          {cart.map(item=>(
            <tr key={item._id}>
              <td><img className='w-15 align ' src={item.image} alt={item.name}  /></td>
              <td>{item.price}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td >
                <div className='counter'>

                <button className=' mx-1.5  text-xl cursor-pointer ' onClick={()=>updateQty(item._id,item.quantity - 1)}>
                  -
                  </button>
                  <span className='border border-black bg-white p-[1px]'>{item.quantity}</span>
                <button className='mx-1.5  text-xl cursor-pointer ' onClick={()=>updateQty(item._id,item.quantity + 1)}>+</button>
                <button className='cursor-pointer' onClick={()=>removeFromCart(item._id)}> 🗑️</button>

                </div>
              </td>
            </tr>
          )

          )}
        </tbody>
      </table>
        <button className='btn' onClick={clearCart}>Clear cart</button>

          <p>Your Total: <strong>₹{total}</strong></p>
          <p>Total items: <strong>{totalItems}</strong></p>
          <button className='btn' onClick={order}>Order</button>
            {loading && <p>Loading...</p>}

              {error && <p style={{color:"red"}}>{error}</p>}


    </div>
  )
}