import express from 'express'
import { auth } from '../middlewares/auth.js'
import { placeOrder } from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/', auth, placeOrder)

export default orderRouter
