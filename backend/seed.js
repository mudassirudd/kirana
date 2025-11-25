import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { Product } from './models/product.js'

dotenv.config()
let products = [
  {
    name: "Men's Casual T-shirt",
    category: 'Men',
    description: 'Comfortable and stylish casual T-shirt for men',
    price: 350,
    image:
      'https://media.geeksforgeeks.org/wp-content/uploads/20230407153931/gfg-tshirts.jpg',
  },
  {
    name: 'Luxury bag',
    category: 'Not Applicable',
    description: 'Elegant luxury bag with leather strap',
    price: 2500,
    image:
      'https://media.geeksforgeeks.org/wp-content/uploads/20230407154213/gfg-bag.jpg',
  },
  {
    name: 'Hoodie',
    category: 'Men',
    description: 'Light and classy hoodies for every season',
    price: 450,
    image:
      'https://media.geeksforgeeks.org/wp-content/uploads/20230407153938/gfg-hoodie.jpg',
  },
  {
    name: 'Remote Control Toy car',
    category: 'Not Applicable',
    description: 'High-quality Toy car for fun and adventure',
    price: 1200,
    image:
      'https://media.geeksforgeeks.org/wp-content/uploads/20240122182422/images1.jpg',
  },
  {
    name: 'Books',
    category: 'Women',
    description: 'You will have a great time reading.',
    price: 5000,
    image:
      'https://media.geeksforgeeks.org/wp-content/uploads/20240110011854/reading-925589_640.jpg',
  },
  {
    name: 'Bag',
    category: 'Men',
    description: 'Comfortable and supportive Bag',
    price: 800,
    image:
      'https://media.geeksforgeeks.org/wp-content/uploads/20230407154213/gfg-bag.jpg',
  },
  {
    name: 'Winter hoodies for women',
    category: 'Women',
    description:
      'Stay cozy in style with our womens hoodie, crafted for comfort',
    price: 250,
    image:
      'https://media.geeksforgeeks.org/wp-content/uploads/20230407153938/gfg-hoodie.jpg',
  },
  {
    name: 'Honda car',
    category: 'Men',
    description: 'Powerful Honda car with comfy driving',
    price: 700,
    image:
      'https://media.geeksforgeeks.org/wp-content/uploads/20240122184958/images2.jpg',
  },
]

async function seedDB() {
  try {
    await connectDB()

    await Product.deleteMany({})
    console.log('Old products removed.')

    await Product.insertMany(products)
    console.log('Seed data inserted.')

    process.exit(0)
  } catch (err) {
    console.error('Seeding error:', err)
    process.exit(1)
  }
}

seedDB()
