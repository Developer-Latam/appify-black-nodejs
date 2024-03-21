import "dotenv/config"
import { createTransport } from "nodemailer";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { getConfigPasswordTemplateHTML } from "./templateEmail/configYourPasswordTemplate.js"
// la direccion de destino se envia a un email temporal sacado de "https://tempail.com/"
const transporterGmail = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD_APP,
    },
});
const createPasswordMessage = {
    from: process.env.GMAIL_USER,
    to: "",
    subject: "Te damos la bienvenida",
    text: "",
    html: ""
}
//Realiza el envio de email
export const sendEmail = async (email, userId) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_TOKEN_SECRET, {expiresIn: '24h'});
        // Construir el link con el token como parametro
        const linkDeConfiguracion = `http://localhost:8080/config-password?token=${token}`;
        // Genera el contenido HTML con el enlace incluido
        const htmlContent = getConfigPasswordTemplateHTML(linkDeConfiguracion);
        createPasswordMessage.to = email;
        createPasswordMessage.html = htmlContent;
        const response = await transporterGmail.sendMail(createPasswordMessage);
        return `Te llegara un mail a ${response.accepted}`
    } catch (error) {
        console.error(error);
        throw new Error('Error al enviar el correo.');
    }
}