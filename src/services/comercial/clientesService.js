import clientesRepository from "../../persistence/repositorys/comercial/clientesRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class ClientesService {
    async createCliente(data) {
        try {
            const id = idgenerate("cliente");
            const superUserExist = await userRepository.userExistsById(data.user);
            const clienteExist = await clientesRepository.clienteExistsByName(data.razon_social);
            if(clienteExist && superUserExist){
                throw new CustomError(400, "Bad Request", 'El nombre del cliente ya existe!')
            }
            return  clientesRepository.createCliente({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async getClienteById(id) {
        try {
            return clientesRepository.findClienteById(id);
        } catch (error) {
            throw error
        }
    }
    async getClienteByUserId(userId) {
        try {
            return clientesRepository.findAllClientesByUserId(userId);
        } catch (error) {
            throw error
        }
    }
    async updateCliente(id, updateData) {
        try {
            return clientesRepository.updateCliente(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deleteCliente(id) {
        try {
            return clientesRepository.deleteCliente(id);
        } catch (error) {
            throw error
        }
    }
}
export default new ClientesService();