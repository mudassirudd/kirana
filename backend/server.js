import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'
import productRouter from './routes/productRoutes.js'
import authRouter from './routes/authRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

connectDB()
app.use('/products', productRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send({ message: 'API working' })
})

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on port:${process.env.PORT}`)
})
