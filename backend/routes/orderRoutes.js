import express from 'express'
import { auth } from '../middlewares/auth.js'
import { adminOnly } from '../middlewares/adminOnly.js'
import {
  placeOrder,
  getOrders,
  getAllOrders,
} from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/', auth, placeOrder)
orderRouter.get('/orders', auth, getOrders)
orderRouter.get('/all-orders', auth, adminOnly, getAllOrders)

export default orderRouter
