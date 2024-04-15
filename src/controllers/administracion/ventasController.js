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

export const createNCoDConItemsController = async (req, res) => {
    try {
        const data = {
            notas_de_credito_debito: req.body.notas_de_credito_debito,
            nota_factura_venta: req.body.nota_factura_venta,
            nota_factura_venta_excenta: req.body.nota_factura_venta_excenta,
            nota_credito_nota_NC: req.body.nota_credito_nota_NC,
            item_servicio_nota_credito: req.body.item_servicio_nota_credito,
            item_producto_nota_credito: req.body.item_producto_nota_credito,
            item_servicio_nota_credito_NC: req.body.item_servicio_nota_credito_NC,
            item_producto_nota_credito_NC: req.body.item_producto_nota_credito_NC,
            item_servicio_factura_venta: req.body.item_servicio_factura_venta,
            item_producto_factura_venta: req.body.item_producto_factura_venta,
            item_servicio_factura_venta_excenta: req.body.item_servicio_factura_venta_excenta,
            item_producto_factura_venta_excenta: req.body.item_producto_factura_venta_excenta,
        };
        const result = await ventasService.createNCoDyItems(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}


