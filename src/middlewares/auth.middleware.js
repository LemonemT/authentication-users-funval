import { SECRET_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const verificarToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) return res.status(401).json({ message: 'Token no proporcionado' })

    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, SECRET_KEY)
    const usuario = await User.getById(decoded.usuarioId)

    if (usuario.length === 0) return res.status(404).json({ message: 'El token no pertenece a ningún usuario registrado' })

    req.user = usuario[0]

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ message: 'Token expirado' })
    }

    res.status(500).json({ message: error.message })
  }
}
