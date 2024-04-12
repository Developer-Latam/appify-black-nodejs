import cobrosService from "../../services/administracion/cobrosService.js";



export const createCobrosAll = async (req, res) => {
    try {
        const data = req.body;
        const response = await cobrosService.createCobrosAll(data);
        res.status(200).json({cobros: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getCobrosAllById = async (req, res) => {
    try {
        const { id } = req.params;
        const cobro = await cobrosService.getCobrosAllById(id);
        res.status(200).json(cobro);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const getAllCobrosByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const cobros = await cobrosService.getCobrosByUserId(id);
        res.status(200).json({ data: cobros });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCobro = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await cobrosService.updateCobro(id, updateData);
        res.status(200).json({ ok: true, message: 'Cobro actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCobroFV = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await cobrosService.updateCobroFV(id, updateData);
        res.status(200).json({ ok: true, message: 'Cobro actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCobroFVE = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await cobrosService.updateCobroFVE(id, updateData);
        res.status(200).json({ ok: true, message: 'Cobro actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCobroNC = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await cobrosService.updateCobroNC(id, updateData);
        res.status(200).json({ ok: true, message: 'Cobro actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const deleteCobroFV = async (req, res) => {
    try {
        const { id } = req.params;
        await cobrosService.deleteCobroFV(id);
        res.status(200).json({ message: 'Cobro de factura de venta eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteCobroFVE = async (req, res) => {
    try {
        const { id } = req.params;
        await cobrosService.deleteCobroFVE(id);
        res.status(200).json({ message: 'Cobro de factura de venta excenta eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteCobroNC = async (req, res) => {
    try {
        const { id } = req.params;
        await cobrosService.deleteCobroNC(id);
        res.status(200).json({ message: 'Cobro de nota de credito eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};