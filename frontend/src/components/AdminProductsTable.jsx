import { Link } from "react-router-dom"

export default function AdminProductsTable({products,handleDelete}) {
  return(
    
         <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

        {  products.map(prod=>(
          <tr key={prod._id}>
            <td>{prod.name}</td>
            <td>{prod.price}</td>
            <td>
              <Link to={`/admin/products/${prod._id}/edit`}>
              <button>Edit</button>
              </Link>

              <button onClick={()=>handleDelete(prod._id)}>Delete</button>
              </td>

          </tr>
          ))}
          </tbody>
        </table>
      
    
  )
}