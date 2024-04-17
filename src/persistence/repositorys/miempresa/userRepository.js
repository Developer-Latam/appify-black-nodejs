import { connectionDB } from "../../db/connection.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../../utils/id/idGenerate.js";
import executeTransactions from "../../transactions/executeTransaction.js";
import { prisma } from "../../../utils/dependencys/injection.js";

//Clase que interactua con la db mediante las querys a las diferentes tablas
class UserRepository {
    //Encuentra un usuario mediante su email y password
    async findUserByEmail(email) {
        try {
            const user = await prisma.subusuarios.findFirst({
                where: {
                    email: email,
                }
            });
            if(!user){
                throw new CustomError(404, "User not found", {email, message: "No user found with provided email and password."})
            }
            return user;
        } catch (error) {
            // Propagando errores de la base de datos o errores personalizados
            if (!(error instanceof CustomError)) {
                // Transformando errores no capturados a errores personalizados
                throw new CustomError(500, "Internal server error", { error: error.message });
            }
            throw error;
        }
    }
    async findUserByID_nombre_apellido(id) {
        try {
            const user = await prisma.subusuarios.findUnique({
                where: {
                    id: id
                },
                select: {
                    nombre: true,  
                    apellido: true
                }
            });
            if(!user){
                throw new CustomError(404, "User not found", {email, message: "No user found with provided email and password."})
            }
            return user ? user : null;
        } catch (error) {
            // Propagando errores de la base de datos o errores personalizados
            if (!(error instanceof CustomError)) {
                // Transformando errores no capturados a errores personalizados
                throw new CustomError(500, "Internal server error", { error: error.message });
            }
            throw error;
        }
    }
    //Trae los diferentes permisos segun el id de usuario
    async getUserPermissions(userId) {
        try {
            const permisos = await prisma.$queryRaw`SELECT permisos.categoria, permisos.subcategoria, permisos.id, permisos_de_usuario.inactivo, permisos_de_usuario.ver, permisos_de_usuario.administrar, permisos_de_usuario.todo, permisos_de_usuario.propietario FROM permisos INNER JOIN permisos_de_usuario ON permisos_de_usuario.idPermiso = permisos.id WHERE permisos_de_usuario.user = ${userId}`
            return permisos;
        } catch (error) {
            throw new CustomError(500, 'Error al obtener permisos del subusuario', { detail: error.message, userId });
        }
    }
    //Realiza update de permisos
    async updatePermission(userId, permissionId, data) {
        try {
            await prisma.permisos_de_usuario.updateMany({
                where: {
                    idPermiso: parseInt(permissionId),
                    user: userId.toString(), //user es un VARCHAR
                },
                data,
            });
        } catch (error) {
            throw new CustomError(500, 'Error al actualizar permiso', { detail: error.message, userId, permissionId });
        }
    }
    //Actualiza un sub usuario
    async updateSubusuario({ id, ...fieldsToUpdate }) {
        try {
            const result = await prisma.subusuarios.update({
                where: { id: id },
                data: fieldsToUpdate
            });
            return result;
        } catch (error) {
            if (error.code === "P2025") { // Código de error específico de Prisma para "Registro no encontrado"
                throw new CustomError(404, `Subusuario con ID ${id} no encontrado.`);
            } else {
                // Para cualquier otro error de Prisma, conviértelo en un error de servidor
                throw new CustomError(500, 'Error al actualizar el subusuario', { error: error.message });
            }
        }
    }
    //Verifica si el usuario existe por su email y devuelve true o false
    async userExists(email) {
        const response = await prisma.usuarios.findFirst({  
            where:{
                email : email
            }
        })
        return response !== null;
    }
    //Verifica si el sub usuario existe por su email y devuelve true o false
    async subUserExists(email) {
        const response = await prisma.subusuarios.findFirst({  
            where:{
                email : email
            }
        })
        return response;
    }
    //Verifica si el usuario existe por su id y devuelve true o false
    async userExistsById(id) {
        const response = await prisma.usuarios.findUnique({
            where:{
                id : id
            }
        })
        return response;
    }
    //Realiza la creacion de usuario y un sub usuario
    async createUserAndSubuser(nombre, apellido, email, celular, fecha_de_nacimiento, passwordHash, activo) {
        // Datos para el usuario principal
        let userIDsuperUser = idgenerate("super-user")
        let fecha = new Date(fecha_de_nacimiento)
        let fecha_ISO = fecha.toISOString()
        let userData = {
            id: userIDsuperUser,
            nombre,
            apellido,
            email,
            celular,
            fecha_de_nacimiento: fecha_ISO,
            password: passwordHash,
            activo,
        };
        // Datos para el subusuario
        let subUserData = {
            id: idgenerate("sub-user"), // Prefijo para distinguir el ID del subusuario
            user: userIDsuperUser,
            nombre,
            apellido,
            email,
            celular,
            fecha_de_nacimiento: fecha_ISO,
            cargo: null,
            ref_superusuario: 1,
            checkeado: 1,
            password: passwordHash,
            estado: "true",
        };
        // Preparando las operaciones para la transacción
        const operations = [
            prisma.usuarios.create({ data: userData }),
            prisma.subusuarios.create({ data: subUserData })
        ];
        try {
            await executeTransactions(operations)
            return { ok: true, message: 'Usuario y subusuario creados exitosamente' };
        } catch (error) {
            throw new CustomError(500, 'Error en el ingreso de propiedades a la db', { error: error.message });
        }
    }
    //Realiza la creacion de sub usuario
    // No se captura el error aquí porque se manejará en la transacción
    createSubUser(id,user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo) {
        let fecha = new Date(fecha_de_nacimiento)
        let fecha_ISO = fecha.toISOString()
        return prisma.subusuarios.create({
            data: {
                id: id,
                user:user,
                nombre: nombre,
                apellido: apellido,
                email: email,
                celular: celular,
                fecha_de_nacimiento: fecha_ISO,
                cargo: cargo,
                ref_superusuario:0,
                checkeado:0,
                password: null,
                estado: "true",
            }
        });
    }
    //Busca el subusuario por su id y lo retorna
    async findsubUserById(id) {
        try {
            const rows = await prisma.subusuarios.findUnique({
                where:{
                    id : id
                }
            })
            return rows;
        } catch (error) {
            throw new CustomError(500, 'Error interno del servidor al buscar subusuario', { detail: error.message, id });
        }
    }
    //Realiza un update a la password del subUser
    async resetPasswordSubUser(id, passwordHashed) {
        try {
            await prisma.subusuarios.update({
                where: { id: id },
                data: {
                    password: passwordHashed,
                    checkeado: 1,
                }
            });
            return "Contraseña de sub user actualizada";
        } catch (error) {
            throw new CustomError(500, 'Error al actualizar la contraseña del subusuario', { detail: error.message, id });
        }
    }
    //Actualiza los permisos de usuario
    async updatePermiso(user, idPermiso, updates) {
        try {
            const columnsToUpdate = Object.keys(updates).map(column => `${column} = ?`).join(', ');
            const values = [...Object.values(updates), user, idPermiso];
            const query = `UPDATE permisos_de_usuario SET ${columnsToUpdate} WHERE user = ? AND idPermiso = ?`;
            const [rows] = await connectionDB.execute(query, values);
            return rows;
        } catch (error) {
            throw new CustomError(500, 'Error al actualizar permisos de usuario', { error: error.message });
        }
    }
    //Crea los permisos en la tabla permisos_de_usuario
    // No se captura el error aquí porque se manejará en la transacción
    createPermisos(permisos, idSubUsuario) {
        try {
            // Devuelve un array de operaciones sin ejecutarlas
            return permisos.map(permiso => prisma.permisos_de_usuario.create({
                data: {
                    idPermiso: permiso.id,
                    user: idSubUsuario,
                    inactivo: permiso.inactivo,
                    ver: permiso.ver,
                    administrar: permiso.administrar,
                    todo: permiso.todo,
                    propietario: permiso.propietario
                }
            }));
        } catch (error) {
            throw error(error)
        }
    }
    //Elimina un sub user por su id
    async deleteSubUserByID(id) {
        const rows = await prisma.subusuarios.delete({
            where: {
                id: id
            }
        });
        return rows;
    }
    async updatePermisosdeUsuario(userId, idPermiso, updates) {
        const response = await prisma.permisos_de_usuario.update({
            where: { user: userId, idPermiso: idPermiso },
            data: updates
        });
        return response;
    }
    //Edita los permisos de los sub usuarios
    async editarPermisos(id) {
        //const [rows] = await connectionDB.execute('SELECT * FROM subusuarios WHERE id = ?', [id]);
        const rows = await prisma.subusuarios.findUnique({
            where:{
                id : id
            }
        })
        return rows;
    }
}

export default new UserRepository()