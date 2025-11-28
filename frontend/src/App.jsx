
import './App.css'
import {Routes,Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import RegisterPage from './pages/RegisterPage'


function App() {

  return (
    <>
    <nav className='navbar'>
      <Link to='/'>Home</Link>
      <Link to='/auth/register'>Register</Link>
    </nav>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products/:id' element={<ProductPage/>}/>
      <Route path='/auth/register' element={<RegisterPage/>}/>
    </Routes>
    </>
  )
}

export default App
