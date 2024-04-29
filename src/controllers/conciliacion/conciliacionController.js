import conciliacionService from "../../services/conciliacion/conciliacionService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const saveBankData = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.saveBankData(data);
        ResponseHandler.Ok(res, "Ok")
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const createMovimientos = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.createMovimientos(data);
        ResponseHandler.Ok(res, "Ok")
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const createCuentaLink = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.createCuentaLink(data);
        ResponseHandler.Ok(res,'OK' );
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getLinkByUserId = async (req, res) => {
    try {
        const userId = req.params;
        await conciliacionService.getLinkByUserId(userId);
        ResponseHandler.Ok(res,'ok' );
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getCuentaLinkById = async (req, res) => {
    try {
        const id = req.params;
        await conciliacionService.getCuentaLinkById(id);
        ResponseHandler.Ok(res,'ok' );
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getCuentasByCuentaId = async (req, res) => {
    try {
        const {cuentaId} = req.params;
        const respuesta = await conciliacionService.getCuentasByCuentaId(cuentaId);
        ResponseHandler.Ok(res, respuesta );
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getMovimientosById = async (req, res) => {
    try {
        const {id} = req.params;
        const respuesta = await conciliacionService.getMovimientosById(id);
        ResponseHandler.Ok(res, respuesta );
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getConciliacionesByUserId = async (req, res) => {
    try {
        const {userId} = req.params;
        const respuesta = await conciliacionService.getConciliacionesByUserId(userId);
        ResponseHandler.Ok(res, respuesta );
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getCuentasBancariasByConciliacionId = async (req, res) => {
    try {
        const {conciliacionId} = req.params;
        const respuesta = await conciliacionService.getCuentasBancariasByConciliacionId(conciliacionId);
        ResponseHandler.Ok(res, respuesta );
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getMovimientosByCuentaId = async (req, res) => {
    try {
        const {cuentaId} = req.params;
        const respuesta = await conciliacionService.getMovimientosByCuentaId(cuentaId);
        ResponseHandler.Ok(res, respuesta );
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateUserConciliacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req.body; // Solo extraer el campo 'user' del cuerpo de la solicitud
        await conciliacionService.updateUserConciliacion(id, user); // Pasar solo 'user' al servicio
        ResponseHandler.Ok(res,'ok' );
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateCuentaBancariaById = async (req, res) => {
    try {
        const { id } = req.params;
        const { activo } = req.body; 
        await conciliacionService.updateCuentaBancariaById(id, activo); // Pasar solo 'user' al servicio
        // console.log(activo)
        // console.log(id)
        ResponseHandler.Ok(res,'ok' );
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};