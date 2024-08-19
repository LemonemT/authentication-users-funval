import express from 'express'
import { PORT } from './config/config.js'
import usersRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'
import { validateCORS } from './middlewares/middleware.js'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(validateCORS)
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
