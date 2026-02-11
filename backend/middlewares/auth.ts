import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import type { Request, Response, NextFunction } from 'express'
import type { Iuser } from '../models/user.js'
dotenv.config()

export interface TokenPayload {
  id: string
  role: 'user' | 'admin'
}
export interface AuthenticatedRequest extends Request {
  user: TokenPayload
}
export function auth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(
      token!,
      process.env.JWT_SECRET_KEY!,
    ) as TokenPayload
    req.user = {
      id: decoded.id,
      role: decoded.role,
    }
    next()
  } catch (error) {
    return res.status(401).json({ error: '401 Unauthorized' })
  }
}
