
import './App.css'
import {Routes,Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import {useAuth} from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'



export default function App() {
  const {user,logout,token} = useAuth()
  
  return (
    <>
    <nav className='navbar'>
      { !token &&
      <>
      <Link to='/auth/register'>Register</Link>
      <Link to='/auth/login'>Login</Link>
      </>
      }
      {token &&
      <>
      <Link to='/'>Home</Link>
      <span>Welcome, {user?.email}</span>
      <a onClick={logout}>Logout</a>
      </>
      }
    </nav>
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
        }/>
      <Route path='/products/:id' element={<ProductPage/>}/>
      <Route path='/auth/register' element={<RegisterPage/>}/>
      <Route path='/auth/login' element={<LoginPage/>}/>
    </Routes>
    </>
  )
}
