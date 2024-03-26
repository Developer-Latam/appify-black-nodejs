import clientesService from "../services/clientesService.js";
export const createCliente = async (req, res) => {
    try {
        const data = req.body;
        const response = await clientesService.createCliente(data);
        res.status(200).json({cliente: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getClienteById = async (req, res) => {
    try {
        const { idCliente } = req.params;
        const cliente = await clientesService.getClienteById(idCliente);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getClienteByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clientesService.getClienteByUserId(id);
        res.status(200).json({ data: cliente });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCliente = async (req, res) => {
    try {
        const { idCliente } = req.params;
        const updateData = req.body;
        await clientesService.updateCliente(idCliente, updateData);
        res.status(200).json({ ok: true, message: 'Cliente actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        const { idCliente } = req.params;
        await clientesService.deleteCliente(idCliente);
        res.status(200).json({ message: 'Cliente eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};