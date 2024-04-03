import itemsProdServProjectService from "../../services/comercial/itemsProdServProyectosService.js";

export const createItemProductProject = async (req, res) => {
    try {
        const data = req.body;
        const response = await itemsProdServProjectService.createItemProductProject(data);
        res.status(200).json({ project: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getProductItemById = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const proyecto = await itemsProdServProjectService.getProductItemById(idProyecto);
        if (!proyecto) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }
        res.status(200).json(proyecto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getProductsItemByprojectId = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const projects = await itemsProdServProjectService.getProductsItemByprojectId(idProyecto);
        res.status(200).json({ data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateProductItem = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const updateData = req.body;
        await itemsProdServProjectService.updateProductItem(idProyecto, updateData);
        res.status(200).json({ ok: true, message: 'Item actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteProductItem = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        await itemsProdServProjectService.deleteProductItem(idProyecto);
        res.status(200).json({ message: 'Item eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Servicios Items

export const createServiceItem = async (req, res) => {
    try {
        const data = req.body;
        const response = await itemsProdServProjectService.createServiceItem(data);
        res.status(200).json({ project: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getServiceItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const proyecto = await itemsProdServProjectService.getServiceItemById(id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }
        res.status(200).json(proyecto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getServiceItemByProjectId = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const projects = await itemsProdServProjectService.getServiceItemByProjectId(idProyecto);
        res.status(200).json({ data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateServiceItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await itemsProdServProjectService.updateServiceItem(id, updateData);
        res.status(200).json({ ok: true, message: 'Item actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteServiceItem = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        await itemsProdServProjectService.deleteServiceItem(idProyecto);
        res.status(200).json({ message: 'Item eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};