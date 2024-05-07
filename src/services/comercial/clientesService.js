import clientesRepository from "../../persistence/repositorys/comercial/clientesRepository.js";
import contactoClienteRepository from "../../persistence/repositorys/comercial/contactoClienteRepository.js";
import puntoDespachoClienteRepository from "../../persistence/repositorys/comercial/puntoDespachoClienteRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import contactoClienteService from "./contactoClienteService.js";
import puntoDespachoClienteService from "./puntoDespachoClienteService.js";
class ClientesService {
    async createCliente(data) {
        try {
            const id = idgenerate("cliente");
            const superUserExist = await userRepository.userExistsById(data.user);
            const clienteExist = await clientesRepository.clienteExistsByName(data.razon_social);
            
            if (clienteExist && superUserExist) {
                throw new CustomError(400, "Bad Request", 'El nombre del cliente ya existe!')
            }
            const contactoData = data.contactos || []; // Manejamos el caso de que no haya contactos
            const puntoDespachoData = data.puntos_de_despacho || []; // Manejamos el caso de que no haya puntos de despacho
            const clienteData = { ...data, id: id };
            delete clienteData.contactos
            delete clienteData.puntos_de_despacho
            
    
            // Crear el cliente
            const cliente = await clientesRepository.createCliente(clienteData);
    
            // Crear los contactos
            const contactosPromises = contactoData.map(async (contacto) => {
                const contactoId = idgenerate("contacto-cliente");
                await contactoClienteRepository.createContacto({ ...contacto, cliente: cliente.id, id: contactoId });
            });
            const contactos = await Promise.all(contactosPromises);
    
            // Crear los puntos de despacho
            const puntosDespachoPromises = puntoDespachoData.map(async (puntoDespacho) => {
                const puntoDespachoId = idgenerate("punto-despacho");
                await puntoDespachoClienteRepository.createPuntoDespacho({ ...puntoDespacho, cliente: cliente.id, id: puntoDespachoId });
            });
            const puntosDespacho = await Promise.all(puntosDespachoPromises);
    
            return {cliente, contactos, puntosDespacho};
        } catch (error) {
            throw error;
        }
    }
    
    async getClienteById(id) {
        try {
            const cliente = await clientesRepository.findClienteById(id);
            const contactos = await contactoClienteService.getContactosByClienteId(id)
                

            const puntosDespacho = await puntoDespachoClienteService.getPuntoDespachoByClienteId(id)
        return {cliente: cliente, contactos : contactos, puntos : puntosDespacho}
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


    async getAllDataClienteByUserId(userId) {
        try {
            const clientes = await clientesRepository.findAllClientesByUserId(userId);

            const clientesAll = [];
            

            for (const cliente of clientes ) {

                const contactos = await contactoClienteService.getContactosByClienteId(cliente.id)
                

                const puntosDespacho = await puntoDespachoClienteService.getPuntoDespachoByClienteId(cliente.id)

                clientesAll.push({cliente: cliente, contactos : contactos, punto_despacho_cliente: puntosDespacho})
            }

            return clientesAll;

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