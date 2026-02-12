import type { NextFunction, Response } from 'express'
import type { AuthenticatedRequest } from './auth.js'

export function adminOnly(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const isAdmin = req.user.role === 'admin'

  if (!isAdmin) {
    return res.status(403).json({ error: 'Access denied' })
  }

  next()
}
