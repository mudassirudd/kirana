export default function AdminProductsTable({products,handleDelete,handleEdit}) {
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
              <button onClick={()=>handleEdit(prod._id)}>Edit</button>
              <button onClick={()=>handleDelete(prod._id)}>Delete</button>
              </td>

          </tr>
          ))}
          </tbody>
        </table>
      
    
  )
}