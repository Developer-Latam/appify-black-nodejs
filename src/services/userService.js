import UserRepository from "../persistence/repositorys/userRepository.js";
import { idgenerate } from "../utils/id/idGenerate.js";
import { sendEmail } from "../utils/email/emailService.js";
import executeTransactions from "../persistence/transactions/executeTransaction.js";
import { CustomError } from "../utils/httpRes/handlerResponse.js";
import { isValidPassword } from "../utils/password/hashPass.js";

//Clase que interactua con el Repository y se encarga de la logica de negocio
class UserService {
    //Me trae un sub usuario por su id
    async getSubUserById(subUserId) {
        try {
            const subUser = await UserRepository.findsubUserById(subUserId);
            if (!subUser) {
                throw new CustomError(404, "El usuario no existe", { id: subUserId });
            }
            return subUser;
        } catch (error) {
            throw error;
        }
    }
    //Realiza la creacion de contraseña para un nuevo sub usuario
    async createPasswordForSubUser(subUserId, passwordHashed) {
        try {
            await UserRepository.resetPasswordSubUser(subUserId, passwordHashed);
            return (`Contraseña del usuario con id: ${subUserId} creada correctamente`);
        } catch (error) {
            throw error;
        }
    }
    //Esta funcion recibe los permisos y los setea en un formato mas legible para la respuesta
    async formatPermissions(permisos) {
        let estructuraDiccionarios = [];
        permisos.forEach(dato => {
            let categoria = dato.categoria;
            let subcategoria = dato.subcategoria;
            let inactivo = dato.inactivo;
            let ver = dato.ver;
            let administrar = dato.administrar;
            let todo = dato.todo;
            let propietario = dato.propietario;
            // Verificar si la categoría ya existe en la estructura de diccionarios
            let categoriaExistente = estructuraDiccionarios.find(item => item.categoria === categoria);
            // Si la categoría no existe, agregarla con su primera subcategoría
            if (!categoriaExistente) {
                estructuraDiccionarios.push({
                    categoria: categoria,
                    subcategorias: [{
                        nombre: subcategoria,
                        options: [
                            { nombre: "inactivo", select: inactivo },
                            { nombre: "ver", select: ver },
                            { nombre: "administrar", select: administrar },
                            { nombre: "todo", select: todo },
                            { nombre: "propietario", select: propietario }
                        ]
                    }]
                });
            } else {
                // Si la categoría ya existe, buscarla y agregar la subcategoría
                let subcategoriaExistente = categoriaExistente.subcategorias.find(item => item.nombre === subcategoria);
                if (!subcategoriaExistente) {
                    categoriaExistente.subcategorias.push({
                        nombre: subcategoria,
                        options: [
                            { nombre: "inactivo", select: inactivo },
                            { nombre: "ver", select: ver },
                            { nombre: "administrar", select: administrar },
                            { nombre: "todo", select: todo },
                            { nombre: "propietario", select: propietario }
                        ]
                    });
                }
            }
        });
        return estructuraDiccionarios
    }
    //Realiza el log in del usuario
    async login(email, password) {
        try {
            // Busco el usuario por email
            const user = await UserRepository.findUserByEmail(email);
            if(!user){
                throw new CustomError(401, "Authentication error", {detail: "Invalid credentials"})
            }
            // Comparo la contraseña proporcionada con la hasheada en la DB
            const validPassword = isValidPassword(user, password)
            if(!validPassword){
                //Si la contraseña es incorrecta se lanza un error
                throw new CustomError(401, "Authentication error", {detail: "Invalid credentials"})
            }
            // Si la contraseña es correcta, continúas con la lógica para determinar si es superusuario o subusuario y setear permisos
            if (user.length === 1) {
                const user = user[0];
                // 0 = subusuario
                // 1 = superusuario
                if (user.ref_superusuario === 0) {
                    const permisos = await UserRepository.getUserPermissions(user.id);
                    return { login: true, userType: "subusuario", permisos: await this.formatPermissions(permisos) };
                } else {
                    return { login: true, userType: "superusuario", permisos: "all" };
                }
            }
        } catch (error) {
            throw error;
        }
    }
    //Realiza el registro de usuario
    async signUpUsuario(nombre, apellido, email, celular, fecha_de_nacimiento, passwordHash) {
        //Verifica si existe, y si no, lo crea
        const userExists = await UserRepository.userExists(email);
        if (!userExists) {
            await UserRepository.createUserAndSubuser(nombre, apellido, email, celular, fecha_de_nacimiento, passwordHash);
            return { ok: true, message: 'Usuario y subusuario creados exitosamente' };
        } else {
            throw new CustomError(409, 'El usuario ya existe', { email });
        }
    }
    //Realiza el registro de un subusuario, la creacion de los permisos y posterior envia el email de bienvenida
    async signUpSubUsuario(user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, permisos) {
        try {
            //Verifica si existe, y si no, realiza la generacion de su id, y posterior lo crea 
            const subUserExists = await UserRepository.subUserExists(email);
            if (subUserExists) {
                throw new CustomError(409, 'Subusuario ya existente');
            }    
            const id = idgenerate("sub-user");
            const createUserOperation = UserRepository.createSubUser(id, user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo);
            const createPermisosOperations = UserRepository.createPermisos(permisos, id);
            //Se juntan las operaciones como transaction, si una falla, se revierten todos los cambios hechos a la db
            await executeTransactions([createUserOperation, ...createPermisosOperations]);
            await sendEmail(email, id);
            return { ok: true, message: 'Subusuario creado y con permisos. Email enviado.' };
        } catch (error) {
            throw (error)
        }
    }
    //Prepara los permisos para hacer update
    //Trae los permisos ya existentes de la db y compara cambios, y solo retorna las diferencias
    async preparePermissionsUpdate(userId, newPermissions) {
        try {
            const currentPermissions = await UserRepository.getUserPermissions(userId);
            const updates = [];
            newPermissions.forEach(newPermiso => {
                const currentPermiso = currentPermissions.find(cp => cp.id === newPermiso.id);
                if (currentPermiso && this.hasDifferences(currentPermiso, newPermiso)) {
                    updates.push({
                        userId: userId,
                        permissionId: currentPermiso.id,
                        data: {
                            inactivo: newPermiso.inactivo,
                            ver: newPermiso.ver,
                            administrar: newPermiso.administrar,
                            todo: newPermiso.todo,
                            propietario: newPermiso.propietario,
                        },
                    });
                }
            });
            return updates;
        } catch (error) {
            throw(error)
        }
    }
    //Verifica si hay diferencias entre los permisos actuales y los nuevos
    //Realiza el cambio a booleanos los permisos que vienen de la db
    hasDifferences(currentPermiso, newPermiso) {
         // Convierte los valores numéricos a booleanos para la comparación
        const toBoolean = (value) => !!value;
        return toBoolean(currentPermiso.inactivo) !== toBoolean(newPermiso.inactivo) ||
            toBoolean(currentPermiso.ver) !== toBoolean(newPermiso.ver) ||
            toBoolean(currentPermiso.administrar) !== toBoolean(newPermiso.administrar) ||
            toBoolean(currentPermiso.todo) !== toBoolean(newPermiso.todo) ||
            toBoolean(currentPermiso.propietario) !== toBoolean(newPermiso.propietario);
    }
    //Realiza un ciclo for para los diferentes permisos
    async updatePermissions(updates) {
        for (const update of updates) {
            await UserRepository.updatePermission(update.userId,update.permissionId, update.data);
        }
    }
    //Realiza el update de sub user, cualquier campo que se quiera actualizar
    async updateSubUserService(userId, updateFields) {
        let existingSubusuario;
        try {
            existingSubusuario = await UserRepository.findsubUserById(userId);
        } catch (error) {
            throw new CustomError(500, 'Error al buscar el subusuario', { detail: error.message });
        }
        if (!existingSubusuario) {
            throw new CustomError(404, 'Subusuario no encontrado');
        }
        const fieldsToUpdate = {};
        Object.keys(updateFields).forEach(field => {
            if (updateFields[field] !== existingSubusuario[field]) {
                fieldsToUpdate[field] = updateFields[field];
            }
        });
        if (Object.keys(fieldsToUpdate).length === 0) {
            throw new CustomError(400, 'No hay cambios para actualizar');
        }
        try {
            await UserRepository.updateSubusuario({ id: userId, ...fieldsToUpdate });
            return { success: true, message: 'Subusuario actualizado correctamente' };
        } catch (error) {
            throw error; 
        }
    }
    async updatesSubUserPermisos(userId, permisos) {
        for (const permiso of permisos) {
            const { idPermiso, columnas } = permiso;
            const updates = { ver: false, administrar: false, inactivo: false, todo: false, propietario: false };
            for (const columna of columnas) {
                if (columna === 'todo') {
                    updates.todo = true;
                    updates.propietario = false;
                } else if (columna === 'propietario') {
                    updates.todo = false;
                    updates.propietario = true;
                } else {
                    updates[columna] = true;
                }
            }
            try {
                await UserRepository.updatePermiso(userId, idPermiso, updates);
            } catch (error) {
                throw new CustomError(500, `Error al actualizar permisos para el usuario ${userId}`, { detail: error.message });
            }
        }
    }
}

export default new UserService();