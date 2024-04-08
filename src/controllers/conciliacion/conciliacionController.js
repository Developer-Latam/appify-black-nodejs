import conciliacionService from "../../services/conciliacion/conciliacionService.js";


export const saveBankData = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.saveBankData(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const createMovimiento = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.createMovimiento(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getLinkByUserId = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.getLinkByUserId(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getCuentasByCuentaId = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.getCuentasByCuentaId(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getMovimientosById = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.getMovimientosById(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getConciliacionesByUserId = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.getConciliacionesByUserId(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getCuentasBancariasByConciliacionId = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.getCuentasBancariasByConciliacionId(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getMovimientosByCuentaId = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.getMovimientosByCuentaId(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateUserConciliacion = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.updateUserConciliacion(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



