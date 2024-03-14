import { connectionDB } from "../db/connection.js";
class proveedorRepository {
    async createProveedor(id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable, persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario, nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas) {
        await connectionDB.execute('INSERT INTO proveedores (id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable, persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario, nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable, persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario, nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas]);
    }
    async proveedorExistsByRut(rutProveedor) {
        const [response] = await connectionDB.execute('SELECT * FROM proveedores WHERE rut = ?', [rutProveedor]);
        return response.length > 0;
    }
    async getProveedorById(id){
        const [response] = await connectionDB.execute('SELECT * FROM proveedores WHERE id = ?', [id])
        return response[0];
    }
    async updateProveedor({ id, ...fieldsToUpdate }) {
        // Iniciar la consulta SQL con la parte de actualización
        let query = 'UPDATE proveedores SET ';
        // Iniciar el arreglo de parámetros que se pasará a la consulta
        let parameters = [];
        // Añadir cada campo a actualizar en la consulta SQL
        Object.keys(fieldsToUpdate).forEach((field, index) => {
            query += `${field} = ?`;
            parameters.push(fieldsToUpdate[field]);
            // Añadir coma solo si no es el último elemento
            if (index < Object.keys(fieldsToUpdate).length - 1) {
                query += ", ";
            }
        });
        // Añadir la condición para identificar el registro a actualizar
        query += ' WHERE id = ?';
        // Añadir el id al final del array de parámetros
        parameters.push(id);
        // Ejecutar la consulta SQL con los parámetros
        const [result] = await connectionDB.execute(query, parameters);
        return result;
    }
}


export default new proveedorRepository()