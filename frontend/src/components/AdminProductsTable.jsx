export default function AdminProductsTable({products}) {
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
              <button>Edit</button>
              <button>Delete</button>
              </td>

          </tr>
          ))}
          </tbody>
        </table>
      
    
  )
}