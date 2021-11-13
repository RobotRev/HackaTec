DROP DATABASE IF EXISTS hackatec;
CREATE DATABASE hackatec;
\c hackatec;
--Te mueve a la base de datos

-- CREATE TABLES
CREATE TABLE lugares (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL
);
CREATE TABLE tipos_incidentes (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL
);
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  "role" TEXT NOT NULL,
  "password" TEXT,
  email TEXT
);
CREATE TABLE incidentes (
  id SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL,
  id_lugar INTEGER NOT NULL,
  id_tipo_incidente INTEGER NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
);
-- END CREATE TABLES

-- CONSTRAINTS
ALTER TABLE incidentes
ADD CONSTRAINT FK_id_usuario
FOREIGN KEY(id_usuario)
REFERENCES usuarios(id);

ALTER TABLE incidentes
ADD CONSTRAINT FK_id_lugar
FOREIGN KEY(id_lugar)
REFERENCES lugares(id);

ALTER TABLE incidentes
ADD CONSTRAINT FK_id_tipo_incidente
FOREIGN KEY(id_tipo_incidente)
REFERENCES tipos_incidentes(id);

ALTER TABLE usuarios
ADD CONSTRAINT email
UNIQUE (email);

-- INSERTIONS

INSERT INTO lugares(nombre) VALUES
('Cuarto de maquinas'),
('Laboratorios'),
('Central de energia'),
('Planta de tratamiento de agua'),
('Almacen'),
('Entrada principal'),
('Invernadero'),
('Comedor/cocina'),
('Dormitorio'),
('Filtros de aire'),
('Enfermeria');

INSERT INTO tipos_incidentes(nombre) VALUES
('Falla electrica'),
('Incendio'),
('Inundacion'),
('Ataque Zombie'),
('Emergencia medica'),
('Fuga de gas'),
('Plaga');

INSERT INTO usuarios("role") VALUES
('PUBLICO');

