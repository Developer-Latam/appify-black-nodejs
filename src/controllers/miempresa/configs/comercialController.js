import { ResponseHandler } from "../../../utils/dependencys/injection.js";
import comercialService from "../../../services/miempresa/configs/comercialService.js";

export const createProyectoController = async (req, res) => {
    try {
        const { valor_impuesto, porcentaje_de_ot, texto_para_compartir_proyecto, cotizacion_descuento_visible, nombre_impuesto } = req.body;
        const result = await comercialService.createProyecto(valor_impuesto, porcentaje_de_ot, texto_para_compartir_proyecto, cotizacion_descuento_visible, nombre_impuesto);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateProyectoController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await comercialService.updateProyecto(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createParaClientesController = async (req, res) => {
    try {
        const { texto_inferior_firma, mensaje_envio_proyecto, texto_confirmacion_compra } = req.body;
        const result = await comercialService.createParaClientes(texto_inferior_firma, mensaje_envio_proyecto, texto_confirmacion_compra );
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateParaClientesController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await comercialService.updateParaClientes(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}