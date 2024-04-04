import puntoDespachoClienteRepository from "../../persistence/repositorys/comercial/puntoDespachoClienteRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";

class puntoDespachoClienteService {
    async createPuntoDespacho(data) {
        const id = idgenerate("punto-despacho");
        return puntoDespachoClienteRepository.createPuntoDespacho({ ...data, id: id });
    }

    async getPuntoDespachoByClienteId(clienteId) {
        return puntoDespachoClienteRepository.findAllPuntosDespachoByClienteId(clienteId);
    }

    async updatePuntoDespacho(id, updateData) {
        return puntoDespachoClienteRepository.updatePuntoDespacho(id, updateData);
    }

    async deletePuntoDespacho(id) {
        return puntoDespachoClienteRepository.deletePuntoDespacho(id);
    }

}
export default new puntoDespachoClienteService();