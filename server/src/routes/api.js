const express = require('express');
const router = express.Router();

/* ROTAS DE AUTENTICACAO */
const AuthController = require('../controller/AuthController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
router.post('/auth', AuthMiddleware.validateUser, AuthController.authUser);
router.post('/authJwt', AuthMiddleware.validateJwt, AuthController.getUserJwt);

/* ROTAS DE USUARIO */
const UserController = require('../controller/UserController');
const UserMiddleware = require('../middleware/UserMiddleware');
router.get('/users', UserController.getAll);
router.post('/users', UserMiddleware.validateUser, UserController.createUser);
router.delete('/users/:id', UserController.deleteUser);
router.put('/users/:id', UserMiddleware.validateUser, UserController.updateUser);

/* ROTAS DE MESA */
const MesaController = require('../controller/MesaController');
const MesaMiddleware = require('../middleware/MesaMiddleware');
router.get('/mesas', MesaController.getAll);
router.post('/mesas', MesaMiddleware.validateMesa, MesaController.createMesa);
router.delete('/mesas/:id', MesaController.deleteMesa);
router.put('/mesas/:id', MesaMiddleware.validateMesa, MesaController.updateMesa);

/* ROTAS DE RESERVA */
const ReservaController = require('../controller/ReservaController');
const ReservaMiddleware = require('../middleware/ReservaMiddleware');
router.get('/reservas', ReservaController.getAll);
router.post('/reservas-ativas/:mesa', ReservaController.getReservasAtivas);
router.post('/reservas', ReservaMiddleware.validateReserva, ReservaController.createReserva);
router.delete('/reservas/:id', ReservaController.deleteReserva);
router.put('/reservas/:id', ReservaMiddleware.validateReserva, ReservaController.updateReserva);

module.exports = router;