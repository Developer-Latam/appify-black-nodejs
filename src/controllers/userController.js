import userService from "../services/userService.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { validatePassword } from "../utils/password/validatesPassword.js"
//Funciones que interactuan con Service, se encargan de las respuestas al cliente
//Realiza el login del usuario
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await userService.login(email, password);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ login: false, message: err.message });
    }
}
//Realiza el registro del usuario 
export const signUpController = async (req, res, next) => {
    const { nombre, apellido, email, celular, fecha_de_nacimiento, password } = req.body;
    try {
        const result = await userService.signUpUsuario(nombre, apellido, email, celular, fecha_de_nacimiento, password);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
}
//Realiza el registro del sub usuario
export const signUpSubUsuarioController = async (req, res, next) => {
    const { user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, permisos } = req.body;
    try {
        const result = await userService.signUpSubUsuario(user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, permisos);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ ok: false, message: err });
    }
}
//Realiza el update de un subUsuario
export const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const {updateFields, permisos} = req.body;
        const result = await userService.updateSubUserService(userId, updateFields);
        const result2 = await userService.updatesSubUserPermisos(userId,permisos)
        res.json(result, result2);
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
}
//Realiza la validacion del token, y si existe, continua con la restauracion de la contraseña
export const configPasswordSubUser = async (req, res, next) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).send("Falta el token.");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
        const userId = decodedToken.userId
        console.log(userId)
        const user = await userService.getSubUserById(userId)
        res.json(user)    
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
}
//Realiza el seteo de contraseña del nuevo sub usuario
export const setpassForSubUser = async (req, res, next) => {
    const { userId, password, passwordConfirm } = req.body;
    const validationResult = validatePassword(password, passwordConfirm)
    if (!validationResult.isValid){
        return res.status(400).json({success: false, message: validationResult.message})
    }
    try {
        await userService.createPasswordForSubUser(userId, password);
        res.json({ success: true, message: "Contraseña configurada correctamente."});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error al configurar la contraseña." });
    }
}