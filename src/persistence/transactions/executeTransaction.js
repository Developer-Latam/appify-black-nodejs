import { prisma } from "../../utils/dependencys/injection.js";
async function executeTransactions(operations) {
    try {
        const result = await prisma.$transaction(operations);
        console.log(`Operaciones completadas exitosamente`);
        return result; // Puede que quieras retornar el resultado directamente sin formatearlo como string
    } catch (error) {
        console.error("Transaction failed: ", error);
        throw new Error('Transaction failed');
    }
}

export default executeTransactions;
