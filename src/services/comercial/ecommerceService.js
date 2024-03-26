import EcommerceRepository from "../persistence/repositorys/comercial/ecommerceRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
class EcommerceService {
    async createEcommerce(data) {
        const superUserExist = await userRepository.userExistsById(data.user);
        const ecommerceExist = await EcommerceRepository.createEcommerce(data.nombre);
        if(ecommerceExist && superUserExist){
            return { ok: false, message: 'El nombre del E-commerce ya existe!' };
        }
        
        return  EcommerceRepository.createEcommerce({ ...data, id: id });
    }

    async getEcommerceById(id) {
        return EcommerceRepository.findEcommerceById(id);
    }

    async getEcommerceByCategory(userId, nameEcommerce) {
        return EcommerceRepository.findAllEcommerceByCategory(userId, nameEcommerce);
    }

    async getEcommerceByUserId(userId) {
        return EcommerceRepository.findAllEcommerceByUserId(userId);
    }

    async updateEcommerce(id, updateData) {
        return EcommerceRepository.updateEcommerce(id, updateData);
    }

    async deleteEcommerce(id) {
        return EcommerceRepository.deleteEcommerce(id);
    }
}
export default new EcommerceService();