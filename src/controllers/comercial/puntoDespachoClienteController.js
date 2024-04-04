import puntoDespachoClienteService from "../../services/comercial/puntoDespachoClienteService.js";

export const createPuntoDespacho = async (req, res) => {
    try {
        const data = req.body;
        const response = await puntoDespachoClienteService.createPuntoDespacho(data);
        res.status(200).json({ project: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getPuntoDespachoByClienteId = async (req, res) => {
    try {
        const { idContacto } = req.params;
        const projects = await puntoDespachoClienteService.getPuntoDespachoByClienteId(idContacto);
        res.status(200).json({ data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updatePuntoDespacho = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        await puntoDespachoClienteService.updatePuntoDespacho(id, updateData);
        res.status(200).json({ ok: true, message: 'Punto de despacho actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deletePuntoDespacho = async (req, res) => {
    try {
        const { id } = req.params;
        await puntoDespachoClienteService.deletePuntoDespacho(id);
        res.status(200).json({ message: 'Punto de despacho eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};