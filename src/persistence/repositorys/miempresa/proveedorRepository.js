import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
import { prisma } from "../../../utils/dependencys/injection.js";
//Clase que interactua con la db, se encarga de las querys sql
class proveedorRepository {
    //Creacion de un proveedor
    async createProveedor(id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable, persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario, nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas) {
        try {
            const response = await prisma.proveedores.create({
                data: {
                    id,
                    user,
                    rut, 
                    razon_social,
                    activo,
                    giro,
                    condicion_de_pago,
                    nombre_fantasia,
                    cuenta_contable,
                    persona,
                    direccion,
                    email,
                    comuna,
                    telefono,
                    ciudad,
                    banco,
                    nombre_beneficiario,
                    nombre_cuenta,
                    rut_beneficiario,
                    nro_cta_corriente,
                    correo_cobranzas
                }
            })
            return response
        } catch (error) {
            throw new CustomError(500, 'Error al crear el proveedor', { detail: error.message });
        }
    }
    //Busca el proveedor por su rut y devuelve true o false
    async proveedorExistsByRut(rutProveedor) {
        const proveedor = await prisma.proveedores.findFirst({
            where: {
                rut: rutProveedor,
            },
        })
        return proveedor !== null;
    }
    //Trae el proveedor mediante el ID
    async getProveedorById(id){
        try {
            const proveedor = await prisma.proveedores.findUnique({
                where: {
                    id: id,
                },
            })
            return proveedor
        } catch (error) {
            throw new CustomError(500, 'Error al obtener el proveedor de la base de datos', { detail: error.message });
        }
    }
    //OBTENER TODOS LOS PROVEEDORES POR USER ID PARA LA AGOS   
     
    async findAllProveedoresByUserId(userId) {
        return prisma.proveedores.findMany({
            where: { user: userId }
        });
    }


    //Actualiza un proveedor
    //Se hace una query custom para tomar los campos a actualizar y colocarlos en la query
    async updateProveedor({ id, ...fieldsToUpdate }) {
        try {
            const proveedorUpdated = await prisma.proveedores.update({
                where: {
                    id: id
                },
                data: fieldsToUpdate,
            })
            return proveedorUpdated
        } catch (error) {
            throw new CustomError(500, 'Error al actualizar el proveedor en la base de datos', { detail: error.message });
        }
    }
}


export default new proveedorRepository()