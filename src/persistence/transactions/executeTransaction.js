import { prisma } from "../../utils/dependencys/injection.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
async function executeTransactions(operations) {
    try {
        const result = await prisma.$transaction(operations);
        return result; // Puede que quieras retornar el resultado directamente sin formatearlo como string
    } catch (error) {
        throw new CustomError(500, 'Transaction failed', error);
    }
}

export default executeTransactions;
