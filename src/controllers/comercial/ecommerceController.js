import EcommerceService from "../../services/comercial/ecommerceService.js";
export const createEcommerce = async (req, res) => {
    try {
        const data = req.body;
        const response = await EcommerceService.createEcommerce(data);
        res.status(200).json({ecommerce: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getEcommerceById = async (req, res) => {
    try {
        const idString = req.params.idEcommerce;  // Acceder id.Ecommerce del objeto y llevarlo a int 
        const idEcommerce = parseInt(idString, 10);
        const ecommerce = await EcommerceService.getEcommerceById(idEcommerce);
        if (!ecommerce) {
            return res.status(404).json({ message: 'E-commerce no encontrado' });
        }
        res.status(200).json(ecommerce);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getEcommerceByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const ecommerce = await EcommerceService.getEcommerceByUserId(id);
        res.status(200).json({ data: ecommerce });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getEcommerceByCategoryId = async (req, res) => {
    try {
        const { idUser } = req.params; // Brindando id de user y en el body la categoria buscada
        const data = req.body;
        const ecommerce = await EcommerceService.getEcommerceByCategory(idUser,data.categoria);
        res.status(200).json({ data: ecommerce });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateEcommerce = async (req, res) => {
    try {
        const idString = req.params.idEcommerce;  // Acceder id.Ecommerce del objeto y llevarlo a int 
        const idEcommerce = parseInt(idString, 10);
        const updateData = req.body;
        await EcommerceService.updateEcommerce(idEcommerce, updateData);
        res.status(200).json({ ok: true, message: 'E-commerce actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteEcommerce = async (req, res) => {
    try {
        const idString = req.params.idEcommerce;  // Acceder id.Ecommerce del objeto y llevarlo a int 
        const idEcommerce = parseInt(idString, 10);
        await EcommerceService.deleteEcommerce(idEcommerce);
        res.status(200).json({ message: 'E-commerce eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};