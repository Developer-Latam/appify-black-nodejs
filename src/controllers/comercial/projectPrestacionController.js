import projectPrestacionService from "../../services/comercial/projectPrestacionService.js";

export const createProjectPrestacion = async (req, res) => {
    try {
        const data = req.body;
        const response = await projectPrestacionService.createProjectPrestacion(data);
        res.status(200).json({ project: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getProjectPrestacionById = async (req, res) => {
    try {
        const idString = req.params.idProyecto;  // Acceder id.Cosnulta del objeto y llevarlo a int 
        const idProyecto = parseInt(idString, 10);
        const proyectop = await projectPrestacionService.getProjectPrestacionById(idProyecto);
        if (!proyectop) {
            return res.status(404).json({ message: 'Direccion de prestacion no encontrada' });
        }
        res.status(200).json(proyectop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



export const updateProjectPrestacion = async (req, res) => {
    try {
        const idString = req.params.idProyecto;
        const idProyecto = parseInt(idString, 10);
        const updateData = req.body;
        await projectPrestacionService.updateProjectPrestacion(idProyecto, updateData);
        res.status(200).json({ ok: true, message: 'Direccion actualizada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteProjectPrestacion = async (req, res) => {
    try {
        const idString = req.params.idProyecto;
        const idProyecto = parseInt(idString, 10);
        await projectPrestacionService.deleteProjectPrestacion(idProyecto);
        res.status(200).json({ message: 'Direccion eliminada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};