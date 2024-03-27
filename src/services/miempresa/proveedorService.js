import proveedorRepository from "../../persistence/repositorys/miempresa/proveedorRepository.js"
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
//Clase que interactua con Repository, se encarga de la logica de negocio
class proveedorService {
    //Crea un proveedor
    async createProveedorService(user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
        persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
        nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas){
        //Verificar si existe el proveedor y el usuario para la empresa
        try {
            const superUserExist = await userRepository.userExistsById(user)
            const proveedorExist = await proveedorRepository.proveedorExistsByRut(rut)
            if(proveedorExist || !superUserExist){
                throw new CustomError(400, 'Proveedor ya existente o usuario no válido');
            }
            //Si no existe, crea el proveedor
            const id = idgenerate("prov")
            await proveedorRepository.createProveedor(
            id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
            persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
            nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas);
            return { ok: true, message: 'Proveedor creado exitosamente'}  
        } catch (error) {
            throw (error)
        }
    }
    //Actualiza el proveedor mediante su id
    async updateProveedorService(id, updateFields) {
        try {
            const existingProveedor = await proveedorRepository.getProveedorById(id);
            if (!existingProveedor) {
                throw new CustomError(404, 'Proveedor no encontrado');
            }
            // Comparar y construir el objeto de actualización solo con campos modificados
            const fieldsToUpdate = {};
            Object.keys(updateFields).forEach(field => {
                if (updateFields[field] !== existingProveedor[field]) {
                    fieldsToUpdate[field] = updateFields[field];
                }
            });
            if (Object.keys(fieldsToUpdate).length === 0) {
                throw new CustomError(400, 'No hay cambios para actualizar');
            }
            await proveedorRepository.updateProveedor({id, ...fieldsToUpdate})
            return { success: true, message: 'Proveedor actualizado correctamente' };
        } catch (error) {
            throw (error)
        }
    }
}

export default new proveedorService()