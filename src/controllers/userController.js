import userService from "../services/userService.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { validatePassword } from "../utils/password/validatesPassword.js"
import { ResponseHandler } from "../utils/dependencys/injection.js";
import { createHash } from "../utils/password/hashPass.js";
import userRepository from "../persistence/repositorys/userRepository.js";
//Funciones que interactuan con Service, se encargan de las respuestas al cliente
//Realiza el login del usuario
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await userService.login(email, password);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res, error)
    }
}
//Realiza el registro del usuario 
export const signUpController = async (req, res, next) => {
    const { nombre, apellido, email, celular, fecha_de_nacimiento, password, passwordConfirm } = req.body;
    const validationResult = validatePassword(password, passwordConfirm)
    if (!validationResult.isValid){
        ResponseHandler.HandleError(res, validationResult.message)
    }
    try {
        const passwordHash = createHash(password)
        const result = await userService.signUpUsuario(nombre, apellido, email, celular, fecha_de_nacimiento, passwordHash);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res, error)
    }
}
//Realiza el registro del sub usuario
export const signUpSubUsuarioController = async (req, res, next) => {
    const { user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, permisos } = req.body;
    try {
        const result = await userService.signUpSubUsuario(user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, permisos);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res, error)
    }
}
//Realiza el update de un subUsuario
export const updateSubUser = async (req, res, next) => {
    const { userId } = req.params;
    const {updateFields, permisos: newPermisos } = req.body;
    try {
        // Preparar las actualizaciones de permisos basadas en la comparación de los actuales con los nuevos
        const updates = await userService.preparePermissionsUpdate(userId, newPermisos);
        // Si hay actualizaciones que realizar, llamar al método para actualizar los permisos
        if (updates.length > 0) {
            await userService.updatePermissions(updates);
            await userService.updateSubUserService(userId, updateFields);
            ResponseHandler.Ok(res, { message: "Permisos y Usuario actualizados correctamente."});
        } else {
            // Si no hay diferencias, es decir, no hay actualizaciones que realizar
            await userService.updateSubUserService(userId, updateFields);
            ResponseHandler.Ok(res, { message: "No se encontraron cambios en los permisos, se actualizaron solo los datos del sub user" });
        }
    } catch (error) {
        ResponseHandler.HandleError(res, error);
    }
}
//Realiza la validacion del token, y si existe, continua con la restauracion de la contraseña
export const configPasswordSubUser = async (req, res, next) => {
    const { token } = req.query;
    if (!token) {
        ResponseHandler.Unauthorized(res, "Falta el token.");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
        const userId = decodedToken.userId
        const user = await userService.getSubUserById(userId)
        ResponseHandler.Ok(res, user);  
    } catch (error) {
        ResponseHandler.HandleError(res, error);
    }
}
//Realiza el seteo de contraseña del nuevo sub usuario
export const setpassForSubUser = async (req, res, next) => {
    const { userId, password, passwordConfirm } = req.body;
    const validationResult = validatePassword(password, passwordConfirm)
    if (!validationResult.isValid){
        ResponseHandler.HandleError(res, validationResult.message)
    }
    try {
        const passwordHashed = createHash(password)
        await userService.createPasswordForSubUser(userId, passwordHashed);
        ResponseHandler.Ok(res, { message: result });
    } catch (error) {
        ResponseHandler.HandleError(res, error);
    }
}

// ENDPOINT PARA REALIZAR TEST DE FUNCION:
//Realiza el registro del usuario 
export const testController = async (req, res, next) => {
    
}