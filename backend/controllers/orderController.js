import { Order } from '../models/order.js'

export async function placeOrder(req, res) {
  try {
    return res.status(200).json({ message: 'order placing endpoint hit' })
  } catch (error) {
    return res.status(500).json({ error: 'server error' })
  }
}
