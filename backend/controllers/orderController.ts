import type { AuthenticatedRequest } from '../middlewares/auth.js'
import { Order } from '../models/order.js'
import { Product } from '../models/product.js'
import type { Request, Response } from 'express'

export async function placeOrder(req: AuthenticatedRequest, res: Response) {
  try {
    const { items } = req.body
    const userId = req.user.id

    // 1. Initial Validation
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Empty items' })
    }

    const productIds = items.map((i: any) => i.productId)
    const products = await Product.find({ _id: { $in: productIds } })

    let total = 0
    const orderItems = [] // We will push clean data here

    // 2. The Loop (This replaces the broken .map)
    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item.productId)

      if (!product) {
        // This RETURN actually stops the whole placeOrder function!
        return res
          .status(404)
          .json({ error: `Product ${item.productId} not found` })
      }

      const productAmount = product.price * item.quantity
      total += productAmount

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      })
    }

    // 3. Now orderItems is GUARANTEED to be a clean array of objects
    const order = await Order.create({
      userId,
      items: orderItems,
      total,
    })

    return res.status(201).json({ order })
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}

export async function getOrders(req: AuthenticatedRequest, res: Response) {
  try {
    const user = req.user.id
    const orders = await Order.find({ userId: user })
    return res.status(200).json({ orders })
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' })
  }
}
export async function getAllOrders(req: AuthenticatedRequest, res: Response) {
  try {
    const orders = await Order.find().populate('userId', 'email')
    return res.status(200).json({ orders })
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' })
  }
}
export async function getOrderById(req: AuthenticatedRequest, res: Response) {
  try {
    const order = await Order.findById(req.params.id).populate(
      'userId',
      'email',
    )
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    return res.status(200).json({ order })
  } catch (error) {
    return res.status(400).json({ error: 'Invalid order id' })
  }
}

export async function updateOrderStatusById(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const id = req.params.id
    const { status } = req.body

    const newStatus = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    )
    if (!newStatus) {
      return res.status(404).json({ error: 'order not found' })
    }
    return res.status(201).json({ status: newStatus.status })
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}
