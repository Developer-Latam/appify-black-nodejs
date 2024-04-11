import cobrosRepository from "../../persistence/repositorys/administracion/cobrosRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";

class cobrosService {

    async createCobrosAll(data) {
        try {
            let cobroFunction;
    
            if (data.cobros_factura_venta) {
                cobroFunction = this.createCobroFV;
            } else if (data.cobros_factura_venta_excenta) {
                cobroFunction = this.createCobroFVE;
            } else if (data.cobros_factura_venta_nota_credito) {
                cobroFunction = this.createCobroNC;
            } else {
                throw new Error('Tipo de cobro no válido en los datos recibidos');
            }
    
            // Crear el registro de cobro
            const cobro = await cobrosRepository.createCobros(data.cobros);
    
            // Llamar a la función correspondiente para crear el registro de cobro de factura
            const cobroFV = await cobroFunction(data);
    
            // Devolver ambos registros como un arreglo
            return [cobro, cobroFV];
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir
            console.error("Error al crear cobro y cobro de factura de venta/ venta excenta / nota de credito:", error);
            throw error; // Relanzar el error para que pueda ser manejado por el código que llama a esta función
        }
    }

    async createCobroFV(data) {
        try {
            // Generar IDs para el cobro y el cobro de factura de venta
            const cobroId = idgenerate("Cobro");
            const cobroFVId = idgenerate("Cobro-FV");
    
            // Crear el registro de cobro
            const cobro = await cobrosRepository.createCobros({ ...data, id: cobroId });
    
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroFVData = { ...data, id: cobroFVId, idCobro: cobroId };
    
            // Crear el registro de cobro de factura de venta
            const cobroFV = await cobrosRepository.createCobrosFV(cobroFVData);
    
            // Devolver ambos registros como un arreglo
            return [cobro, cobroFV];
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir
            console.error("Error al crear cobro y cobro de factura de venta:", error);
            throw error; // Relanzar el error para que pueda ser manejado por el código que llama a esta función
        }
    }

    async createCobroFVE(data) {
        try {
            // Generar IDs para el cobro y el cobro de factura de venta
            const cobroId = idgenerate("Cobro");
            const cobroFVEId = idgenerate("Cobro-FVE");
    
            // Crear el registro de cobro
            const cobro = await cobrosRepository.createCobros({ ...data, id: cobroId });
    
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroFVEData = { ...data, id: cobroFVEId, idCobro: cobroId };
    
            // Crear el registro de cobro de factura de venta
            const cobroFV = await cobrosRepository.createCobrosFVE(cobroFVEData);
    
            // Devolver ambos registros como un arreglo
            return [cobro, cobroFV];
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir
            console.error("Error al crear cobro y cobro de factura de venta:", error);
            throw error; // Relanzar el error para que pueda ser manejado por el código que llama a esta función
        }
    }

    async createCobroNC(data) {
        try {
            // Generar IDs para el cobro y el cobro de factura de venta
            const cobroId = idgenerate("Cobro");
            const cobroNCId = idgenerate("Cobro-NC");
    
            // Crear el registro de cobro
            const cobro = await cobrosRepository.createCobros({ ...data, id: cobroId });
    
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroNCData = { ...data, id: cobroNCId, idCobro: cobroId };
    
            // Crear el registro de cobro de factura de venta
            const cobroNC = await cobrosRepository.createCobrosFVE(cobroNCData);
    
            // Devolver ambos registros como un arreglo
            return [cobro, cobroNC];
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir
            console.error("Error al crear cobro y cobro de factura de venta:", error);
            throw error; // Relanzar el error para que pueda ser manejado por el código que llama a esta función
        }
    }

    async getCobrosAllById(id, data) {
        try {
            let getCobroFunction;
    
            if (data.cobros_factura_venta) {
                getCobroFunction = this.getCobroFVById;
            } else if (data.cobros_factura_venta_excenta) {
                getCobroFunction = this.getCobroFVEById;
            } else if (data.cobros_factura_venta_nota_credito) {
                getCobroFunction = this.getCobroNCById;
            } else {
                throw new Error('Tipo de cobro no válido en los datos recibidos');
            }
    
            // Llamar a la función correspondiente para obtener los datos del cobro
            const result = await getCobroFunction(id);
    
            // Devolver los resultados obtenidos
            return result;
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir
            console.error("Error al buscar el cobro y cobro de factura de venta:", error.message);
            throw error; // Relanzar el error para que pueda ser manejado por el código que llama a esta función
        }
    }

