import { prismaError } from "../dependencys/injection.js";
import { CustomError } from "./handlerResponse.js";
async function handlePrismaError(error) {
    if (error instanceof prismaError.PrismaClientValidationError) {
        // Error específico de Prisma por tipo de dato incorrecto
        throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
    } else {
        throw new CustomError(500, "Internal server error", {error: error.message});
    }
}

export default handlePrismaError;