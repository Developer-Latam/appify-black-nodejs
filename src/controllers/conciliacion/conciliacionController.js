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

export const createMovimientos = async (req, res) => {
    try {
        const data = req.body;
        await conciliacionService.createMovimientos(data);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getLinkByUserId = async (req, res) => {
    try {
        const userId = req.params;
        await conciliacionService.getLinkByUserId(userId);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getCuentasByCuentaId = async (req, res) => {
    try {
        const cuentaId = req.params;
        await conciliacionService.getCuentasByCuentaId(cuentaId);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getMovimientosById = async (req, res) => {
    try {
        const id = req.params;
        await conciliacionService.getMovimientosById(id);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getConciliacionesByUserId = async (req, res) => {
    try {
        const userId = req.params;
        await conciliacionService.getConciliacionesByUserId(userId);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getCuentasBancariasByConciliacionId = async (req, res) => {
    try {
        const conciliacionId = req.params;
        await conciliacionService.getCuentasBancariasByConciliacionId(conciliacionId);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getMovimientosByCuentaId = async (req, res) => {
    try {
        const cuentaId = req.params;
        await conciliacionService.getMovimientosByCuentaId(cuentaId);
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateUserConciliacion = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.body;
        await conciliacionService.updateUserConciliacion({id : id, userId: user});
        res.status(200).json({response: 'ok' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



