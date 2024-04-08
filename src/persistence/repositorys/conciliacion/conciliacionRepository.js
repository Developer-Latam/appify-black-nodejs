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

    
    async createMovimiento(data) {
        return prisma.movimientos_cuenta.create({
            data: data
        });
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
      return prisma.movimientos_cuenta.findMany({
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