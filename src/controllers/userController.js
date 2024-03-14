import userService from "../services/userService.js";

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await userService.login(email, password);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ login: false, message: err.message });
    }
}
export const signUpController = async (req, res, next) => {
    const { nombre, apellido, email, celular, fecha_de_nacimiento, password } = req.body;
    try {
        const result = await userService.signUp(nombre, apellido, email, celular, fecha_de_nacimiento, password);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
}
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const result = await userService.updateUserService(id, updateFields);
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
}