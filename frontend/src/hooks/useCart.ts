import { CartContext } from '../context/CartContext'
import { useContext } from 'react'

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within CartContextProvider')
  }
  return context
} // now TS knows it's CartContextType, never undefined}
