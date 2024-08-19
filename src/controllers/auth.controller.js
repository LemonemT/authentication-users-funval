import { SECRET_KEY } from '../config/config.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';

export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const usuario = await User.getByUsernameOrEmail(usernameOrEmail);
    if (usuario.length === 0) return res.status(404).json({ message: 'El usuario no existe' });

    const esValido = await compare(password, usuario[0].password);
    if (!esValido) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ usuarioId: usuario[0].user_id }, SECRET_KEY, { expiresIn: '1h' });

    delete usuario[0].password;
    res.json({ token, user: usuario[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const me = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Usuario no encontrado' });

    delete req.user.password;
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
