import conciliacionService from "../../services/conciliacion/conciliacionService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";


export const saveBankData = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.saveBankData(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const createMovimientos = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.createMovimientos(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const createCuentaLink = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.createCuentaLink(data);
        ResponseHandler.Ok({response: 'ok' });
    } catch (err) {
        ResponseHandler.HandleError({ message: err.message });
    }
};

export const getLinkByUserId = async (req, res) => {
    try {
        const userId = req.params;
        await conciliacionService.getLinkByUserId(userId);
        ResponseHandler.Ok({response: 'ok' });
    } catch (err) {
        ResponseHandler.HandleError({ message: err.message });
    }
};

export const getCuentaLinkById = async (req, res) => {
    try {
        const id = req.params;
        await conciliacionService.getCuentaLinkById(id);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getCuentasByCuentaId = async (req, res) => {
    try {
        const {cuentaId} = req.params;
        const respuesta = await conciliacionService.getCuentasByCuentaId(cuentaId);
        res.status(200).json({ respuesta });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getMovimientosById = async (req, res) => {
    try {
        const {id} = req.params;
        const respuesta = await conciliacionService.getMovimientosById(id);
        res.status(200).json({ respuesta });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getConciliacionesByUserId = async (req, res) => {
    try {
        const {userId} = req.params;
        const respuesta = await conciliacionService.getConciliacionesByUserId(userId);
        res.status(200).json({respuesta});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getCuentasBancariasByConciliacionId = async (req, res) => {
    try {
        const {conciliacionId} = req.params;
        const respuesta = await conciliacionService.getCuentasBancariasByConciliacionId(conciliacionId);
        res.status(200).json({respuesta});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getMovimientosByCuentaId = async (req, res) => {
    try {
        const {cuentaId} = req.params;
        const respuesta = await conciliacionService.getMovimientosByCuentaId(cuentaId);
        res.status(200).json({respuesta});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateUserConciliacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req.body; // Solo extraer el campo 'user' del cuerpo de la solicitud
        await conciliacionService.updateUserConciliacion(id, user); // Pasar solo 'user' al servicio
        res.status(200).json({ response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCuentaBancariaById = async (req, res) => {
    try {
        const { id } = req.params;
        const { activo } = req.body; 
        await conciliacionService.updateCuentaBancariaById(id, activo); // Pasar solo 'user' al servicio
        // console.log(activo)
        // console.log(id)
        res.status(200).json({ response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};




