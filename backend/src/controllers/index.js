// const loginController = () => {};

// const getAllUsersController = () => {};

// const updateOneUserController = () => {};

// module.exports = {
//   loginController,
//   getAllUsersController,
//   updateOneUserController,
// };
const { MainModel } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mainControllers = {
  login: (req, res) => {
    const { password, email } = req.body
    // Realizamos la consulta a la DB por el campo email
    MainModel.getOneUsuarioByEmail(email)
      .then((response) => {
        // Comparamos el registro de la base datos si es que existe
        if (!(response.rowCount === 1)) {
          res.status(404).json({
            msg: 'email no encontrado'
          })
          return
        }
        // Esta funcion compara el texto plano y el hash
        const match = bcrypt.compareSync(
          password,
          response.rows[0].password
        )
        // Si no es un match correcto entre hash y texto plano damos retro al cliente
        if (!match) {
          res.status(500).json({
            msg: 'Credenciales invalidas'
          })
          return
        }

        // Continuamos con el resto del login

        // Crearemos token

        const token = jwt.sign(
          { MIPAYLOAD: response.rows[0].id },
          'mi_secreto',
          { expiresIn: '30s' }
        )
        res.status(200).json({
          msg: token
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          msg: 'error'
        })
      })
  },
  getAllUsers: (req, res) => {
    MainModel.getAllUsers()
      .then((response) => {
        res.status(200).json({
          msg: response.rows,
          total: response.rowCount
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          msg: 'Error getting users'
        })
      })
  },

  getOneUser: (req, res) => {
    const { id } = req.params
    MainModel.getOneUser(id)
      .then((response) => {
        res.status(200).json({
          msg: response.rows,
          total: response.rowCount
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          msg: 'Error getting One user'
        })
      })
  },
  updateOneUserPassword: (req, res) => {
    const { id } = req.params
    const { password } = req.body
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    MainModel.updateOneUserPassword(id, hash)
      .then((response) => {
        res.status(201).json({
          msg: 'Updated',
          count: response.rowCount
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          msg: 'Error'
        })
      })
  },

  getAllLocations: (req, res) => {
    MainModel.getAllLocations()
      .then((response) => {
        res.status(200).json({
          msg: response.rows,
          total: response.rowCount
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          msg: 'Error getting Locations'
        })
      })
  },

  getAllIncidentTypes: (req, res) => {
    MainModel.getAllIncidentTypes()
      .then((response) => {
        res.status(201).json({
          msg: response.rows,
          count: response.rowCount
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          msg: 'error'
        })
      })
  },

  postOneIncident: (req, res) => {
    MainModel.postOneIncident(req.body)
      .then((response) => {
        res.status(201).json({
          msg: response.rows,
          count: response.rowCount
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          msg: 'error'
        })
      })
  },

  getAllIncidents: (req, res) => {
    MainModel.getAllIncidents()
      .then((response) => {
        res.status(201).json({
          msg: response.rows,
          count: response.rowCount
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          msg: 'error'
        })
      })
  },

  getOneIncident: (req, res) => {
    MainModel.getOneIncident(req.params.id)
      .then((response) => {
        res.status(201).json({
          msg: response.rows[0],
          count: response.rowCount
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          msg: 'error'
        })
      })
  }

}

module.exports = { mainControllers }
