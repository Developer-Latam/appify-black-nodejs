import ProductRepository from "../../persistence/repositorys/miempresa/productRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class ProductService {
    async createProduct(data) {
        const id = idgenerate("product");
        const superUserExist = await userRepository.userExistsById(data.user);
        const productoExist = await ProductRepository.productExistsByName(data.nombre);
        if(productoExist && superUserExist){
            return { ok: false, message: 'Producto ya existente en la empresa' };
        }
        
        return ProductRepository.createProduct({ ...data, id: id });
    }

    async getProductById(id) {
        return ProductRepository.findProductById(id);
    }

    async getProductsByUserId(userId) {
        return ProductRepository.findAllProductsByUserId(userId);
    }

    async updateProduct(id, updateData) {
        return ProductRepository.updateProduct(id, updateData);
    }

    async deleteProduct(id) {
        return ProductRepository.deleteProduct(id);
    }
}
export default new ProductService();