import proveedorRepository from "../persistence/repositorys/proveedorRepository.js"
import userRepository from "../persistence/repositorys/userRepository.js";
import { idgenerate } from "../utils/idGenerate.js";

class proveedorService {
    async createProveedorService(user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
        persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
        nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas){
        //Verificar si existe el proveedor para la empresa
        const superUserExist = await userRepository.userExistsById(user)
        const proveedorExist = await proveedorRepository.proveedorExistsByRut(rut)
        if(proveedorExist && superUserExist){
            return { ok: false, message: 'Proveedor ya existente en la empresa' };
        }
        const id = idgenerate("prov")
        await proveedorRepository.createProveedor(
        id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
        persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
        nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas);
        return { ok: true, message: 'Proveedor creado exitosamente'}  
    }
    async updateProveedorService(id, updateFields) {
        const existingProveedor = await proveedorRepository.getProveedorById(id);
        if (!existingProveedor) {
            throw new Error('Proveedor no encontrado');
        }
        // Comparar y construir el objeto de actualización solo con campos modificados
        const fieldsToUpdate = {};
        Object.keys(updateFields).forEach(field => {
            if (updateFields[field] !== existingProveedor[field]) {
                fieldsToUpdate[field] = updateFields[field];
            }
        });
        if (Object.keys(fieldsToUpdate).length === 0) {
            throw new Error('No hay cambios para actualizar');
        }
        await proveedorRepository.updateProveedor({id, ...fieldsToUpdate})
        return { success: true, message: 'Proveedor actualizado correctamente' };
    }
}

export default new proveedorService()