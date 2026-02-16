import {  createContext, useEffect,  useReducer} from "react";
import type{ReactNode} from 'react'
import type { Product } from "../components/ProductCard";


export interface CartItem extends Product{
  quantity:number
}

export type CartAction = 
  {type:'ADD' ; payload:Product}
| {type:'REMOVE'; payload:string}
| {type:'UPDATE_QTY', payload:{id:string; quantity:number}}
| {type:"CLEAR"}


export interface CartContextType{
  cart:CartItem[],
  addToCart:(product:Product)=>void,
  removeFromCart:(id:string)=>void,
  updateQty:(id:string,quantity:number)=>void,
  clearCart:()=>void
}

export const CartContext = createContext<CartContextType|undefined>(undefined)

function cartReducer(state:CartItem[],action:CartAction) {
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
export interface CartContextProviderProps{
  children:ReactNode
}

export  function CartContextProvider ({children}:CartContextProviderProps) {
  const [cart,dispatch] = useReducer(cartReducer,[],()=>{
    const saved = localStorage.getItem("cart")
    return saved? JSON.parse(saved):[]
  })

  //
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])

  function addToCart(product:Product) {
    dispatch({type:"ADD",payload:product})
 
  }

  function removeFromCart(id:string) {
    dispatch({type:"REMOVE",payload:id})  }

  function updateQty(id:string,quantity:number) {
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

