import type { Request, NextFunction, Response } from 'express'

export function adminOnly(req: Request, res: Response, next: NextFunction) {
  const isAdmin = req.user?.role === 'admin'

  if (!isAdmin) {
    return res.status(403).json({ error: 'Access denied' })
  }

  next()
}
