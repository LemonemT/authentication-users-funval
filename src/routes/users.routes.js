import { Router } from 'express'
import { find, index, showImage, store, update } from '../controllers/user.controller.js'
import { uploadImage } from '../config/multer.js'
import { handleError } from '../middlewares/middleware.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene una lista de todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error en el servidor
 */
router.get('/', index)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', find)

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *               bio:
 *                 type: string
 *                 example: "Desarrollador web"
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               image:
 *                 type: string
 *                 example: "image.jpg"
 *     responses:
 *       200:
 *         description: Usuario creado
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error en el servidor
 */
router.post('/', uploadImage.single('image'), handleError, store)

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Actualiza los datos del usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *               bio:
 *                 type: string
 *                 example: "Desarrollador web"
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *               image:
 *                 type: string
 *                 example: "image.jpg"  # Este campo no se debe enviar para evitar cambios en la imagen
 *     responses:
 *        200:
 *          description: Usuario actualizado
 *        400:
 *          description: Solicitud incorrecta
 *        404:
 *          description: Usuario no encontrado
 *        500:
 *          description: Error en el servidor
 */
router.put('/update', update)

/**
 * @swagger
 * /api/users/image/{nombre}:
 *   get:
 *     summary: Muestra una imagen del usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre del archivo de la imagen
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Imagen encontrada
 *       404:
 *         description: Imagen no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/image/:nombre', showImage)

export default router
