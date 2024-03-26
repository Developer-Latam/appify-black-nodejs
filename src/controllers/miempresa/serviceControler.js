import ServiceService from "../../services/miempresa/ServiceService.js";
export const createService = async (req, res) => {
    try {
        const data = req.body;
        const response = await ServiceService.createService(data);
        res.status(200).json({service: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const { idServicio } = req.params;
        const servicio = await ServiceService.getServiceById(idServicio);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.status(200).json(servicio);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getServiceByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await ServiceService.getServiceByUserId(id);
        res.status(200).json({ data: service });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const { idServicio } = req.params;
        const updateData = req.body;
        await ServiceService.updateService(idServicio, updateData);
        res.status(200).json({ ok: true, message: 'Servicio actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { idServicio } = req.params;
        await ServiceService.deleteService(idServicio);
        res.status(200).json({ message: 'Servicio eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};