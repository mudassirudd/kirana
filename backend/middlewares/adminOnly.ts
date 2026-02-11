import type { NextFunction, Request, Response } from 'express'
import type { Iuser } from '../models/user.js'

export interface AuthRequest extends Request {
  user: Iuser
}

export function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  const isAdmin = req.user.role === 'admin'

  if (!isAdmin) {
    return res.status(403).json({ error: 'Access denied' })
  }

  next()
}
