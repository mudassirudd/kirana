import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {useAuth} from '../hooks/useAuth.js'

export default function OrdersPage() {
  const {token } = useAuth()
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(null)
  const [order,setOrder] = useState({})

  const {id} = useParams()

  useEffect(()=>{
    async function fetchOrder() {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:5000/order/${id}`,{
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


  return(
<>
    <h3>BY: {order?.userId?.email}</h3>
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
      <strong>Total: ${order.total}</strong>  
</>
  )
  
}