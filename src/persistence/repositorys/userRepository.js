import { connectionDB } from "../db/connection.js";
class UserRepository {
    async findUserByEmailAndPassword(email, password) {
        try {
            const [response] = await connectionDB.execute('SELECT * FROM subusuarios WHERE email = ? AND password = ?', [email, password]);
            return response;
        } catch (error) {
            throw error(error)
        }
    }
    async getUserPermissions(userId) {
        try {
            const [permisos] = await connectionDB.execute('SELECT permisos.categoria, permisos.subcategoria, permisos_de_usuario.inactivo, permisos_de_usuario.ver, permisos_de_usuario.administrar, permisos_de_usuario.todo, permisos_de_usuario.propietario FROM permisos INNER JOIN permisos_de_usuario ON permisos_de_usuario.idPermiso = permisos.id WHERE permisos_de_usuario.user = ?', [userId]);
            return permisos;
        } catch (error) {
            throw error(error)
        }
    }
    async userExists(email) {
        const [response] = await connectionDB.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return response.length > 0;
    }
    async userExistsById(id) {
        const [response] = await connectionDB.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
        return response.length > 0;
    }
    async createUser(id, nombre, apellido, email, celular, fecha_de_nacimiento, password) {
        await connectionDB.execute('INSERT INTO usuarios (id, nombre, apellido, email, celular, fecha_de_nacimiento, password) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, nombre, apellido, email, celular, fecha_de_nacimiento, password]);
        await connectionDB.execute('INSERT INTO subusuarios (id, user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, ref_superusuario, checkeado, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, id, nombre, apellido, email, celular, fecha_de_nacimiento, null, 1, 1, password]);
    }
    async findUserById(id) {
        const [rows] = await connectionDB.execute('SELECT * FROM subusuarios WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    async updateSubusuario({ id, ...fieldsToUpdate }) {
        // Iniciar la consulta SQL con la parte de actualización
        let query = 'UPDATE subusuarios SET ';
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
        // Añadir el id al final del arreglo de parámetros
        parameters.push(id);
        // Ejecutar la consulta SQL con los parámetros
        const [result] = await connectionDB.execute(query, parameters);
        return result;
    }
    //este funciona
    async create(usuario) {
        return await UsuarioModel.create(usuario);
    }
    async update(id, usuario) {
        return await UsuarioModel.update(usuario, { where: { id } });
    }
    async delete(id) {
        return await UsuarioModel.destroy({ where: { id } });
    }
}

export default new UserRepository()