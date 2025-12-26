export default function ProductCard({product}){
  // console.log(product.image)
  return(
    <>
      <div className=" mx-auto flex flex-col  justify-between  items-center bg-gray-300  rounded-3xl w-full h-full pb-2">
        <img className="rounded-t-3xl aspect-square w-full h-full  object-cover" src={product.image} alt={product.description} />
        <h3 className="text-2xl font-medium  bold py-8 px-0.5 lg:text-3xl ">{product.name}</h3>
        <p className="text-sm m-2 text-gray-600">{product.description}</p>
        <strong>${product.price}</strong>

      </div>
    </>
  )
}