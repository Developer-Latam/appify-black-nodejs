import { connectionDB } from "../db/connection.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//Clase que interactua con la db, se encarga de las querys sql
class proveedorRepository {
    //Creacion de un proveedor
    async createProveedor(id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable, persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario, nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas) {
        // await connectionDB.execute('INSERT INTO proveedores (id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable, persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario, nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable, persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario, nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas]);
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
    }
    //Busca el proveedor por su rut y devuelve true o false
    async proveedorExistsByRut(rutProveedor) {
        // const [response] = await connectionDB.execute('SELECT * FROM proveedores WHERE rut = ?', [rutProveedor]);
        const proveedor = await prisma.proveedores.findFirst({
            where: {
                rut: rutProveedor,
            },
        })
        return proveedor !== null;
    }
    //Trae el proveedor mediante el ID
    async getProveedorById(id){
        // const [response] = await connectionDB.execute('SELECT * FROM proveedores WHERE id = ?', [id])
        const proveedor = await prisma.proveedores.findUnique({
            where: {
                id: id,
            },
        })
        return proveedor
    }
    //Actualiza un proveedor
    //Se hace una query custom para tomar los campos a actualizar y colocarlos en la query
    async updateProveedor({ id, ...fieldsToUpdate }) {
        const proveedorUpdated = await prisma.proveedores.update({
            where: {
                id: id
            },
            data: fieldsToUpdate,
        })
        return proveedorUpdated
    }
}


export default new proveedorRepository()