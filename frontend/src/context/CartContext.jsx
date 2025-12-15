import {  createContext, useEffect,  useReducer} from "react";


export const CartContext = createContext()

function cartReducer(state,action) {
  switch (action.type) {
    case "ADD":
      const exists = state.find(item=>item._id === action.payload._id)
        if (exists) {
          return state.map(item=>item._id ===action.payload._id
            ? {...item,quantity:item.quantity + 1}: item)
        }else{
         return  [...state,{...action.payload,quantity:1}]
        }

    case "REMOVE":
             return state.filter(item=>item._id !== action.payload)
             
             
    case "UPDATE_QTY":
      if (action.payload.quantity === 0 ) {
        return state.filter(item=>item._id !== action.payload.id)  
      }else{
        return state.map(item=>item._id === action.payload.id
          ? {...item,quantity:action.payload.quantity }: item
         )
      }


    case "CLEAR":
      return []
    
    default:
      return state
  }
}

export  function CartContextProvider ({children}) {
  const [cart,dispatch] = useReducer(cartReducer,[],()=>{
    const saved = localStorage.getItem("cart")
    return saved? JSON.parse(saved):[]
  })


 
  


  useEffect(()=>{

    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])

  function addToCart(product) {
dispatch({type:"ADD",payload:product})
 
  }

  function removeFromCart(id) {
    dispatch({type:"REMOVE",payload:id})  }

  function updateQty(id,quantity) {
 
   dispatch({type:"UPDATE_QTY",payload:{id,quantity}})
  }

  function clearCart() {
   dispatch({type:"CLEAR"})

    
  }








    return (
      <CartContext.Provider value={{cart,addToCart,removeFromCart,updateQty,clearCart }}>
        {children}
      </CartContext.Provider>
    )     

}

