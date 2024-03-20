import { PrismaClient } from "@prisma/client";
import { connectionDB } from "../db/connection.js";

const prisma = new PrismaClient();

//Clase que interactua con la db mediante las querys a las diferentes tablas
class UserRepository {
    //Encuentra un usuario mediante su email y password
    async findUserByEmailAndPassword(email, password) {
        try {
            //const [response] = await connectionDB.execute('SELECT * FROM subusuarios WHERE email = ? AND password = ?', [email, password]);
            const response = await prisma.subusuarios.findFirst({
                where: {
                  email: email,
                  password: password
                }
            });
            return response;
        } catch (error) {
            throw error(error)
        }
    }
    //Me trae los diferentes permisos segun el id de usuario
    async getUserPermissions(userId) {
        try {
            //const [permisos] = await connectionDB.execute('SELECT permisos.categoria, permisos.subcategoria, permisos_de_usuario.inactivo, permisos_de_usuario.ver, permisos_de_usuario.administrar, permisos_de_usuario.todo, permisos_de_usuario.propietario FROM permisos INNER JOIN permisos_de_usuario ON permisos_de_usuario.idPermiso = permisos.id WHERE permisos_de_usuario.user = ?', [userId]);
            const permisos = await prisma.$queryRaw`SELECT permisos.categoria, permisos.subcategoria, permisos_de_usuario.inactivo, permisos_de_usuario.ver, permisos_de_usuario.administrar, permisos_de_usuario.todo, permisos_de_usuario.propietario FROM permisos INNER JOIN permisos_de_usuario ON permisos_de_usuario.idPermiso = permisos.id WHERE permisos_de_usuario.user = ${userId}`
            return permisos;
        } catch (error) {
            throw error(error) 
        }
    }
    //Verifica si el usuario existe por su email y devuelve true o false
    async userExists(email) {
        //const [response] = await connectionDB.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        const response = await prisma.usuarios.findFirst({  
            where:{
                email : email
            }
        })
        
        return response;
    }
    //Verifica si el subusuario existe por su email y devuelve true o false
    async subUserExists(email) {
        //const [response] = await connectionDB.execute('SELECT * FROM subusuarios WHERE email = ?', [email]);
        const response = await prisma.subusuarios.findFirst({  
            where:{
                email : email
            }
        })
        return response;
    }
    //Verifica si el usuario existe por su id y devuelve true o false
    async userExistsById(id) {
        //const [response] = await connectionDB.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
        const response = await prisma.usuarios.findUnique({
            where:{
                id : id
            }
        })
        return response;
    }
    //Realiza la creacion de usuario
    async createUser(id, nombre, apellido, email, celular, fecha_de_nacimiento, password) {
        //await connectionDB.execute('INSERT INTO usuarios (id, nombre, apellido, email, celular, fecha_de_nacimiento, password) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, nombre, apellido, email, celular, fecha_de_nacimiento, password]);
        await prisma.usuarios.create({
            data: {
              id: id,
              nombre: nombre,
              apellido: apellido,
              email: email,
              celular: celular,
              fecha_de_nacimiento: fecha_de_nacimiento,
              password: password
            }
        });
        //await connectionDB.execute('INSERT INTO subusuarios (id, user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, ref_superusuario, checkeado, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, id, nombre, apellido, email, celular, fecha_de_nacimiento, null, 1, 1, password]);
        await prisma.subusuarios.create({
            data: {
              id: id,
              user:id,
              nombre: nombre,
              apellido: apellido,
              email: email,
              celular: celular,
              fecha_de_nacimiento: fecha_de_nacimiento,
              cargo:null,
              ref_superusuario:1,
              checkeado:1,
              password: password
            }
        });
    }
    //Realiza la creacion de usuario
    async createSubUser(id,user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo) {
        //await connectionDB.execute('INSERT INTO subusuarios (id, user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, ref_superusuario, checkeado, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, 0, 0, null]);
        await prisma.subusuarios.create({
            data: {
              id: id,
              user:user,
              nombre: nombre,
              apellido: apellido,
              email: email,
              celular: celular,
              fecha_de_nacimiento: fecha_de_nacimiento,
              cargo: cargo,
              ref_superusuario:0,
              checkeado:0,
              password: null
            }
        });
    }
    //Busca el subusuario por su id y lo retorna
    async findsubUserById(id) {
        //const [rows] = await connectionDB.execute('SELECT * FROM subusuarios WHERE id = ?', [id]);
        const rows = await prisma.subusuarios.findUnique({
            where:{
                id : id
            }
        })
        return rows;
    }
    //Actualiza un sub usuario
    //Se hace una query custom para tomar los campos a actualizar y colocarlos en la query
    async updateSubusuario({ id, ...fieldsToUpdate }) {
        const result = await prisma.subusuarios.update({
            where: { id: id },
            data: fieldsToUpdate
        });
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
                await prisma.permisos_de_usuario.create({
                    data:{
                        idPermiso: permiso.id,
                        user: idSubUsuario,
                        inactivo: permiso.inactivo,
                        ver: permiso.ver,
                        administrar: permiso.administrar ,
                        todo: permiso.todo,
                        propietario: permiso.propietario
                    }
                })
            }
        } catch (error) {
            throw error(error)
        }
    }
    //Elimina un sub user por su id
    async deleteSubUserByID(id) {
        //const [rows] = await connectionDB.execute('DELETE FROM subusuarios WHERE id = ?', [id]);
        const rows = await prisma.subusuarios.deleteMany({
            where: {
              id: id
            }
          });
        return rows;
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