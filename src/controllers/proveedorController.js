import proveedorService from "../services/proveedorService.js"
import { ResponseHandler } from "../utils/dependencys/injection.js";
// Funciones que interactuan con la clase Service, se encargan de los parametros y las respuestas al cliente
//Crea un proveedor
export const createProveedorController = async (req, res) => {
    try {
        const {
            user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
            persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
            nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas
        } = req.body;
        const response = await proveedorService.createProveedorService(
            user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
            persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
            nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas
        );
        ResponseHandler.Ok(res, response);
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
}
//Actualiza un proveedor
export const updateProveedorController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const result = await proveedorService.updateProveedorService(id, updateFields)
        ResponseHandler.Ok(res, result);
    } catch (error) {
        ResponseHandler.HandleError(res, error)
    }
}