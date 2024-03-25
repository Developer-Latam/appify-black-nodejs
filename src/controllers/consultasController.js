import ConsultaService from "../services/ConsultaService.js";

export const createConsulta = async (req, res) => {
    try {
        const data = req.body;
        const response = await ConsultaService.createConsulta(data);
        res.status(200).json({ project: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const getConsultasByUserId = async (req, res) => {
    try {
        const { id } = req.params
        const consultas = await ConsultaService.getConsultasByUserId(id);
        res.status(200).json({ data: consultas });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateConsulta = async (req, res) => {
    try {
        const idString = req.params.idConsulta;  // Acceder id.Cosnulta del objeto y llevarlo a int 
        const idConsulta = parseInt(idString, 10);
        console.log(typeof idConsulta)
        const updateData = req.body;
        await ConsultaService.updateConsulta(idConsulta, updateData); 
        res.status(200).json({ ok: true, message: 'Consulta actualizada' }); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteConsulta = async (req, res) => {
    try {
        const idString = req.params.idConsulta; // Acceder id.Cosnulta del objeto y llevarlo a int 
        const idConsulta = parseInt(idString, 10);
        console.log(typeof idConsulta)
        console.log(idConsulta);
        await ConsultaService.deleteConsulta(idConsulta);
        res.status(200).json({ message: 'Consulta eliminada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};