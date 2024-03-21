import userRepository from "../persistence/repositorys/userRepository.js";
import UserRepository from "../persistence/repositorys/userRepository.js";
import { idgenerate } from "../utils/idGenerate.js";
import { sendEmail } from "../utils/email/emailService.js";
import executeTransactions from "../persistence/transactions/executeTransaction.js";
import { createHash } from "../utils/hashPass.js";
//Clase que interactua con el Repository y se encarga de la logica de negocio
class UserService {
    //Me trae un sub usuario por su id
    async getSubUserById(subUserId) {
        const subUser = await UserRepository.findsubUserById(subUserId);
        if (!subUser) {
            return "El usuario no existe"
        } else {
            return subUser
        }
    }
    //Realiza la creacion de contraseña para un nuevo sub usuario
    async createPasswordForSubUser(subUserId, password) {
        const passwordHashed = createHash(password)
        await UserRepository.resetPasswordSubUser(subUserId, passwordHashed)
        return (`usuario con id: ${subUserId} creacion de contraseña correctamente`)
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
    //Realiza el logging
    async login(email, password) {
        try {
            //Busco el usuario y lo retorno
            const users = await UserRepository.findUserByEmailAndPassword(email, password);
            if (users.length === 1) {
                const user = users[0];
                //Si lo encuentro, verifico que la propíedad ref_superusuario que verificar si es superusuario o subuser y setea sus permisos de acuerdo a eso
                // 0 = subusuario
                // 1 = superusuario
                if (user.ref_superusuario === 0) {
                    const permisos = await UserRepository.getUserPermissions(user.id);
                    return { login: true, userType: "subusuario", permisos: await this.formatPermissions(permisos) };
                } else {
                    return { login: true, userType: "superusuario", permisos: "all" };
                }
        } else {
            throw error("Error de credenciales");
        }
        } catch (error) {
            throw error(error)
        }
    }
    //Realiza el registro de usuario
    async signUpUsuario(nombre, apellido, email, celular, fecha_de_nacimiento, password) {
        //Verifica si existe, y si no, realiza la generacion de su id, y posterior lo crea
        const userExists = await UserRepository.userExists(email);
        if (!userExists) {
            const id = idgenerate("super-user");
            await UserRepository.createUser(id, nombre, apellido, email, celular, fecha_de_nacimiento, password);
            return { ok: true, message: 'usuario creado!' };
        } else {
            throw new Error('ya existe');
        }
    }
    //Realiza el registro de un subusuario
    async signUpSubUsuario(user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, permisos) {
        try {
            //Verifica si existe, y si no, realiza la generacion de su id, y posterior lo crea 
            const subUserExists = await UserRepository.subUserExists(email);
            if (!subUserExists) {
                const id = idgenerate("sub-user");
                 // Preparar las operaciones para la transacción
                const createUserOperation = UserRepository.createSubUser(id, user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo);
                const createPermisosOperations = UserRepository.createPermisos(permisos, id);
                await executeTransactions([createUserOperation, ...createPermisosOperations])
                await sendEmail(email, id)
                return { ok: true, message: 'Subusuario creado y con permisos. Email enviado.'};
            } else {
                throw('Sub usuario ya existente');
            }
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }
    //Realiza el update de sub user
    async updateSubUserService(userId, updateFields) {
        const existingSubusuario = await UserRepository.findsubUserById(userId);
        if (!existingSubusuario) {
            throw new Error('Subusuario no encontrado');
        }
        // Comparar y construir el objeto de actualización solo con campos modificados
        const fieldsToUpdate = {};
        Object.keys(updateFields).forEach(field => {
            if (updateFields[field] !== existingSubusuario[field]) {
                fieldsToUpdate[field] = updateFields[field];
            }
        });
        if (Object.keys(fieldsToUpdate).length === 0) {
            throw new Error('No hay cambios para actualizar');
        }
        await UserRepository.updateSubusuario({ userId, ...fieldsToUpdate });

        return { success: true, message: 'Subusuario actualizado correctamente' };
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
        await userRepository.updatePermisosdeUsuario(userId, idPermiso, updates)
        }
    }
}

export default new UserService();