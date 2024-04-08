import { prisma } from "../../utils/dependencys/injection.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
async function executeTransactions(operations) {
    try {
        console.log("ACA ESTAN LAS OPERACIONES QUE LLEGARON A MI FUNCION executeTransactions",operations)
        const result = await prisma.$transaction(operations);
        console.log(`Operaciones completadas exitosamente`);
        return result; // Puede que quieras retornar el resultado directamente sin formatearlo como string
    } catch (error) {
        throw new CustomError(500, 'Transaction failed', error);
    }
}

export default executeTransactions;
