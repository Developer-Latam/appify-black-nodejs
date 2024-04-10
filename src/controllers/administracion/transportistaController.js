import transportistaService from "../../services/administracion/transportistaService.js";


export const createTransportista = async (req, res) => {
    try {
        const data = req.body;
        const response = await transportistaService.createTransportista(data);
        res.status(200).json({transportista: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getTransportistaById = async (req, res) => {
    try {
        const { idTransportista } = req.params;
        const transportista = await transportistaService.getTransportistaById(idTransportista);
        if (!transportista) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(transportista);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getTransportistaByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const transportista = await transportistaService.getTransportistaByUserId(id);
        res.status(200).json({ data: transportista });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateTransportista = async (req, res) => {
    try {
        const { idTransportista } = req.params;
        const updateData = req.body;
        await transportistaService.updateTransportista(idTransportista, updateData);
        res.status(200).json({ ok: true, message: 'Transportista actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteTransportista = async (req, res) => {
    try {
        const { idTransportista } = req.params;
        await transportistaService.deleteTransportista(idTransportista);
        res.status(200).json({ message: 'Transportista eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};