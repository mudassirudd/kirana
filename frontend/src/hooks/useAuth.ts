import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useCart must be used within CartContextProvider')
  }
  return context
} // now TS knows it's AuthContextType, never undefined}
