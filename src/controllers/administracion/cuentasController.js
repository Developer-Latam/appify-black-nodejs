import cuentasService from "../../services/administracion/cuentasService.js";



export const createCuentasBanco = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createCuentasBanco(data);
        res.status(200).json({cobros: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const createCuentaBancoConciliacion = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createCuentaBancoConciliacion(data);
        res.status(200).json({cobros: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const createCategoriaCuenta = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createCategoriaCuenta(data);
        res.status(200).json({cobros: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const createCuentaTipoDocumento = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createCuentaTipoDocumento(data);
        res.status(200).json({cobros: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const createBanco = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createBanco(data);
        res.status(200).json({cobros: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const createCondicionPago = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createCondicionPago(data);
        res.status(200).json({cobros: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getCuentaBancoById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCuentaBancoById(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getCuentaBancoConciliacionId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCuentaBancoConciliacionId(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getCobrosByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCobrosByUserId(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getCategoriaCuentaById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCategoriaCuentaById(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getCuentaTipodocumentoById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCuentaTipodocumentoById(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getCondicionPagoById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCondicionPagoById(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getCondicionesCondicionPagoById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCondicionesCondicionPagoById(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const getAllCuentasBancoByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllCuentasBancoByUserId(id);
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllCuentasBancoConciliacionByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllCuentasBancoConciliacionByUserId(id);
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllCategoriasCuentaByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllCategoriasCuentaByUserId(id);
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllCuentasTipoDocumentoByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllCuentasTipoDocumentoByUserId(id);
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllBancosByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllBancosByUserId(id);
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllCondicionPagoByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllCondicionPagoByUserId(id);
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



export const updateCuentasBanco = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await cuentasService.updateCuentasBanco(id, updateData);
        res.status(200).json({ ok: true, message: 'Cuenta actualizada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCategoriaCuenta = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await cuentasService.updateCategoriaCuenta(id, updateData);
        res.status(200).json({ ok: true, message: 'Cuenta actualizada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCuentaTipoDoc = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await cuentasService.updateCuentaTipoDoc(id, updateData);
        res.status(200).json({ ok: true, message: 'Cuenta actualizada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateBanco = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await cuentasService.updateBanco(id, updateData);
        res.status(200).json({ ok: true, message: 'Cuenta actualizada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCondicionPago = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await cuentasService.updateCondicionPago(id, updateData);
        res.status(200).json({ ok: true, message: 'Cuenta actualizada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCondicionesCondicionPago = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await cuentasService.updateCondicionesCondicionPago(id, updateData);
        res.status(200).json({ ok: true, message: 'Cuenta actualizada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
