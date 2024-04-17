import { Router } from 'express';
import { 
    createCuentasBanco,
    createCuentaBancoConciliacion,
    createCategoriaCuenta,
    createCuentaTipoDocumento,
    createBanco,
    createCondicionPago,
    getCuentaBancoById,
    getCuentaBancoConciliacionId,
    getCategoriaCuentaById,
    getCuentaTipodocumentoById,
    getCondicionPagoById,
    getCondicionesCondicionPagoById,
    getAllCuentasBancoByUserId,
    getAllCuentasBancoConciliacionByUserId,
    getAllCategoriasCuentaByUserId,
    getAllCuentasTipoDocumentoByUserId,
    getAllBancosByUserId,
    getAllCondicionPagoByUserId,
    updateCuentasBanco,
    updateCategoriaCuenta,
    updateCuentaTipoDoc,
    updateBanco,
    updateCondicionPago,
    updateCondicionesCondicionPago

} from '../../controllers/administracion/cuentasController.js';
const router = Router();

// Ruta para crear un cobro cualquiera
router.post('/crearCuentaBanco', createCuentasBanco);

// Ruta para crear un cobro cualquiera
router.post('/crearCuentaBancoConciliacion', createCuentaBancoConciliacion);

// Ruta para crear un cobro cualquiera
router.post('/crearCategoriaCuenta', createCategoriaCuenta);

// Ruta para crear un cobro cualquiera
router.post('/crearCuentaTipoDoc', createCuentaTipoDocumento);

// Ruta para crear un cobro cualquiera
router.post('/crearBanco', createBanco);

// Ruta para crear condicion de pago con sus respectivas condiciones
router.post('/crearCondicionPago', createCondicionPago);

// Ruta para obtener un cobro cualquiera con su ID
router.get('/obtenerCuentaBanco/:id', getCuentaBancoById);

// Ruta para obtener un cobro cualquiera con su ID
router.get('/obtenerCuentaBancoConciliacion/:id', getCuentaBancoConciliacionId);

// Ruta para obtener un cobro cualquiera con su ID
router.get('/obtenerCategoriaCuenta/:id', getCategoriaCuentaById);

// Ruta para obtener un cobro cualquiera con su ID
router.get('/obtenerCuentaTipoDoc/:id', getCuentaTipodocumentoById);

// Ruta para obtener un cobro cualquiera con su ID
router.get('/obtenerCondicionPago/:id', getCondicionPagoById);

// Ruta para obtener un cobro cualquiera con su ID
router.get('/obtenerCondicionesCpago/:id', getCondicionesCondicionPagoById);


// Ruta para obtener todos los cobros por ID de usuario
router.get('/todasCuentasBanco/:id', getAllCuentasBancoByUserId);

// Ruta para obtener todos los cobros por ID de usuario
router.get('/todasCuentasBancoConciliacion/:id', getAllCuentasBancoConciliacionByUserId);

// Ruta para obtener todos los cobros por ID de usuario
router.get('/todasCategoriaCuenta/:id', getAllCategoriasCuentaByUserId);

// Ruta para obtener todos los cobros por ID de usuario
router.get('/todasCuentasTipoDoc/:id', getAllCuentasTipoDocumentoByUserId);

// Ruta para obtener todos los cobros por ID de usuario
router.get('/todosBancos/:id', getAllBancosByUserId);

// Ruta para obtener todos los cobros por ID de usuario
router.get('/todosCPago/:id', getAllCondicionPagoByUserId);

// Ruta para actualizar la tabla de cobro
router.put('/actualizarCuentaBanco/:id', updateCuentasBanco);

// Ruta para actualizar un cobro factura de venta
router.put('/actualizarCatCuenta/:id', updateCategoriaCuenta);

// Ruta para actualizar un cobro factura de venta excenta
router.put('/actualizarCTipoDoc/:id', updateCuentaTipoDoc);

// Ruta para actualizar un cobro de nota de credito
router.put('/actualizarBanco/:id', updateBanco);

// Ruta para eliminar un cobro de factura de venta en ambas tablas
router.put('/actualizarCPago/:id', updateCondicionPago);

// Ruta para eliminar un cobro de factura de venta excenta en ambas tablas
router.put('/actualizarCCPago/:id', updateCondicionesCondicionPago);


export default router

