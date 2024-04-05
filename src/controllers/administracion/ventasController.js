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
