
import './App.css'
import {Routes,Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'


function App() {

  return (
    <>
    <nav>
      <Link to='/'>Home</Link>
    </nav>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products/:id' element={<ProductPage/>}/>
    </Routes>
    </>
  )
}

export default App
