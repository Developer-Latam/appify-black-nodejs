import clientesRepository from "../persistence/repositorys/comercial/clientesRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class ClientesService {
    async createCliente(data) {
        const id = idgenerate("cliente");
        const superUserExist = await userRepository.userExistsById(data.user);
        const clienteExist = await clientesRepository.clienteExistsByName(data.razon_social);
        if(clienteExist && superUserExist){
            return { ok: false, message: 'El nombre del cliente ya existe!' };
        }
        
        return  clientesRepository.createCliente({ ...data, id: id });
    }

    async getClienteById(id) {
        return clientesRepository.findClienteById(id);
    }

    async getClienteByUserId(userId) {
        return clientesRepository.findAllClientesByUserId(userId);
    }

    async updateCliente(id, updateData) {
        return clientesRepository.updateCliente(id, updateData);
    }

    async deleteCliente(id) {
        return clientesRepository.deleteCliente(id);
    }
}
export default new ClientesService();