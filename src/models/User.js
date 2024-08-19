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

  static async create ({ fName, mName, lName, username, email, password, image }) {
    const encriptado = await hash(password, 10)
    const campos = ['f_name', 'username', 'email', 'password', 'image']
    const values = [fName, username, email, encriptado, image]

    if (mName) {
      campos.push('m_name')
      values.push(mName)
    }

    if (lName) {
      campos.push('l_name')
      values.push(lName)
    }

    const camposString = campos.join(', ')
    const placeholders = values.map(() => '?').join(', ')

    const nuevoUsuario = await pool.execute(`INSERT INTO users(${camposString}) VALUES (${placeholders})`, values)

    return nuevoUsuario
  }

  static async getByUsernameOrEmail (valor) {
    const usuario = await pool.execute('SELECT * FROM users WHERE email = ? OR username = ?', [valor, valor])
    return usuario[0]
  }
}

export default User
