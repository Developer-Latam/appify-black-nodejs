import ProductRepository from "../../persistence/repositorys/miempresa/productRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class ProductService {
    async createProduct(data) {
        try {
            const id = idgenerate("product");
            const superUserExist = await userRepository.userExistsById(data.user);
            const productoExist = await ProductRepository.productExistsByName(data.nombre);
            if(productoExist && superUserExist){
                throw new CustomError(400, "Bad Request",'Producto ya existente en la empresa')
            }
            return ProductRepository.createProduct({ ...data, id: id });
        } catch (error) {
            throw error;
        }
    }
    async getProductById(id) {
        try {
            return ProductRepository.findProductById(id);
        } catch (error) {
            throw error;
        }
    }
    async getProductsByUserId(userId) {
        try {
            return ProductRepository.findAllProductsByUserId(userId);
        } catch (error) {
            throw error;
        }
    }
    async updateProduct(id, updateData) {
        try {
            return ProductRepository.updateProduct(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            return ProductRepository.deleteProduct(id);
        } catch (error) {
            throw error;
        }
    }
}
export default new ProductService();