import { useEffect,useState } from "react"
import {useAuth} from '../hooks/useAuth'

export default function OrdersPage() {
  const {token} = useAuth() 

  const [orders,setOrders] = useState([])

  useEffect(()=>{
    async function fetchOrders() {
      const res = await fetch("http://localhost:5000/order/orders",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      })
      const data = await res.json()
        setOrders(data.orders)

    }
    fetchOrders()

  },[token])    
  //   {
  // "orders": [
  //   {
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
  //   },
  // -------
  //   {
  //     "_id": "69428d28e43d7382e36b1b2f",
  //     "userId": "69319fe72ae22aea9fbaf840",

  //     "items": [
  //       {
  //         "productId": "69256eb09a6e875374999abc",
  //         "name": "Luxury bag",
  //         "price": 2500,
  //         "quantity": 1
  //       }, ------
  //       {
  //         "productId": "69256eb09a6e875374999abe",
  //         "name": "Remote Control Toy car",
  //         "price": 1200,
  //         "quantity": 1
  //       }
  //     ],

  //     "total": 3700,
  //     "createdAt": "2025-12-17T10:59:52.858Z",
  //     "updatedAt": "2025-12-17T10:59:52.858Z",
  //     "__v": 0
  //   }]
  return(
<div className='flex flex-col items-center text-center  gap-7'>        <h1 className="text-center font-bold text-2xl sm:text-3xl">Your Orders</h1>
      {orders.map((order, orderIndex) => (
    <div className="flex flex-col items-center" key={order._id} style={{ marginBottom: '2rem' }}>
      <h3>Order #{orderIndex + 1}</h3>
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
          {order.items.map((item, itemIndex) => (
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
      <hr />
    </div>
))}
    </div>
  )
}
