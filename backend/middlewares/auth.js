import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
export function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = {
      id: decoded.id,
      role: decoded.role,
    }
    next()
  } catch (error) {
    return res.status(401).json({ error: '401 Unauthorized' })
  }
}
