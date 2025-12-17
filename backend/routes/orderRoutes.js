import express from 'express'
import { auth } from '../middlewares/auth.js'
import { placeOrder, getOrders } from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/', auth, placeOrder)
orderRouter.get('/orders', auth, getOrders)

export default orderRouter
