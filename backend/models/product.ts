import mongoose from 'mongoose'

export interface Iproduct {
  name: string
  category: string
  description: string
  price: number
  image: string
}
export interface IproductDocument extends Iproduct, mongoose.Document {}

const productSchema = new mongoose.Schema<IproductDocument>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
})

export const Product = mongoose.model<IproductDocument>(
  'Product',
  productSchema,
)
