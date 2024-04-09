import { Router } from 'express';
import {
  saveBankData,
  createMovimientos,
  getLinkByUserId,
  getCuentasByCuentaId,
  getMovimientosById,
  getConciliacionesByUserId,
  getCuentasBancariasByConciliacionId,
  getMovimientosByCuentaId,
  updateUserConciliacion,
  updateCuentaBancariaById
} from '../../controllers/conciliacion/conciliacionController.js';

const router = Router();

// Creacion de conciliacion bancaria con respectivas cuentas para ese banco
router.post('/createCon', saveBankData);

// Creacion de uno o varios movimientos
router.post('/createMov', createMovimientos);

/* AL FINAL NO SE PARA QUE HICE ESTA RUTA
router.get('/linkConciliacion/:userid', getLinkByUserId);*/

// Obtener cuenta Bancaria con el id de la cuenta
router.get('/BankAccount/:cuentaId', getCuentasByCuentaId);

// Obtener los datos de un movimiento por su id
router.get('/movimiento/:id', getMovimientosById);

// Obtener todas las conciliaciones por user ID
router.get('/conciliaciones/:userId', getConciliacionesByUserId);

// Obtener las cuentas bancarias por conciliacionID
router.get('/cuentas/:conciliacionId', getCuentasBancariasByConciliacionId);

// Obtener los movimientos de una cuenta por su ID
router.get('/movimientos/:cuentaId', getMovimientosByCuentaId);

// Actualizar el user que pidio la conciliacion bancaria despues que se creo
router.put('/update/:id', updateUserConciliacion);

// Actualizar cuenta bancatia para activarla
router.put('/bankUpdate/:id', updateCuentaBancariaById);


export default router;
