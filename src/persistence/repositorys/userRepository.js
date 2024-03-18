import { connectionDB } from "../db/connection.js";
//Clase que interactua con la db mediante las querys a las diferentes tablas
class UserRepository {
    //Encuentra un usuario mediante su email y password
    async findUserByEmailAndPassword(email, password) {
        try {
            const [response] = await connectionDB.execute('SELECT * FROM subusuarios WHERE email = ? AND password = ?', [email, password]);
            return response;
        } catch (error) {
            throw error(error)
        }
    }
    //Me trae los diferentes permisos segun el id de usuario
    async getUserPermissions(userId) {
        try {
            const [permisos] = await connectionDB.execute('SELECT permisos.categoria, permisos.subcategoria, permisos_de_usuario.inactivo, permisos_de_usuario.ver, permisos_de_usuario.administrar, permisos_de_usuario.todo, permisos_de_usuario.propietario FROM permisos INNER JOIN permisos_de_usuario ON permisos_de_usuario.idPermiso = permisos.id WHERE permisos_de_usuario.user = ?', [userId]);
            return permisos;
        } catch (error) {
            throw error(error)
        }
    }
    //Verifica si el usuario existe por su email y devuelve true o false
    async userExists(email) {
        const [response] = await connectionDB.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return response.length > 0;
    }
    //Verifica si el subusuario existe por su email y devuelve true o false
    async subUserExists(email) {
        const [response] = await connectionDB.execute('SELECT * FROM subusuarios WHERE email = ?', [email]);
        return response.length > 0;
    }
    //Verifica si el usuario existe por su id y devuelve true o false
    async userExistsById(id) {
        const [response] = await connectionDB.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
        return response.length > 0;
    }
    //Realiza la creacion de usuario
    async createUser(id, nombre, apellido, email, celular, fecha_de_nacimiento, password) {
        await connectionDB.execute('INSERT INTO usuarios (id, nombre, apellido, email, celular, fecha_de_nacimiento, password) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, nombre, apellido, email, celular, fecha_de_nacimiento, password]);
        await connectionDB.execute('INSERT INTO subusuarios (id, user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, ref_superusuario, checkeado, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, id, nombre, apellido, email, celular, fecha_de_nacimiento, null, 1, 1, password]);
    }
    //Realiza la creacion de usuario
    async createSubUser(id,user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo) {
        await connectionDB.execute('INSERT INTO subusuarios (id, user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, ref_superusuario, checkeado, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, 0, 0, null]);
    }
    //Busca el subusuario por su id y lo retorna
    async findsubUserById(id) {
        const [rows] = await connectionDB.execute('SELECT * FROM subusuarios WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    //Actualiza un sub usuario
    //Se hace una query custom para tomar los campos a actualizar y colocarlos en la query
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
        // Añadir el id al final del array de parámetros
        parameters.push(id);
        // Ejecutar la consulta SQL con los parámetros
        const [result] = await connectionDB.execute(query, parameters);
        return result;
    }
    //Actualiza los permisos de usuario
    async updatePermiso(user, idPermiso, updates) {
        const columnsToUpdate = Object.keys(updates).map(column => `${column} = ?`).join(', ');
        const values = [...Object.values(updates), user, idPermiso];
        const query = `UPDATE permisos_de_usuario SET ${columnsToUpdate} WHERE user = ? AND idPermiso = ?`;
        const [rows] = await connectionDB.execute(query, values);
        return rows;
    }
    //Crea los permisos en la tabla permisos_de_usuario
    async createPermisos(permisos, idSubUsuario) {
        try {
            for (const permiso of permisos){
                await connectionDB.execute('INSERT INTO permisos_de_usuario (idPermiso,user,inactivo,ver,administrar,todo,propietario) VALUES (?,?,?,?,?,?,?)',[permiso.id, idSubUsuario ,permiso.inactivo , permiso.ver ,permiso.administrar ,permiso.todo , permiso.propietario])
            }
        } catch (error) {
            throw error(error)
        }
    }
    //Elimina un sub user por su id
    async deleteSubUserByID(id) {
        const [rows] = await connectionDB.execute('DELETE FROM subusuarios WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    //Edita los permisos de los sub usuarios
    async editarPermisos(id) {
        const [rows] = await connectionDB.execute('SELECT * FROM subusuarios WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }
}

export default new UserRepository()