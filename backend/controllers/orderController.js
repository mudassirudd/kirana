import { Order } from '../models/order.js'
import { Product } from '../models/product.js'

export async function placeOrder(req, res) {
  try {
    const { items } = req.body
    const userId = req.user.id

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Empty items' })
    }

    // find prodict id
    const productIds = items.map((i) => i.productId)

    // find products
    const products = await Product.find({ _id: { $in: productIds } })

    // products === items
    if (products.length !== items.length) {
      return res.status(400).json({ error: 'Invalid product in cart' })
    }

    //orderItems (p id === iem.productsId)
    let total = 0

    const orderItems = items.map((item) => {
      if (item.quantity <= 0) {
        throw new Error('Invalid quantity')
      }
      const product = products.find((p) => p._id.toString() === item.productId)

      //total calc
      const productAmount = product.price * item.quantity
      total += productAmount
      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      }
    })

    //create Order
    const order = await Order.create({
      userId,
      items: orderItems,
      total,
    })

    return res.status(201).json({ order })
  } catch (error) {
    return res.status(500).json({ error: 'server error' })
  }
}

export async function getOrders(req, res) {
  try {
    const user = req.user.id
    const orders = await Order.find({ userId: user })
    return res.status(200).json({ orders })
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' })
  }
}
export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().populate('userId', 'email')
    return res.status(200).json({ orders })
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' })
  }
}
export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate(
      'userId',
      'email'
    )
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    return res.status(200).json({ order })
  } catch (error) {
    return res.status(400).json({ error: 'Invalid order id' })
  }
}

export async function updateOrderStatusById(req, res) {
  try {
    const id = req.params.id
    const { status } = req.body

    const newStatus = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
    if (!newStatus) {
      return res.status(404).json({ error: 'order not found' })
    }
    return res.status(201).json({ status: newStatus.status })
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}
