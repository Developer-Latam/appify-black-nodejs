import contabilidadRepository from "../../../persistence/repositorys/miempresa/configs/contabilidadRepository.js";
import executeTransactions from "../../../persistence/transactions/executeTransaction.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";

class ContabilidadService {
    
    async updateFE(id, inputData) {
        try {
            const camposPermitidos = [
                'recibir_doc_libre_DTE_automatico', 'contrasena_sii', 'folio_factura_excenta','folio_facura', 'folio_factura_compra', 'folio_nota_debito',
                'folio_nota_credito','folio_guia_despacho','folio_boleta_excenta','folio_boleta_fisica','folio_boleta_electronica','set_factura_basica','set_boletas','set_facturas_exportacion','set_facturas_compra'
            ]
            //Contruyo un objeto de datos solo con los campos permitidos que tambien esten presentes en input data
            let dataToUpdate = {}
            camposPermitidos.forEach(campo =>{
                if (inputData.hasOwnProperty(campo)){
                    dataToUpdate[campo] = inputData[campo]
                }
            })
            if(Object.keys(dataToUpdate).length === 0){
                throw new CustomError(400, "No valid fields provided for update")
            }
            return await contabilidadRepository.updateFE(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
    async updateCobranza(id, inputData) {
        try {
            const camposPermitidos = [
                'asunto', 'mensaje_nivel_1', 'mensaje_nivel_2', 'mensaje_nivel_3'
            ]
            //Contruyo un objeto de datos solo con los campos permitidos que tambien esten presentes en input data
            let dataToUpdate = {}
            camposPermitidos.forEach(campo =>{
                if (inputData.hasOwnProperty(campo)){
                    dataToUpdate[campo] = inputData[campo]
                }
            })
            if(Object.keys(dataToUpdate).length === 0){
                throw new CustomError(400, "No valid fields provided for update")
            }
            return await contabilidadRepository.updateCobranza(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
    
    async UpdateExecuteOperationsModuloAdministracion(data) {
        //Preparar los datos para cada operacion
        // Desestructurar "data" para obtener los datos específicos para cada operación.
        const {
            administracion_impuesto,
            administracion_anticipo,
            administracion_por_clasificar,
            administracion_por_cobrar,
            administracion_por_pagar
        } = data;
        //Agrupar las operaciones, pasando los datos a cada funcion
        const operations = [
            contabilidadRepository.updateModuloAdm(administracion_impuesto.id, administracion_impuesto),
            contabilidadRepository.updateAdmAnticipo(administracion_anticipo.id, administracion_anticipo),
            contabilidadRepository.updateAdmPorClasificar(administracion_por_clasificar.id, administracion_por_clasificar),
            contabilidadRepository.updateAdmPorCobrar(administracion_por_cobrar.id, administracion_por_cobrar),
            contabilidadRepository.updateAdmPorPagar(administracion_por_pagar.id, administracion_por_pagar)
        ]
        try {
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations.map( op => op() ))
            return ("transacciones completas con exito", result)
        } catch (error) {
            throw(error)
        }
    }
}

export default new ContabilidadService()