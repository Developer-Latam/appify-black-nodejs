import { ResponseHandler } from "../../../utils/dependencys/injection.js";
import contabilidadService from "../../../services/miempresa/configs/contabilidadService.js";


export const createFEController = async (req, res) => {
    try {
        const { recibir_doc_libre_DTE_automatico, contrasena_sii, folio_factura_excenta, folio_facura, folio_factura_compra, folio_nota_debito, folio_nota_credito, folio_guia_despacho, folio_boleta_excenta, folio_boleta_fisica, folio_boleta_electronica, set_factura_basica, set_boletas, set_facturas_exportacion, set_facturas_compra } = req.body;
        const result = await contabilidadService.createFE(recibir_doc_libre_DTE_automatico, contrasena_sii, folio_factura_excenta, folio_facura, folio_factura_compra, folio_nota_debito, folio_nota_credito, folio_guia_despacho, folio_boleta_excenta, folio_boleta_fisica, folio_boleta_electronica, set_factura_basica, set_boletas, set_facturas_exportacion, set_facturas_compra);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateFEController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await contabilidadService.updateFE(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createCobranzasController = async (req, res) => {
    try {
        const { asunto, mensaje_nivel_1, mensaje_nivel_2, mensaje_nivel_3 } = req.body;
        const result = await contabilidadService.createCobranza(asunto, mensaje_nivel_1, mensaje_nivel_2, mensaje_nivel_3);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateCobranzasController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await contabilidadService.updateCobranza(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createModuloAdmController = async (req, res) => {
    try {
        const { cuenta_impuesto_debito, cuenta_impuesto_credito, valor_impuesto_retenido, cuenta_impuesto_no_recuperable, plazo_no_recuperable, cuenta_retencion_impuesto, cuenta_impuesto_especifico } = req.body;
        const result = await contabilidadService.createModuloAdm(cuenta_impuesto_debito, cuenta_impuesto_credito, valor_impuesto_retenido, cuenta_impuesto_no_recuperable, plazo_no_recuperable, cuenta_retencion_impuesto, cuenta_impuesto_especifico);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateModuloAdmController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await contabilidadService.updateModuloAdm(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}