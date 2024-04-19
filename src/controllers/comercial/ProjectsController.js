import ProjectService from "../../services/comercial/ProjectService.js";

export const createProjectAll = async (req, res) => {
    try {
        const data = req.body;
        const response = await ProjectService.createProjectAll(data);
        res.status(200).json({ project: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const proyecto = await ProjectService.getProjectById(idProyecto);
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(200).json(proyecto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getProjectsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const projects = await ProjectService.getProjectsByUserId(id);
        res.status(200).json({ data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const updateData = req.body;
        await ProjectService.updateProject(idProyecto, updateData);
        res.status(200).json({ ok: true, message: 'Proyecto actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        await ProjectService.deleteProject(idProyecto);
        res.status(200).json({ message: 'Proyecto eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};