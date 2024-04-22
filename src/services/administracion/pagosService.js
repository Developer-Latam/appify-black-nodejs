import pagosRepository from "../../persistence/repositorys/administracion/pagosRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";

class pagosService {

    async createPagosAll(data) {
        try {
            let pagoFunction;
    
            if (data.pagos_factura_compra) {
                pagoFunction = this.createPagosFC;
            } else if (data.pagos_factura_nota_credito) {
                pagoFunction = this.createPagosNC;
            } else {
                throw new Error('Tipo de pago no válido en los datos recibidos');
            }
    
            // Llamar a la función correspondiente para crear el registro de cobro de factura
            const pagosFC = await pagoFunction(data);
    
            // Devolver ambos registros como un arreglo
            return [pagosFC];
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir
            console.error("Error al crear pago y pago de factura de compra/ nota de credito:", error);
            throw error; // Relanzar el error para que pueda ser manejado por el código que llama a esta función
        }
    }
    

    async createPagosFC(data) {
        try {
            // Generar IDs para el cobro y el cobro de factura de venta
            const pagoId = idgenerate("Pago");
            const pagoFCId = idgenerate("Pago-FC");

            // Extraer datos del objeto data
            const { pagos, pagos_factura_compra } = data;
    
            // Crear el registro de cobro
            const pago = await pagosRepository.createPagos({ ...pagos, id: pagoId });
    
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroFCData = { ...pagos_factura_compra, id: pagoFCId, idPago: pagoId };
    
            // Crear el registro de cobro de factura de venta
            const pagoFC = await pagosRepository.createPagosFC(cobroFCData);
    
            // Devolver ambos registros como un arreglo
            return [pago, pagoFC];
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir
            console.error("Error al crear pago y pago de factura de compra:", error);
            throw error; // Relanzar el error para que pueda ser manejado por el código que llama a esta función
        }
    }

    

    async createPagosNC(data) {
        try {
            // Generar IDs para el cobro y el cobro de factura de venta
            const pagoId = idgenerate("Pago");
            const pagoNCId = idgenerate("Pago-NC");

            // Extraer datos del objeto data
            const { pagos, pagos_factura_nota_credito } = data;
    
            // Crear el registro de cobro
            const pago = await pagosRepository.createPagos({ ...pagos, id: pagoId });
    
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const pagoNCData = { ...pagos_factura_nota_credito, id: pagoNCId, idCobro: pagoId };
    
            // Crear el registro de cobro de factura de venta
            const pagoNC = await pagosRepository.createPagosNC(pagoNCData);
    
            // Devolver ambos registros como un arreglo
            return [pago, pagoNC];
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir
            console.error("Error al crear pago y pago de factura de compra:", error);
            throw error; // Relanzar el error para que pueda ser manejado por el código que llama a esta función
        }
    }

    async getPagosAllById(id) {
        const functionsToTry = [
            this.getPagosNCById,
            this.getPagosFCById,
            this.getPagosFCEById
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
        throw new Error('No se encontró ningún pago para el ID proporcionado');
    }

    async getPagosFCById(id) {
        try {
            // Buscar el cobro
            const pago = await pagosRepository.findPagosById(id);
    
            if (!pago) {
                throw new Error(`No se encontró ningún pago con el ID ${id}`);
            }
    
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const pagoFC = await pagosRepository.findPagosFCByCobroId(id);
    
            if (!pagoFC) {
                throw new Error(`No se encontró ningún pago de factura de compra para el pago con ID ${id}`);
            }
    
            // Devolver un objeto que contiene ambos resultados
            return { pago, pagoFC };
        } catch (error) {
            console.error("Error al buscar el pago y pago de factura de compra:", error.message);
            throw error;
        }
    }

    async getPagosFCEById(id) {
        try {
            // Buscar el cobro
            const pago = await pagosRepository.findPagosById(id);
    
            if (!pago) {
                throw new Error(`No se encontró ningún pago con el ID ${id}`);
            }
    
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const pagoFCE = await pagosRepository.findPagosFCEByPagoId(id);
    
            if (!pagoFCE) {
                throw new Error(`No se encontró ningún pago de factura de compra excenta para el pago con ID ${id}`);
            }
    
            // Devolver un objeto que contiene ambos resultados
            return { pago, pagoFCE };
        } catch (error) {
            console.error("Error al buscar el pago y pago de factura de compra excenta:", error.message);
            throw error;
        }
    }

    

    async getPagosNCById(id) {
        try {
            // Buscar el cobro
            const pago = await pagosRepository.findPagosById(id);
    
            if (!pago) {
                throw new Error(`No se encontró ningún pago con el ID ${id}`);
            }
    
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const pagoNC = await pagosRepository.findPagosNCByCobroId(id);
    
            if (!pagoNC) {
                throw new Error(`No se encontró ningún pago de nota de credito para el pago con ID ${id}`);
            }
    
            // Devolver un objeto que contiene ambos resultados
            return { pago, pagoNC };
        } catch (error) {
            console.error("Error al buscar el pago y pago de nota de credito:", error.message);
            throw error;
        }
    }

    async getPagosByUserId(userId) {
        return pagosRepository.findAllPagosByUserId(userId);
    }
    /*
    async getAllDataPagosByUserId(userId) {
        const pagos = await this.getPagosByUserId(userId);

        const formattedPagos = [];

        for (const pago of pagos) {
            const factura = this.getPagosAllById(pago.id);

        }

    }*/

    async updatePagos(id, updateData) {
        return pagosRepository.updatePagos(id, updateData);
    }

    async updatePagoFC(id, updateData) {
        return pagosRepository.updatePagosFC(id, updateData);
    }


    async updatePagoNC(id, updateData) {
        return pagosRepository.updatePagosNC(id, updateData);
    }



    async deletePagoFC(id) {
        try {
            const pago = await pagosRepository.findPagosFCByCobroId(id);
            if (!pago) {
                throw new Error(`No se encontró ningún pago de factura de compra con el ID ${id}`);
            }
            console.log(pago.id);
            const delPagoFC = await pagosRepository.deletePagosFCByCobroId(pago.id);
            const delPago = await pagosRepository.deletePagos(id);
            
            return [delPago, delPagoFC];
        } catch (error) {
            console.error("Error al eliminar el pago y pago de factura de compra:", error.message);
            throw error;
        }
    }



    async deletePagoNC(id) {
        try {
            const pago = await pagosRepository.findPagosNCByCobroId(id);
            if (!pago) {
                throw new Error(`No se encontró ningún pago de factura de compra con el ID ${id}`);
            }
            console.log(pago.id);
            const delPagoFC = await pagosRepository.deletePagosNCByCobroId(pago.id);
            const delPago = await pagosRepository.deletePagos(id);
            
            return [delPago, delPagoFC];
        } catch (error) {
            console.error("Error al eliminar el pago y pago de factura de compra:", error.message);
            throw error;
        }
    }





}


export default new pagosService()