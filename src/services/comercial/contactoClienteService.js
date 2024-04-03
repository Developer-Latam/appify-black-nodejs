import contactoClienteRepository from "../../persistence/repositorys/comercial/contactoClienteRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";

class contactoClienteService {
    async createContacto(data) {
        const id = idgenerate("contacto-cliente");
        return contactoClienteRepository.createContacto({ ...data, id: id });
    }

    async getContactosByClienteId(clienteId) {
        return contactoClienteRepository.findAllContactosByClienteId(clienteId);
    }

    async updateContacto(id, updateData) {
        return contactoClienteRepository.updateContacto(id, updateData);
    }

    async deleteContacto(id) {
        return contactoClienteRepository.deleteContacto(id);
    }

}
export default new contactoClienteService();