export function adminOnly(req, res, next) {
  const isAdmin = req.user.role === 'admin'

  if (!isAdmin) {
    return res.status(403).json({ error: 'Access denied' })
  }

  next()
}
