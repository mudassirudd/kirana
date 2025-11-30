import { User } from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

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
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body

    //validate
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }
    // finduser
    const foundUser = await User.findOne({ email: email })
    if (!foundUser) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }
    // compare pwd
    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Email or Password' })
    }
    // generate jwt
    const token = jwt.sign(
      { email, id: foundUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '3d' }
    )
    //respond with token and user data

    return res.status(200).json({
      message: 'Logged in',
      token,
      user: {
        email,
        id: foundUser._id,
      },
    })
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' })
  }
}
