import { Product } from '../models/product.js'

export async function getProducts(req, res) {
  try {
    const products = await Product.find()
    return res.status(200).json({ products })
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    return res.status(200).json({ product })
  } catch (error) {
    return res.status(400).json({ error: 'invalid product id format' })
  }
}

export async function createProduct(req, res) {
  try {
    const { name, category, description, price, image } = req.body
    const required = [name, category, description, price, image]
    const allPresent = required.every(Boolean)

    if (!allPresent) {
      return res.status(400).json({ error: 'All Fields Required' })
    }
    const product = await Product.create({
      name,
      category,
      description,
      price,
      image,
    })

    return res.status(201).json({ product })
  } catch (error) {
    return res.status(500).json({ error: 'server error' })
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params
    const updates = req.body

    const updatedP = await Product.findByIdAndUpdate(id, updates, { new: true })

    if (!updatedP) {
      return res.status(404).json({ error: 'Product not found' })
    }

    return res.status(200).json({ updatedP })
  } catch (error) {
    return res.status(400).json({ error: 'Bad request  ' })
  }
}
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params
    const deletedP = await Product.findByIdAndDelete(id)
    if (!deletedP) {
      return res.status(404).json({ error: 'Product not found' })
    }
    return res.status(200).json({ message: ' Product deleted' })
  } catch (error) {
    return res.status(400).json({ error: 'Bad request' })
  }
}
