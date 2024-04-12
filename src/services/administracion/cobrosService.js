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
            } else if (data.cobros_factura_nota_credito) {
                cobroFunction = this.createCobroNC;
            } else {
                throw new Error('Tipo de cobro no válido en los datos recibidos');
            }
    
            // Llamar a la función correspondiente para crear el registro de cobro de factura
            const cobroFV = await cobroFunction(data);
    
            // Devolver ambos registros como un arreglo
            return [cobroFV];
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

            // Extraer datos del objeto data
            const { cobros, cobros_factura_venta } = data;
    
            // Crear el registro de cobro
            const cobro = await cobrosRepository.createCobros({ ...cobros, id: cobroId });
    
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroFVData = { ...cobros_factura_venta, id: cobroFVId, idCobro: cobroId };
    
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

            // Extraer datos del objeto data
            const { cobros, cobros_factura_venta_excenta } = data;
    
            // Crear el registro de cobro
            const cobro = await cobrosRepository.createCobros({ ...cobros, id: cobroId });
    
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroFVEData = { ...cobros_factura_venta_excenta, id: cobroFVEId, idCobro: cobroId };
    
            // Crear el registro de cobro de factura de venta
            const cobroFVE = await cobrosRepository.createCobrosFVE(cobroFVEData);
    
            // Devolver ambos registros como un arreglo
            return [cobro, cobroFVE];
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

            // Extraer datos del objeto data
            const { cobros, cobros_factura_nota_credito } = data;
    
            // Crear el registro de cobro
            const cobro = await cobrosRepository.createCobros({ ...cobros, id: cobroId });
    
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroNCData = { ...cobros_factura_nota_credito, id: cobroNCId, idCobro: cobroId };
    
            // Crear el registro de cobro de factura de venta
            const cobroNC = await cobrosRepository.createCobrosNC(cobroNCData);
    
            // Devolver ambos registros como un arreglo
            return [cobro, cobroNC];
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir
            console.error("Error al crear cobro y cobro de factura de venta:", error);
            throw error; // Relanzar el error para que pueda ser manejado por el código que llama a esta función
        }
    }

    async getCobrosAllById(id) {
        const functionsToTry = [
            this.getCobroFVById,
            this.getCobroFVEById,
            this.getCobroNCById
        ];
    
        for (const func of functionsToTry) {
            try {
                const result = await func(id);
                // Si la función no arroja error y devuelve algo, retornamos el resultado
                return result;
            } catch (error) {
                // Si hay un error, continuamos con la siguiente función
                console.error(`Error al intentar ejecutar la función ${func.name}:`, error.message);
            }
        }
    
        // Si ninguna función devuelve nada sin error, lanzamos una excepción
        throw new Error('No se encontró ningún cobro para el ID proporcionado');
    }

    async getCobroFVById(id) {
        try {
            // Buscar el cobro
            const cobro = await cobrosRepository.findCobroById(id);
    
            if (!cobro) {
                throw new Error(`No se encontró ningún cobro con el ID ${id}`);
            }
    
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const cobroFV = await cobrosRepository.findCobroFVByCobroId(id);
    
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
            const cobroFVE = await cobrosRepository.findCobroFVEByCobroId(id);
    
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
            const cobroNC = await cobrosRepository.findCobroNCByCobroId(id);
    
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
            const cobro = await cobrosRepository.findCobroFVByCobroId(id);
            if (!cobro) {
                throw new Error(`No se encontró ningún cobro de factura de venta con el ID ${id}`);
            }
            console.log(cobro.id);
            const delCobroFV = await cobrosRepository.deleteCobroFVByCobroId(cobro.id);
            const delCobro = await cobrosRepository.deleteCobro(id);
            
            return [delCobro, delCobroFV];
        } catch (error) {
            console.error("Error al eliminar el cobro y cobro de factura de venta:", error.message);
            throw error;
        }
    }

    async deleteCobroFVE(id) {
        try {
            const cobro = await cobrosRepository.findCobroFVEByCobroId(id);
            if (!cobro) {
                throw new Error(`No se encontró ningún cobro de factura de venta con el ID ${id}`);
            }
            console.log(cobro.id);
            const delCobroFV = await cobrosRepository.deleteCobroFVEByCobroId(cobro.id);
            const delCobro = await cobrosRepository.deleteCobro(id);
            
            return [delCobro, delCobroFV];
        } catch (error) {
            console.error("Error al eliminar el cobro y cobro de factura de venta:", error.message);
            throw error;
        }
    }


    async deleteCobroNC(id) {
        try {
            const cobro = await cobrosRepository.findCobroNCByCobroId(id);
            if (!cobro) {
                throw new Error(`No se encontró ningún cobro de factura de venta con el ID ${id}`);
            }
            console.log(cobro.id);
            const delCobroFV = await cobrosRepository.deleteCobroNCByCobroId(cobro.id);
            const delCobro = await cobrosRepository.deleteCobro(id);
            
            return [delCobro, delCobroFV];
        } catch (error) {
            console.error("Error al eliminar el cobro y cobro de factura de venta:", error.message);
            throw error;
        }
    }





}


export default new cobrosService()