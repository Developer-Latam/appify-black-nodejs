import ordenCompraService from "../../services/operaciones/ordenCompraService.js";
export const createOrdenCompra = async (req, res) => {
    try {
        const data = req.body;
        const response = await ordenCompraService.createOrdenCompra(data);
        res.status(200).json({cliente: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getOrdenCompraById = async (req, res) => {
    try {
        const { id } = req.params;
        const ordencompra = await ordenCompraService.getOrdenCompraById(id);
        if (!ordencompra) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.status(200).json(ordencompra);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getOrdenCompraByUserId = async (req, res) => {
    try {
        const { idUser } = req.params;
        const ordencompra = await ordenCompraService.getOrdenCompraByUserId(idUser);
        res.status(200).json({ data: ordencompra });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateOrdenCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await ordenCompraService.updateOrdenCompra(id, updateData);
        res.status(200).json({ ok: true, message: 'Orden de trabajo actualizada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Esta funcion va a quedar comentada por si la usamos enun futuro pero no se deberian borrar las ordenes de trabajo...o si?
/*
export const deleteOrdenCompra = async (req, res) => {
    try {
        const { id } = req.params;
        await ordenCompraService.deleteOrdenCompra(id);
        res.status(200).json({ message: 'OC eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};*/