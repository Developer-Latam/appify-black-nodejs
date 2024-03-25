import PriceListRepository from "../persistence/repositorys/PriceListRepository.js";
import { idgenerate } from "../utils/id/idGenerate.js";

class PriceListService {
    async getPriceListsByUserId(userId) {
        return await PriceListRepository.findAllByUserId(userId);
    }

    async getPriceListByIdAndUserId(id, userId) {
        return await PriceListRepository.findByIdAndUserId(id, userId);
    }

    async createPriceList(user, nombre, iva) {
        const id = idgenerate("price-list");
        await PriceListRepository.createPriceList({ id, user, nombre, iva });
        return { ok: true, message: 'Lista de precios creada exitosamente.' };
    }

    async updatePriceList(id, userId, updateFields) {
        const existingList = await this.getPriceListByIdAndUserId(id, userId);
        if (!existingList) {
        throw new Error('Lista de precios no encontrada');
        }
        await PriceListRepository.updatePriceList(id, updateFields);
        return { success: true, message: 'Lista de precios actualizada correctamente' };
    }

    async deletePriceList(id, userId) {
        const existingList = await this.getPriceListByIdAndUserId(id, userId);
        if (!existingList) {
            throw new Error('Lista de precios no encontrada');
        }
        await PriceListRepository.deletePriceList(id);
        return { success: true, message: 'Lista de precios eliminada correctamente' };
    }
}

export default new PriceListService();
