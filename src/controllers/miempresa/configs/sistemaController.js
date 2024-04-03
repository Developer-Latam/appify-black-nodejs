import ItemsSistemaService from "../../../services/miempresa/configs/sistemaService.js";
import { ResponseHandler } from "../../../utils/dependencys/injection.js";
export const createSistemaController = async (req, res) => {
    try {
        const { empresa	, pais, idioma, correo_cobranza, moneda, moneda_secundaria, con_decimales, tasa_venta, tasa_compra, tasa_cambio, tolerancia, registro_entregas_autocompletar } = req.body;
        const result = await ItemsSistemaService.createSistema(empresa, pais, idioma, correo_cobranza, moneda, moneda_secundaria, con_decimales, tasa_venta, tasa_compra, tasa_cambio, tolerancia, registro_entregas_autocompletar);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateSistemaController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await ItemsSistemaService.updateSistema(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createEmpresaController = async (req, res) => {
    try {
        const { user, nombre, direccion_matriz, direccion_bodega, prefijo_tel, RUT, giro, pagina_web, prefijo_cel } = req.body;
        const result = await ItemsSistemaService.createEmpresa(user, nombre, direccion_matriz, direccion_bodega, prefijo_tel, RUT, giro, pagina_web, prefijo_cel);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateEmpresaController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await ItemsSistemaService.updateEmpresa(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}