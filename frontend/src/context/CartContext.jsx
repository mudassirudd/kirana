import {  createContext, useEffect, useState } from "react";
// import {useAuth} from '../hooks/useAuth'


export const CartContext = createContext()

export  function CartContextProvider ({children}) {
  const [cart,setCart] = useState(()=>{
    const saved = localStorage.getItem("cart")
    return saved? JSON.parse(saved):[]
  })
  // const {token} = useAuth()


// useEffect(() => {
//   if (!token) {
//     localStorage.removeItem("cart")
//   }
// }, [token])


  useEffect(()=>{

    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])

  function addToCart(product) {
    const exists = cart.find(item=>item._id === product._id)

    if (exists) {
      setCart(prev=>
        prev.map(item=>
          item._id===product._id?
        {...item,quantity:item.quantity+1}:item
      ))
    }else{
      setCart(prev=>[...prev,{...product,quantity:1}])
    }
  }

  function removeFromCart(id) {
    setCart(prev=>prev.filter(item=>item._id !== id))
  }

  function updateQty(id,qty) {
    if (qty === 0 ) {
      removeFromCart(id)
      return
    }
    setCart(prev=>prev.map(item=>item._id === id 
      ? {...item,quantity:qty}: item
    ))
  }

  function clearCart() {
    setCart([])
    localStorage.removeItem("cart")

    
  }








    return (
      <CartContext.Provider value={{cart,addToCart,removeFromCart,updateQty,clearCart }}>
        {children}
      </CartContext.Provider>
    )     

}

