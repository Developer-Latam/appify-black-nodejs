import ProductService from "../services/ProductService.js";
export const createProduct = async (req, res) => {
    try {
        const data = req.body;
        const response = await ProductService.createProduct(data);
        res.status(200).json({ message: 'Producto creado!', product: response });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { idProducto } = req.params;
        const product = await ProductService.getProductById(idProducto);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getProductsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await ProductService.getProductsByUserId(id);
        res.status(200).json({ data: products });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { idProducto } = req.params;
        const updateData = req.body;
        await ProductService.updateProduct(idProducto, updateData);
        res.status(200).json({ ok: true, message: 'Producto actualizado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { idProducto } = req.params;
        await ProductService.deleteProduct(idProducto);
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};