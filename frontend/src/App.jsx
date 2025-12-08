
import './App.css'
import {Routes,Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import {useAuth} from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import CreateProduct from './pages/CreateProduct'
import AdminRoute from './components/AdminRoute'
import AdminProductsPage from './pages/AdminProductsPage'



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

      <Link onClick={logout}>Logout</Link>

      {user?.role==='admin' && 
       <>
         <Link to="/admin/create-product">Create</Link>
        <Link to="/admin/products">Products List</Link>
       </>
      }

      </>
      }
    </nav>
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
        }/>
      <Route path='/products/:id' element={
        <ProtectedRoute>
          <ProductPage/>
        </ProtectedRoute>
        }/>
      <Route path='/auth/register' element={<RegisterPage/>}/>
      <Route path='/auth/login' element={<LoginPage/>}/>
         <Route path='/admin/create-product' element={
        <AdminRoute>
          <CreateProduct/>
        </AdminRoute>
        }/>

        <Route path="/admin/products" element={
          <AdminRoute>
            <AdminProductsPage/>
          </AdminRoute>
        }/>
    </Routes>
    </>
  )
}