    async getCobroFVById(id) {
        try {
            // Buscar el cobro
            const cobro = await cobrosRepository.findCobroById(id);
    
            if (!cobro) {
                throw new Error(`No se encontró ningún cobro con el ID ${id}`);
            }
    
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const cobroFV = await cobrosRepository.findCobroFVByCobroId(cobro.id);
    
            if (!cobroFV) {
                throw new Error(`No se encontró ningún cobro de factura de venta para el cobro con ID ${id}`);
            }
    
            // Devolver un objeto que contiene ambos resultados
            return { cobro, cobroFV };
        } catch (error) {
            console.error("Error al buscar el cobro y cobro de factura de venta:", error.message);
            throw error;
        }
    }

    async getCobroFVEById(id) {
        try {
            // Buscar el cobro
            const cobro = await cobrosRepository.findCobroById(id);
    
            if (!cobro) {
                throw new Error(`No se encontró ningún cobro con el ID ${id}`);
            }
    
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const cobroFVE = await cobrosRepository.findCobroFVEByCobroId(cobro.id);
    
            if (!cobroFVE) {
                throw new Error(`No se encontró ningún cobro de factura de venta excenta para el cobro con ID ${id}`);
            }
    
            // Devolver un objeto que contiene ambos resultados
            return { cobro, cobroFVE };
        } catch (error) {
            console.error("Error al buscar el cobro y cobro de factura de venta excenta:", error.message);
            throw error;
        }
    }

    async getCobroNCById(id) {
        try {
            // Buscar el cobro
            const cobro = await cobrosRepository.findCobroById(id);
    
            if (!cobro) {
                throw new Error(`No se encontró ningún cobro con el ID ${id}`);
            }
    
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const cobroNC = await cobrosRepository.findCobroNCByCobroId(cobro.id);
    
            if (!cobroNC) {
                throw new Error(`No se encontró ningún cobro de nota de credito para el cobro con ID ${id}`);
            }
    
            // Devolver un objeto que contiene ambos resultados
            return { cobro, cobroNC };
        } catch (error) {
            console.error("Error al buscar el cobro y cobro de nota de credito:", error.message);
            throw error;
        }
    }

    async getCobrosByUserId(userId) {
        return cobrosRepository.findAllCobrosByUserId(userId);
    }

    async updateCobro(id, updateData) {
        return cobrosRepository.updateCobro(id, updateData);
    }

    async updateCobroFV(id, updateData) {
        return cobrosRepository.updateCobroFV(id, updateData);
    }

    async updateCobroFVE(id, updateData) {
        return cobrosRepository.updateCobroFVE(id, updateData);
    }

    async updateCobroNC(id, updateData) {
        return cobrosRepository.updateCobroNC(id, updateData);
    }



    async deleteCobroFV(id) {
        try {
            const delCobro = await cobrosRepository.deleteCobro(id);
            const delCobroFV = await cobrosRepository.deleteCobroFVByCobroId(id);
            
            return [delCobro, delCobroFV];
        } catch (error) {
            console.error("Error al eliminar el cobro y cobro de factura de venta:", error.message);
            throw error;
        }
    }

    async deleteCobroFVE(id) {
        try {
            const delCobro = await cobrosRepository.deleteCobro(id);
            const delCobroFVE = await cobrosRepository.deleteCobroFVEByCobroId(id);
            
            return [delCobro, delCobroFVE];
        } catch (error) {
            console.error("Error al eliminar el cobro y cobro de factura de venta excenta:", error.message);
            throw error;
        }
    }

    async deleteCobroNC(id) {
        try {
            const delCobro = await cobrosRepository.deleteCobro(id);
            const delCobroFV = await cobrosRepository.deleteCobroNCByCobroId(id);
            
            return [delCobro, delCobroFV];
        } catch (error) {
            console.error("Error al eliminar el cobro y cobro de nota de credito:", error.message);
            throw error;
        }
    }




}


export default new cobrosService()