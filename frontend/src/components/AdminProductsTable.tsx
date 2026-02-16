import { Link } from "react-router-dom"
import type { Product } from "./ProductCard"

export interface AdminProductsTableProps{
  products:Product[]
  handleDelete:(id:string)=>void

}


export default function AdminProductsTable({products,handleDelete}:AdminProductsTableProps) {
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
          <tr  key={prod._id}>
            <td className="p-2.5" >{prod.name}</td>
            <td className="p-2.5" >{prod.price}</td>
            <td>
              <Link  to={`/admin/products/${prod._id}/edit`}>
              <button className="btn w-fit  px-1 py-0 mr-0.5 cursor-pointer">Edit</button>
              </Link>

              <button className="btn w-fit px-1 py-0" onClick={()=>handleDelete(prod._id)}>Delete</button>
              </td>

          </tr>
          ))}
          </tbody>
        </table>
      
    
  )
}export interface AdminProductsTableProps{
  products:Product[]
  handleDelete:(id:string)=>void

}