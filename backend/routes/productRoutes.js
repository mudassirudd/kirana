import express from 'express'
import { auth } from '../middlewares/auth.js'
import { adminOnly } from '../middlewares/adminOnly.js'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'

const productRouter = express.Router()

productRouter.get('/', getProducts)
productRouter.get('/:id', getProductById)
productRouter.post('/', auth, adminOnly, createProduct)
productRouter.put('/:id', auth, adminOnly, updateProduct)
productRouter.delete('/:id', auth, adminOnly, deleteProduct)

export default productRouter
