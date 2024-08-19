import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import express from 'express'

const app = express()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Authentication',
      version: '1.0.0',
      description: 'Api de autenticacion de usuarios'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
}

const specs = swaggerJsdoc(options)

export const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
