import { pool } from '../config/db.js'
import { hash } from 'bcrypt'

class User {
  static async all () {
    const usuarios = await pool.execute('SELECT * FROM users')
    return usuarios[0]
  }

  static async getById (id) {
    const usuario = await pool.execute('SELECT * FROM users WHERE user_id = ?', [id])
    return usuario[0]
  }

  static async where (campo, valor) {
    const usuario = await pool.execute(`SELECT * FROM users WHERE ${campo} = ?`, [valor])
    return usuario[0]
  }

  static async create ({ name, bio, phone, email, password, image }) {
    const encriptado = await hash(password, 10)
    const campos = ['name', 'bio', 'phone', 'email', 'password', 'image']
    const values = [name, bio, phone, email, encriptado, image]

    const camposString = campos.join(', ')
    const placeholders = values.map(() => '?').join(', ')

    const nuevoUsuario = await pool.execute(`INSERT INTO users(${camposString}) VALUES (${placeholders})`, values)

    return nuevoUsuario
  }

  static async getByUsernameOrEmail (valor) {
    const usuario = await pool.execute('SELECT * FROM users WHERE email = ? OR name = ?', [valor, valor])
    return usuario[0]
  }
}

export default User
