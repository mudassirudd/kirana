import mongoose from 'mongoose'
export interface IorderItem {
  productId: mongoose.Types.ObjectId
  name: string
  price: number
  quantity: number
}

export interface IOrder {
  userId: mongoose.Types.ObjectId
  items: IorderItem[]
  total: number
  status: 'processing' | 'delivered' | 'cancelled'
}
export interface IOrderDocument extends IOrder, mongoose.Document {}

const orderSchema = new mongoose.Schema<IOrderDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        _id: false,
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['processing', 'delivered', 'cancelled'],
      default: 'processing',
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
)

export const Order = mongoose.model<IOrderDocument>('Order', orderSchema)
