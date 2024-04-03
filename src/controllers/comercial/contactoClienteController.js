import contactoClienteService from "../../services/comercial/contactoClienteService.js";

export const createContacto = async (req, res) => {
    try {
        const data = req.body;
        const response = await contactoClienteService.createContacto(data);
        res.status(200).json({ project: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getContactosByClienteId = async (req, res) => {
    try {
        const { idContacto } = req.params;
        const projects = await contactoClienteService.getContactosByClienteId(idContacto);
        res.status(200).json({ data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateContacto = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        await contactoClienteService.updateContacto(id, updateData);
        res.status(200).json({ ok: true, message: 'Contacto actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteContacto = async (req, res) => {
    try {
        const { id } = req.params;
        await contactoClienteService.deleteContacto(id);
        res.status(200).json({ message: 'Contacto eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};