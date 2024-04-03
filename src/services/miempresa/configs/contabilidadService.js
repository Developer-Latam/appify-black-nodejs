import contabilidadRepository from "../../../persistence/repositorys/miempresa/configs/contabilidadRepository.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";

class ContabilidadService {
    async createFE(recibir_doc_libre_DTE_automatico, contrasena_sii, folio_factura_excenta, folio_facura, folio_factura_compra, folio_nota_debito, folio_nota_credito, folio_guia_despacho, folio_boleta_excenta, folio_boleta_fisica, folio_boleta_electronica, set_factura_basica, set_boletas, set_facturas_exportacion, set_facturas_compra) {
        try {
            return contabilidadRepository.createFE(recibir_doc_libre_DTE_automatico, contrasena_sii, folio_factura_excenta, folio_facura, folio_factura_compra, folio_nota_debito, folio_nota_credito, folio_guia_despacho, folio_boleta_excenta, folio_boleta_fisica, folio_boleta_electronica, set_factura_basica, set_boletas, set_facturas_exportacion, set_facturas_compra)
        } catch (error) {
            throw(error)
        }
    }
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
    async createCobranza(asunto, mensaje_nivel_1, mensaje_nivel_2, mensaje_nivel_3) {
        try {
            return contabilidadRepository.createCobranza(asunto, mensaje_nivel_1, mensaje_nivel_2, mensaje_nivel_3)
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
    async createModuloAdm(cuenta_impuesto_debito, cuenta_impuesto_credito, valor_impuesto_retenido, cuenta_impuesto_no_recuperable, plazo_no_recuperable, cuenta_retencion_impuesto, cuenta_impuesto_especifico) {
        try {
            return contabilidadRepository.createModuloAdm(cuenta_impuesto_debito, cuenta_impuesto_credito, valor_impuesto_retenido, cuenta_impuesto_no_recuperable, plazo_no_recuperable, cuenta_retencion_impuesto, cuenta_impuesto_especifico)
        } catch (error) {
            throw(error)
        }
    }
    async updateModuloAdm(id, inputData) {
        try {
            const camposPermitidos = [
                'cuenta_impuesto_debito', 'cuenta_impuesto_credito', 'valor_impuesto_retenido', 'cuenta_impuesto_no_recuperable','plazo_no_recuperable','cuenta_retencion_impuesto','cuenta_impuesto_especifico'
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
            return await contabilidadRepository.updateModuloAdm(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
}

export default new ContabilidadService()