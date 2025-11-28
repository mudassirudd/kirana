import { User } from '../models/user.js'
import bcrypt from 'bcryptjs'

export async function registerUser(req, res) {
  try {
    //extract email pass
    const { email, password } = req.body
    //validate both
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }
    //check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // save user
    await User.create({
      email: email,
      password: hashedPassword,
    })
    // respond success
    res.status(201).json({ message: 'User created' })
  } catch (error) {
    // error
    res.status(500).json({ error: 'Server error' })
  }
}
