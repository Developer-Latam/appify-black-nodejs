import { ResponseHandler } from "../../utils/dependencys/injection.js";
import ventasService from "../../services/administracion/ventasService.js";

export const createFVController = async (req, res) => {
    try {
        const data = {
            documento_venta: req.body.documento_venta,
            factura_venta: req.body.factura_venta,
            item_servicio_factura_venta: req.body.item_servicio_factura_venta,
            item_producto_factura_venta: req.body.item_producto_factura_venta,
        };
        const result = await ventasService.createFV(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createFVEController = async (req, res) => {
    try {
        const data = {
            documento_venta: req.body.documento_venta,
            factura_venta_excenta: req.body.factura_venta_excenta,
            item_servicio_factura_venta_excenta: req.body.item_servicio_factura_venta_excenta,
            item_producto_factura_venta_excenta: req.body.item_producto_factura_venta_excenta,
        };
        const result = await ventasService.createFVE(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createNCoDController = async (req, res) => {
    try {
        const data = {
            notas_de_credito_debito: req.body.notas_de_credito_debito,
            nota_factura_venta: req.body.nota_factura_venta,
            nota_factura_venta_excenta: req.body.nota_factura_venta_excenta,
            nota_voucher_venta: req.body.nota_voucher_venta,
        };
        const result = await ventasService.createNCoD(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}



const data = {
    cobros: req.body.cobros,
    cobros_factura_venta: req.body.cobros_factura_venta,
    cobros_factura_venta_excenta: req.body.cobros_factura_venta_excenta,
    cobros_factura_venta_nota_credito: req.body.cobros_factura_venta_nota_credito
};
