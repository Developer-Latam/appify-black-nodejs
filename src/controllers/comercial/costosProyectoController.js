import costosProyectoService from "../../services/comercial/costosProyectoService.js";

export const createCosto = async (req, res) => {
    try {
        const data = req.body;
        const response = await costosProyectoService.createCosto(data);
        res.status(200).json({ project: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getCostosByProyectoId = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const projects = await costosProyectoService.getCostosByProyectoId(idProyecto);
        res.status(200).json({ data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCosto = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        await costosProyectoService.updateCosto(id, updateData);
        res.status(200).json({ ok: true, message: 'Costo actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteCosto = async (req, res) => {
    try {
        const { id } = req.params;
        await costosProyectoService.deleteCosto(id);
        res.status(200).json({ message: 'Costo eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};