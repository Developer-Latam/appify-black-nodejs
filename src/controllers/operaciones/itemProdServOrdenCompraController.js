import itemProdServOrdenCompraService from "../../services/operaciones/itemProdServOrdenCompraService.js";
export const createitemProducto = async (req, res) => {
    try {
        const data = req.body;
        const response = await itemProdServOrdenCompraService.createitemProducto(data);
        res.status(200).json({cliente: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await itemProdServOrdenCompraService.getProductoById(id);
        if (!producto) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }
        res.status(200).json(producto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const createitemServicio = async (req, res) => {
    try {
        const data = req.body;
        const response = await itemProdServOrdenCompraService.createitemServicio(data);
        res.status(200).json({cliente: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getServicioById = async (req, res) => {
    try {
        const { id } = req.params;
        const servicio = await itemProdServOrdenCompraService.getServicioById(id);
        if (!servicio) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }
        res.status(200).json(servicio);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getProdServByOrdenCompraId = async (req, res) => {
    try {
        const { idOrden } = req.params;
        const prodservicios = await itemProdServOrdenCompraService.getProdServByOrdenCompraId(idOrden);
        res.status(200).json({ data: prodservicios });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateItemProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await itemProdServOrdenCompraService.updateItemProducto(id, updateData);
        res.status(200).json({ ok: true, message: 'Item actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Esta funcion va a quedar comentada por si la usamos enun futuro pero no se deberian borrar las ordenes de trabajo...o si?

export const deleteItemProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await itemProdServOrdenCompraService.deleteItemProducto(id);
        res.status(200).json({ message: 'Item eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateItemServicios = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await itemProdServOrdenCompraService.updateItemServicios(id, updateData);
        res.status(200).json({ ok: true, message: 'Item actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Esta funcion va a quedar comentada por si la usamos enun futuro pero no se deberian borrar las ordenes de trabajo...o si?

export const deleteItemServicios = async (req, res) => {
    try {
        const { id } = req.params;
        await itemProdServOrdenCompraService.deleteItemServicios(id);
        res.status(200).json({ message: 'Item eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};