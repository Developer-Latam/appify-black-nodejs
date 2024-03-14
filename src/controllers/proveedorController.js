import proveedorService from "../services/proveedorService.js"

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
        res.status(200).json(response)
    } catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
}
export const updateProveedorController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const result = await proveedorService.updateProveedorService(id, updateFields)
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
}