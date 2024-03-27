import ProjectAgendamientoService from "../../services/comercial/projectAgendamientoService.js";

export const createProjectAgendamiento = async (req, res) => {
    try {
        const data = req.body;
        const response = await ProjectAgendamientoService.createProjectAgendamiento(data);
        res.status(200).json({ project: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getProjectAgendamientoById = async (req, res) => {
    try {
        const idString = req.params.idProyecto;  // Acceder id.Cosnulta del objeto y llevarlo a int 
        const idProyecto = parseInt(idString, 10);
        const proyectoa = await ProjectAgendamientoService.getProjectAgendamientoById(idProyecto);
        if (!proyectoa) {
            return res.status(404).json({ message: 'Agendamiento no encontrado' });
        }
        res.status(200).json(proyectoa);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



export const updateProjectAgendamiento = async (req, res) => {
    try {
        const idString = req.params.idProyecto;
        const idProyecto = parseInt(idString, 10);
        const updateData = req.body;
        await ProjectAgendamientoService.updateProjectAgendamiento(idProyecto, updateData);
        res.status(200).json({ ok: true, message: 'Agendamiento actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteProjectAgendamiento = async (req, res) => {
    try {
        const idString = req.params.idProyecto;
        const idProyecto = parseInt(idString, 10);
        await ProjectAgendamientoService.deleteProjectAgendamiento(idProyecto);
        res.status(200).json({ message: 'Agendamiento eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};