import { prisma } from "../../../utils/dependencys/injection.js";

class cuentasRepository {


    async createCuentaBanco(data) {
        return prisma.cuentas_banco.create({
            data: data
        });
    }

    async createCuentaBancoConciliacion(data) {
        return prisma.cuenta_banco_conciliacion.create({
            data: data
        });
    }

    async createCategoriaCuenta(data) {
        return prisma.categoria_cuenta.create({
            data: data
        });
    }

    async createCuentaTipoDocumento(data) {
        return prisma.cuenta_tipo_documento.create({
            data: data
        });
    }

    async createBanco(data) {
        return prisma.bancos.create({
            data: data
        });
    }

    async createCondicionPago(data) {
        return prisma.condicion_pago.create({
            data: data
        });
    }

    async createCondicionesCondicionPago(data) {
        return prisma.condiciones_condicion_pago.create({
            data: data
        });
    }


    async findCuentaBancoById(id) {
        return prisma.cuentas_banco.findUnique({
            where: { id: id }
        });
    }

    async findCuentaBancoConciliacionById(id) {
        return prisma.cuenta_banco_conciliacion.findUnique({
            where: { id: id }
        });
    }

    async findCategoriaCuentaById(id) {
        return prisma.categoria_cuenta.findUnique({
            where: { id: id }
        });
    }

    async findCuentaTipodocumentoById(id) {
        return prisma.cuenta_tipo_documento.findUnique({
            where: { id: id }
        });
    }

    async findBancoById(id) {
        return prisma.bancos.findUnique({
            where: { id: id }
        });
    }

    async findCondicionPagoById(id) {
        return prisma.condicion_pago.findUnique({
            where: { id: id }
        });
    }

    async findCondicionesCondicionPagoById(id) {
        return prisma.condiciones_condicion_pago.findUnique({
            where: { id: id }
        });
    }


    async findAllCuentasBancoByUserId(userId) {
        return prisma.cuentas_banco.findMany({
            where: { user: userId }
        });
    }

    async findAllCuentasBancoConciliacionByUserId(userId) {
        return prisma.cuenta_banco_conciliacion.findMany({
            where: { user: userId }
        });
    }

    async findAllCategoriasCuentaByUserId(userId) {
        return prisma.categoria_cuenta.findMany({
            where: { user: userId }
        });
    }

    async findAllCuentaTipoDocumentoByUserId(userId) {
        return prisma.cuenta_tipo_documento.findMany({
            where: { user: userId }
        });
    }

    async findAllBancosByUserId(userId) {
        return prisma.bancos.findMany({
            where: { user: userId }
        });
    }

    async findAllCondicionPagoByUserId(userId) {
        return prisma.condicion_pago.findMany({
            where: { user: userId }
        });
    }

    


    async updatePagos(id, updateData) {
        return prisma.pagos.update({
            where: { id: id },
            data: updateData
        });
    }

    async updatePagosFC(id, updateData) {
        return prisma.pagos_factura_compra.update({
            where: { id: id },
            data: updateData
        });
    }
    

    async updatePagosNC(id, updateData) {
        return prisma.pagos_factura_nota_credito.update({
            where: { id: id },
            data: updateData
        });
    }


    async deletePagos(id) {
        return prisma.pagos.delete({
            where: { id: id }
        });
    }

    async deletePagosFCByCobroId(id) {
        return prisma.pagos_factura_compra.delete({
            where: { id: id }
        });
    }


    async deletePagosNCByCobroId(id) {
        return prisma.pagos_factura_nota_credito.delete({
            where: { id: id }
        });
    }

}


export default new cuentasRepository()