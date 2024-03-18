// PriceListController.js

import priceListService from "../services/PriceListService.js";

export const getAllPriceLists = async (req, res, next) => {
    const { userId } = req.params; // Asumiendo que se obtiene el userId de algún middleware de autenticación o similar
    try {
        const lists = await priceListService.getPriceListsByUserId(userId);
        res.status(200).json(lists);
    } catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
}

export const getPriceList = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body; // O de un token JWT, por ejemplo
    try {
        const list = await priceListService.getPriceListByIdAndUserId(id, userId);
        if (!list) {
            return res.status(404).json({ ok: false, message: "Lista de precios no encontrada." });
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
}

export const createPriceList = async (req, res, next) => {
    const { user, nombre, iva } = req.body;
    try {
        const result = await priceListService.createPriceList(user, nombre, iva);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
}

export const updatePriceList = async (req, res, next) => {
    const { id } = req.params;
    const { userId, ...updateFields } = req.body;
    try {
        const result = await priceListService.updatePriceList(id, userId, updateFields);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const deletePriceList = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body; // O de un token JWT, por ejemplo
    try {
        const result = await priceListService.deletePriceList(id, userId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }

    
    
}
export const createPriceListWithProducts = async (req, res, next) => {
    const { user, nombre, iva, productos } = req.body;
    try {
        const result = await priceListService.createPriceListWithProducts(user, nombre, iva, productos);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
}