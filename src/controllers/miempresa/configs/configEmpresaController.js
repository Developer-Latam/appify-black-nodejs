import empresaService from "../../../services/miempresa/configs/empresaService.js"
import { ResponseHandler } from "../../../utils/dependencys/injection.js"
export const createEmpresaController = async (req, res) => {
    try {
        const { user, nombre, direccion_matriz, direccion_bodega, prefijo_tel, RUT, giro, pagina_web, prefijo_cel } = req.body;
        const result = await empresaService.createEmpresa(user, nombre, direccion_matriz, direccion_bodega, prefijo_tel, RUT, giro, pagina_web, prefijo_cel);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}