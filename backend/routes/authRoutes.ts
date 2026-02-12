import express from 'express'
import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'

const authRouter: Router = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)

export default authRouter
