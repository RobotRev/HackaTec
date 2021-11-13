const { DB } = require('../database')

const MainModel = {
  login: () => {

  },
  getAllUsers: () => {
    return DB.query('SELECT * FROM usuarios', [])
  },
  getOneUserByEmail: (email) => {
    return DB.query('SELECT * FROM usuarios WHERE email = $1', [email])
  },
  getOneUser: (id) => {
    return DB.query('SELECT * FROM usuarios WHERE id = $1', [id])
  },
  updateOneUserPassword: (id, hash) => {
    const UPDATE = `
    UPDATE usuarios
    SET password = $2
    WHERE
    id = $1
    `

    return DB.query(UPDATE, [id, hash])
  },
  getAllLocations: () => {
    const QUERY = 'SELECT * FROM lugares;'
    return DB.query(QUERY, [])
  },

  getAllIncidentTypes: () => {
    const QUERY = `
    SELECT * FROM tipos_incidentes;
    `
    return DB.query(QUERY, [])
  },

  getAllIncidents: () => {
    const QUERY = `
    SELECT
    I.id,
    U.role as usuario,
    L.nombre as lugar,
    TI.nombre as tipo_incidente
    FROM incidentes I, usuarios U, lugares L, tipos_incidentes TI
    WHERE
    I.id_usuario = U.id
    AND
    I.id_lugar = L.id
    AND
    I.id_tipo_incidente = TI.id
    `
    return DB.query(QUERY, [])
  },

  getOneIncident: (id) => {
    const QUERY = `
    SELECT
    I.id,
    U.role as usuario,
    L.nombre as lugar,
    TI.nombre as tipo_de_incidente
    from incidentes I, usuarios U, lugares L, tipos_incidentes TI
    WHERE
    I.id = $1
    AND
    I.id_usuario = U.id
    AND
    I.id_lugar = L.id
    AND
    I.id_tipo_incidente = TI.id
    `
    return DB.query(QUERY, [id])
  },

  postOneIncident: (incidente) => {
    const INSERTION = `
    INSERT INTO incidentes (id_usuario,id_lugar,id_tipo_incidente)
    VALUES
    ($1, $2, $3)
    `
    return DB.query(INSERTION,
      [incidente.id_usuario, incidente.id_lugar, incidente.id_tipo_incidente]
    )
  }

}

module.exports = { MainModel }
