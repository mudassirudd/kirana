import {useCart} from '../hooks/useCart'

export default function CartPage() {
  const {cart,updateQty,clearCart,removeFromCart} =useCart()

  const total= cart.reduce((sum,item)=>{
    return sum + item.price * item.quantity
  },0)
  
 const totalItems = cart.reduce((sum,item)=>{
    return sum+item.quantity
  },0)
 

if (cart.length === 0)return <p>Your cart is empty.</p> 
  return(
    <>
      <h1>CartPage</h1>
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
              <td><img src={item.image} alt={item.name} width={50} /></td>
              <td>{item.price}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td >
                <div className='counter'>

                <button onClick={()=>updateQty(item._id,item.quantity - 1)}>
                  -
                  </button>
                  <span>{item.quantity}</span>
                <button onClick={()=>updateQty(item._id,item.quantity + 1)}>+</button>
                <button onClick={()=>removeFromCart(item._id)}> 🗑️</button>

                </div>
              </td>
            </tr>
          )

          )}
        </tbody>
      </table>
        <button onClick={clearCart}>Clear cart</button>

          <p>Your Total: <strong>₹{total}</strong></p>
          <p>Total items: <strong>{totalItems}</strong></p>

    </>
  )
}