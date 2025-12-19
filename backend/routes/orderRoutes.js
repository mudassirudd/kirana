import express from 'express'
import { auth } from '../middlewares/auth.js'
import { adminOnly } from '../middlewares/adminOnly.js'
import {
  placeOrder,
  getOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatusById,
} from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/', auth, placeOrder)
orderRouter.get('/orders', auth, getOrders)
orderRouter.get('/all-orders', auth, adminOnly, getAllOrders)
orderRouter.get('/:id', auth, adminOnly, getOrderById)
orderRouter.patch('/:id', auth, adminOnly, updateOrderStatusById)

export default orderRouter
