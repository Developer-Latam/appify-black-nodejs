import anticipoClientesProvService from "../../services/comercial/anticiposClienteProvService.js";

export const createAnticipoCliente = async (req, res) => {
    try {
        const data = req.body;
        const response = await anticipoClientesProvService.createAnticipoCliente(data);
        res.status(200).json({ project: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAnticiposClienteByProyectoId = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const projects = await anticipoClientesProvService.getAnticiposClienteByProyectoId(idProyecto);
        res.status(200).json({ data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateAnticipoCliente = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        await anticipoClientesProvService.updateAnticipoCliente(id, updateData);
        res.status(200).json({ ok: true, message: 'Anticipo actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteAnticipoCliente = async (req, res) => {
    try {
        const { id } = req.params;
        await anticipoClientesProvService.deleteAnticipoCliente(id);
        res.status(200).json({ message: 'Anticipo eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

    
};

export const createAnticipoProveedor = async (req, res) => {
    try {
        const data = req.body;
        const response = await anticipoClientesProvService.createAnticipoProveedor(data);
        res.status(200).json({ project: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAnticiposProveedorByProyectoId = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const projects = await anticipoClientesProvService.getAnticiposProveedorByProyectoId(idProyecto);
        res.status(200).json({ data: projects });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateAnticipoProveedor = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        await anticipoClientesProvService.updateAnticipoProveedor(id, updateData);
        res.status(200).json({ ok: true, message: 'Anticipo actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteAnticipoProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        await anticipoClientesProvService.deleteAnticipoProveedor(id);
        res.status(200).json({ message: 'Anticipo eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};