const express = require('express')
const { mainControllers } = require('../controllers')
const router = express.Router()

// const {loginController, getAllUsersController, updateOneUserController } = require("../controllers")
// Autorización
router.post('/login', mainControllers.login)
// Usuarios
router.get('/users', mainControllers.getAllUsers)
// router.get('/user')
router.get('/users/:id', mainControllers.getOneUser)
router.put('/user/:id', mainControllers.updateOneUserPassword)
// Lugares
router.get('/locations', mainControllers.getAllLocations)
// Tipos de incidentes
router.get('/incident-types', mainControllers.getAllIncidentTypes)
// Incidentes
router.post('/incidents', mainControllers.postOneIncident)
router.get('/incident', mainControllers.getAllIncidents)
router.get('/incident/:id', mainControllers.getOneIncident)

module.exports = { router }
