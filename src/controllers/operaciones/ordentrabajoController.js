import ordenTrabajoService from "../../services/operaciones/ordentrabajoService.js";
export const createOrdenTrabajo = async (req, res) => {
    try {
        const data = req.body;
        const response = await ordenTrabajoService.createOrdenTrabajo(data);
        res.status(200).json({cliente: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getOrdenTrabajoById = async (req, res) => {
    try {
        const { id } = req.params;
        const ordentrabajo = await ordenTrabajoService.getOrdenTrabajoById(id);
        if (!ordentrabajo) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.status(200).json(ordentrabajo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getOrdenTrabajoByUserId = async (req, res) => {
    try {
        const { idUser } = req.params;
        const ordentrabajo = await ordenTrabajoService.getOrdenTrabajoByUserId(idUser);
        res.status(200).json({ data: ordentrabajo });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateOrdenTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await ordenTrabajoService.updateOrdenTrabajo(id, updateData);
        res.status(200).json({ ok: true, message: 'Orden de trabajo actualizada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Esta funcion va a quedar comentada por si la usamos enun futuro pero no se deberian borrar las ordenes de trabajo...o si?

export const deleteOrdenTrabajo = async (req, res) => {
    try {
        const { idCliente } = req.params;
        await ordenTrabajoService.deleteOrdenTrabajo(idCliente);
        res.status(200).json({ message: 'Cliente eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};