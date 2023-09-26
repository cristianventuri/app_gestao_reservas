CREATE DATABASE IF NOT EXISTS gestao_reserva;
USE gestao_reserva;

CREATE TABLE usuarios (
  usrId INT NOT NULL AUTO_INCREMENT,
  usrNome VARCHAR(255) NOT NULL UNIQUE,
  usrSenha VARCHAR(50) NOT NULL,
  PRIMARY KEY (usrId)
);

CREATE TABLE mesas (
  msaId INT NOT NULL AUTO_INCREMENT,
  msaDescricao VARCHAR(255) NOT NULL,
  PRIMARY KEY (msaId)
);

CREATE TABLE reservas (
  rsvId INT NOT NULL AUTO_INCREMENT,
  rsvNome VARCHAR(255) NOT NULL,
  rsvDataHora DATETIME NOT NULL,
  usrId INT NOT NULL,
  msaId INT NOT NULL,
  PRIMARY KEY (rsvId),
  FOREIGN KEY (usrId) REFERENCES usuarios(usrId),
  FOREIGN KEY (msaId) REFERENCES mesas(msaId)
);


-- Para popular o banco;
INSERT INTO usuarios(usrNome, usrSenha)
VALUES ("João", "202cb962ac59075b964b07152d234b70"), ("Maria", "202cb962ac59075b964b07152d234b70");

INSERT INTO mesas(msaDescricao)
VALUES ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar"), ("Mesa Jantar");

INSERT INTO reservas(rsvNome, rsvDataHora, usrId, msaId)
VALUES ("Cliente do Restaurante - 1", "2023-09-22 14:00:32", 1, 1), ("Cliente do Restaurante - 2", "2023-09-22 14:00:32", 2, 1);