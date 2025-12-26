
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
import EditProductPage from './pages/EditProductPage'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import AllOrdersPage from './pages/AllOrdersPage'
import OrderPage from './pages/OrderPage'
import { useCart } from './hooks/useCart'



export default function App() {
  const {user,logout,token} = useAuth()

  const {cart} = useCart()

   const totalItems = cart.reduce((sum,item)=>{
    return sum+item.quantity
  },0)
  
  return (
    <main className='   w-full min-h-screen 
    '>
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


      
      {user?.role === 'admin'
      ?<Link to='/order/all-orders'>All Orders</Link>
      :<Link to="/order/orders">Orders</Link>
    }

    <Link to='/cart' style={{position:"relative"}}>
        🛒 {totalItems > 0 && <span className='badge'>{totalItems}</span>}
      </Link>
      <Link onClick={logout}>Logout</Link>

      {user?.role==='admin' && 
       <>
        <Link to="/admin/create-product">Create Product</Link>
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
        <Route path='/cart' element={
          <ProtectedRoute>
            <CartPage/>
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

        <Route
         path='/admin/products/:id/edit'
         element={
          <AdminRoute>
            <EditProductPage/>
          </AdminRoute>
        } />

        <Route path='/order/orders' element={
          <ProtectedRoute>
           <OrdersPage/>
          </ProtectedRoute>
          }/>
        <Route path='/order/all-orders' element={
          <ProtectedRoute>
            <AdminRoute>
              <AllOrdersPage/>
            </AdminRoute>
          </ProtectedRoute>
          }/>
          <Route path='/order/:id' element={
            <ProtectedRoute>
              <AdminRoute>
                <OrderPage/>
              </AdminRoute>
            </ProtectedRoute>
        }/>
    </Routes>
    </main>
  )
}
