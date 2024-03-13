import UserRepository from "../persistence/repositorys/userRepository.js";
import { idgenerate } from "../utils/idGenerate.js";
class UserService {
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
    async login(email, password) {
        try {
            const users = await UserRepository.findUserByEmailAndPassword(email, password);
        if (users.length === 1) {
            const user = users[0];
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
    async signUp(nombre, apellido, email, celular, fecha_de_nacimiento, password) {
        const userExists = await UserRepository.userExists(email);
        if (!userExists) {
            const id = idgenerate("super-user");
            await UserRepository.createUser(id, nombre, apellido, email, celular, fecha_de_nacimiento, password);
            return { ok: true, message: 'usuario creado!' };
        } else {
            throw new Error('ya existe');
        }
    }
    async updateSubusuario(id, updateFields) {
        const existingSubusuario = await UserRepository.findSubusuarioById(id);
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
        await UserRepository.updateSubusuario({ id, ...fieldsToUpdate });
        return { success: true, message: 'Subusuario actualizado correctamente' };
    }
    async createSubUser(nombre, apellido, email, celular, fecha_de_nacimiento, cargo) {
        
    }
}

export default new UserService();