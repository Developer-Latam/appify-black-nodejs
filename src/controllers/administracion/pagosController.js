import pagosService from "../../services/administracion/pagosService.js";



export const createPagosAll = async (req, res) => {
    try {
        const data = req.body;
        const response = await pagosService.createPagosAll(data);
        res.status(200).json({pagos: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getPagosAllById = async (req, res) => {
    try {
        const { id } = req.params;
        const pago = await pagosService.getPagosAllById(id);
        res.status(200).json(pago);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const getAllPagosByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const pagos = await pagosService.getPagosByUserId(id);
        res.status(200).json({ data: pagos });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updatePago = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await pagosService.updatePagos(id, updateData);
        res.status(200).json({ ok: true, message: 'Pago actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updatePagoFC = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await pagosService.updatePagoFC(id, updateData);
        res.status(200).json({ ok: true, message: 'Pago actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



export const updatePagoNC = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await pagosService.updatePagoNC(id, updateData);
        res.status(200).json({ ok: true, message: 'Pago actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const deletePagoFC = async (req, res) => {
    try {
        const { id } = req.params;
        await pagosService.deletePagoFC(id);
        res.status(200).json({ message: 'Pago de factura de compra eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



export const deletePagoNC = async (req, res) => {
    try {
        const { id } = req.params;
        await pagosService.deletePagoNC(id);
        res.status(200).json({ message: 'Pago de nota de credito eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};