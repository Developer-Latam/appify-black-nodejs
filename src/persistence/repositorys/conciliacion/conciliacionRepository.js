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

    async insertarMovimiento(movimiento) {
        try {
            // Verificar si el movimiento ya existe en la base de datos
            const existingMovimiento = await prisma.movimientos_cuenta.findUnique({
                where: {
                    id: movimiento.id
                }
            });
    
            // Si el movimiento no existe en la base de datos, procede a insertarlo
            if (!existingMovimiento) {

                const data = {
                    id: movimiento.id,
                    cuenta_id: movimiento.cuenta_id,
                    description: movimiento.description || null,
                    amount: movimiento.amount,
                    currency: movimiento.currency,
                    post_date: movimiento.post_date,
                    transaction_date: movimiento.transaction_date || null,
                    type: movimiento.type,
                    sender_account_holder_id: movimiento.sender_account?.holder_id || null,
                    sender_account_number: movimiento.sender_account?.number || null,
                    sender_account_institution_id: movimiento.sender_account?.institution?.id || null,
                    sender_account_institution_name: movimiento.sender_account?.institution?.name || null,
                    sender_account_institution_country: movimiento.sender_account?.institution?.country || null,
                    sender_account_name: movimiento.sender_account?.holder_name || null,
                    recipient_account_holder_id: movimiento.recipient_account?.holder_id || null,
                    recipient_account_number: movimiento.recipient_account?.number || null,
                    recipient_account_institution_id: movimiento.recipient_account?.institution?.id || null,
                    recipient_account_institution_name: movimiento.recipient_account?.institution?.name || null,
                    recipient_account_institution_country: movimiento.recipient_account?.institution?.country || null,
                    recipient_account_name: movimiento.recipient_account?.holder_name || null,
                    comment: movimiento.comment || null,
                    reference_id: movimiento.reference_id || null,
                    pending: movimiento.pending
                };

                await prisma.movimientos_cuenta.create({
                    data: data
                });
                console.log(`Movimiento con ID ${movimiento.id} insertado correctamente.`);
            } else {
                console.log(`Movimiento con ID ${movimiento.id} ya existe en la base de datos. Omitiendo inserción.`);
            }
        } catch (error) {
            console.error(`Error al insertar el movimiento con ID ${movimiento.id}: ${error.message}`);
        }
    }

    
    async createMovimientos(data) {
        // Si el dato recibido es un objeto iterable (como una lista)
        if (Symbol.iterator in Object(data)) {
            // Iterar sobre cada movimiento en la lista
            for (const movimiento of data) {
                await this.insertarMovimiento(movimiento);
            }
        } else {
            // Si el dato recibido no es iterable, asumimos que es un solo movimiento
            await this.insertarMovimiento(data);
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

    async updateUserConciliacion(id, updateData) {
        return prisma.link_fintoc_bancos.update({
            where: { conciliacion_id: id },
            data : updateData
            
        });
    }

    async updateCuentaBancariaById(id, updateData) {
        return prisma.CuentasBancarias.update({
            where: { cuenta_id: id },
            data : updateData
            
        });
    }

    

}

export default new conciliacionRepository();