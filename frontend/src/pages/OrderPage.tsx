import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {useAuth} from '../hooks/useAuth'
import type { Order, OrderItem } from "./OrdersPage";
const API_URL = import.meta.env.VITE_API_BASE_URL;


export default function OrdersPage() {
  const {token } = useAuth()
  const [error,setError] = useState<string|null>(null)
  const [loading,setLoading] = useState<boolean>(false)
  const [order,setOrder] = useState<Order|null>(null)

  const {id} = useParams()

  useEffect(()=>{
    async function fetchOrder() {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/order/${id}`,{
          method:"GET",
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        const data =await  res.json()
        if (!res.ok) {
          setError(data.error)
          throw new Error("order not found");
        }
        setOrder(data.order)
      } finally{
        setLoading(false)
      }
    }
    fetchOrder()
  },[id,token])


  async function handleStatus (e:React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value 
    const res = await fetch(`${API_URL}/order/${id}`,{
      method:"PATCH",
      body:JSON.stringify({status}),
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      }
    })

    const data = await res.json()
    if (!res.ok) {
      return setError(data.error)
    }
    setOrder(prev=>(prev ? {...prev, status: data.status}:prev))

  }

// {
//   "order": {
//     "_id": "69428d12e43d7382e36b1b24",
//     "userId": "69319fe72ae22aea9fbaf840",
//     "items": [
//       {
//         "productId": "69256eb09a6e875374999abb",
//         "name": "Men's Casual T-shirt",
//         "price": 350,
//         "quantity": 3
//       }
//     ],
//     "total": 1050,
//     "createdAt": "2025-12-17T10:59:30.253Z",
//     "updatedAt": "2025-12-17T10:59:30.253Z",
//     "__v": 0
//   }
// }

  
if(loading) return <h2>Loading...</h2>
if(error) return <h2>{error}</h2>
if(!order) return null


  return(
<div className='flex flex-col items-center justify-center gap-7 text-center'>    <h3>BY: {typeof order.userId === 'object' ? order.userId.email : order.userId}
</h3>
      <table>
        <thead>
          <tr>
            <th>NO.</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
           </tr>
        </thead>
        <tbody>
          {order?.items?.map((item, itemIndex) => (
            <tr key={item._id || itemIndex}> 
              <td>{itemIndex + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
       <div>
          <span>Status:</span>
          <p className="font-bold ">{order.status}</p>
          <select className="bg-gray-200 p-1 rounded-t-sm"
            onChange={handleStatus}
            value={order.status}
          >
            <option value="processing">Processing</option>
            <option value='delivered'>Delivered</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        <hr/>
        </div>
      <strong>Total: ${order?.total}</strong>  
</div>
  )
  
}