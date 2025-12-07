export default function ProductCard({product}){
  // console.log(product.image)
  return(
    <>
      <div className="product-card">
        <img src={product.image} alt={product.description} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong>${product.price}</strong>

      </div>
    </>
  )
}