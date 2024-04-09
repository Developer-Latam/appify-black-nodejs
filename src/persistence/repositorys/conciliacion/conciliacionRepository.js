import { prisma } from "../../../utils/dependencys/injection.js";



class conciliacionRepository {
    async createLink(data) {
        return prisma.link_fintoc_bancos.create({
            data: data
        });
    }

    async createCuentaBancaria(data) {
        return prisma.CuentasBancarias.create({
            data: data
        });
    }

    
    async createMovimientos(data) {
        // Si el dato recibido es un objeto iterable (como una lista)
        if (Symbol.iterator in Object(data)) {
            // Iterar sobre cada movimiento en la lista
            for (const movimiento of data) {
                await insertarMovimiento(movimiento);
            }
        } else {
            // Si el dato recibido no es iterable, asumimos que es un solo movimiento
            await insertarMovimiento(data);
        }
    }
    
    async insertarMovimiento(movimiento) {
        try {
            // Verificar si el movimiento ya existe en la base de datos
            const existingMovimiento = await prisma.movimientos_cuenta.findUnique({
                where: {
                    id: movimiento.id // Suponiendo que el ID del movimiento es único
                }
            });
    
            // Si el movimiento no existe en la base de datos, procede a insertarlo
            if (!existingMovimiento) {
                await prisma.movimientos_cuenta.create({
                    data: movimiento
                });
                console.log(`Movimiento con ID ${movimiento.id} insertado correctamente.`);
            } else {
                console.log(`Movimiento con ID ${movimiento.id} ya existe en la base de datos. Omitiendo inserción.`);
            }
        } catch (error) {
            console.error(`Error al insertar el movimiento con ID ${movimiento.id}: ${error.message}`);
        }
    }

    async findLinkByUserId(userid) {
        return prisma.link_fintoc_bancos.findUnique({
            where: { user: userid }
        });
    }

    async findCuentasByCuentaId(cuentaId) {
      return prisma.CuentasBancarias.findUnique({
          where: { cuenta_id : cuentaId }
      });
    }

    async findMovimientosById(id) {
      return prisma.movimientos_cuenta.findUnique({
          where: { id: id }
      });
    }

    async findConciliacionesByUserId(userId) {
      return prisma.link_fintoc_bancos.findMany({
          where: { user: userId }
      });
    }


    async findCuentasBancariasByConciliacionId(conciliacionId) {
      return prisma.CuentasBancarias.findMany({
          where: { conciliacion_id: conciliacionId }
      });
    }

    async findMovimientosByCuentaId(cuentaId) {
      return prisma.movimientos_cuenta.findMany({
          where: { cuenta_id: cuentaId }
      });
    }

    async updateUserConciliacion(id, userId) {
        return prisma.link_fintoc_bancos.update({
            where: { id: id },
            user: userId
        });
    }

}

export default new conciliacionRepository();