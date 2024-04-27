import userService from "../../services/miempresa/userService.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { validatePassword } from "../../utils/password/validatesPassword.js"
import { ResponseHandler } from "../../utils/dependencys/injection.js";
import { createHash } from "../../utils/password/hashPass.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
//Funciones que interactuan con Service, se encargan de las respuestas al cliente
//Realiza el login del usuario
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
     // Validación básica
    if (!email || !password) {
        throw new CustomError(400, "Bad Request", { detail: "Email and password are required." });
    }
    try {
        const result = await userService.login(email, password);
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
        return res.status(400).json({ 
            status: 400,
            message: 'Bad Request',
            error: validationResult.message
        });
    }
    try {
        const passwordHashed = createHash(password)
        const result = await userService.createPasswordForSubUser(userId, passwordHashed);
        ResponseHandler.Ok(res, { message: result });
    } catch (error) {
        ResponseHandler.HandleError(res, error);
    }
}
//Realiza el seteo de contraseña del nuevo usuario
export const setpassForUser = async (req, res, next) => {
    const { userId, password, passwordConfirm } = req.body;
    const validationResult = validatePassword(password, passwordConfirm)
    if (!validationResult.isValid){
        return res.status(400).json({ 
            status: 400,
            message: 'Bad Request',
            error: validationResult.message
        });
    }
    try {
        const passwordHashed = createHash(password)
        const result = await userService.resetPasswordUserPrincipal(userId, passwordHashed);
        ResponseHandler.Ok(res, { message: result });
    } catch (error) {
        ResponseHandler.HandleError(res, error);
    }
}
export const getDataUserController = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await userService.getDataUser(id);
        ResponseHandler.Ok(res, result);
    } catch (error) {
        ResponseHandler.HandleError(res, error);
    }
}
export const getAllUsersActController = async (req, res, next) => {
    try {
        const {userId} = req.params
        const result = await userService.getAllUsersActivos(userId);
        ResponseHandler.Ok(res, result);
    } catch (error) {
        ResponseHandler.HandleError(res, error);
    }
}
export const getAllUsersInactController = async (req, res, next) => {
    try {
        const {userId} = req.params
        const result = await userService.getAllUsersInactivos(userId);
        ResponseHandler.Ok(res, result);
    } catch (error) {
        ResponseHandler.HandleError(res, error);
    }
}
// ENDPOINT PARA REALIZAR TEST DE FUNCION:
//Realiza el registro del usuario 
export const testController = async (req, res, next) => {
    const { token } = req.query;
    if (!token) {
        ResponseHandler.Unauthorized(res, "Falta el token.");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_MAIL)
        const data = decodedToken.userId
        const user = await userService.resetPasswordUserPrincipal(data, passwordHashed)
        ResponseHandler.Ok(res, user);
    } catch (error) {
        console.log(error)
        ResponseHandler.HandleError(res, error);
    }
}