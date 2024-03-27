import sistemaService from "../../../services/miempresa/configs/sistemaService.js";
import { ResponseHandler } from "../../../utils/dependencys/injection.js";
export const createSistemaController = async (req, res) => {
    try {
        const { empresa	, pais, idioma, correo_cobranza, moneda, moneda_secundaria, con_decimales, tasa_venta, tasa_compra, tasa_cambio, tolerancia, registro_entregas_autocompletar } = req.body;
        const result = await sistemaService.createSistema(empresa, pais, idioma, correo_cobranza, moneda, moneda_secundaria, con_decimales, tasa_venta, tasa_compra, tasa_cambio, tolerancia, registro_entregas_autocompletar);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}