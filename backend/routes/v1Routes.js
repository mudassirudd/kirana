import express from 'express'
import productRouter from './productRoutes.js'
import authRouter from './authRoutes.js'
import orderRouter from './orderRoutes.js'

const v1Router = express.Router()

v1Router.use('/products', productRouter)
v1Router.use('/auth', authRouter)
v1Router.use('/order', orderRouter)

export default v1Router
