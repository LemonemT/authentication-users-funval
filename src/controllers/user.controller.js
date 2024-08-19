import fs from 'fs/promises'
import path from 'path'
import User from '../models/User.js'

export const index = async (req, res) => {
  try {
    const usuarios = await User.all()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const find = async (req, res) => {
  try {
    const { id } = req.params
    const usuario = await User.getById(id)

    if (usuario.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(usuario)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const store = async (req, res) => {
  try {
    console.log(req.file); 
    const { fName, mName, lName, username, email, password } = req.body
    const filename = req.file ? req.file.filename : null;  

    if (!fName || !username || !email || !password) return res.status(400).json({ message: 'Faltan datos' })

    const nuevoUsuario = await User.create({
      fName,
      username,
      email,
      password,
      mName,
      lName,
      image: filename
    })

    if (nuevoUsuario[0].affectedRows === 1) return res.json({ message: 'Usuario guardado' })

    res.status(500).json({ message: 'Error al guardar el usuario' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const showImage = async (req, res) => {
  try {
    const { nombre } = req.params
    const ruta = path.resolve(`./uploads/${nombre}`)
    await fs.access(ruta)

    res.sendFile(ruta)
  } catch (error) {
    if (error.errno === -4058) {
      return res.status(404).json({ message: 'No se encontró la imagen' })
    }

    res.status(500).json({ message: error.message })
  }
}
