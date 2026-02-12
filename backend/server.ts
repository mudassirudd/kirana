import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'
import v1Router from './routes/v1Routes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

connectDB()
app.use('/api/v1', v1Router)

app.get('/', (req, res) => {
  res.send({ message: 'API working' })
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port:${process.env.PORT}`)
})
