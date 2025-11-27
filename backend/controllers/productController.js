import { Product } from '../models/product.js'

export async function getProducts(req, res) {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: 'server error' })
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: 'server error' })
  }
}
