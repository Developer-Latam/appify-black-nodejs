import proveedorRepository from "../../persistence/repositorys/miempresa/proveedorRepository.js"
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
//Clase que interactua con Repository, se encarga de la logica de negocio
class proveedorService {
    //Crea un proveedor
    async createProveedorService(user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
        persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
        nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas){
        //Verificar si existe el proveedor y el usuario para la empresa
        const superUserExist = await userRepository.userExistsById(user)
        const proveedorExist = await proveedorRepository.proveedorExistsByRut(rut)
        if(proveedorExist && superUserExist){
            return { ok: false, message: 'Proveedor ya existente en la empresa' };
        }
        //Si no existe, crea el proveedor
        const id = idgenerate("prov")
        await proveedorRepository.createProveedor(
        id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
        persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
        nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas);
        return { ok: true, message: 'Proveedor creado exitosamente'}  
    }
    //Actualiza el proveedor mediante su id
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