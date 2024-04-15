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



    async updateCuentasBanco(id, updateData) {
        return prisma.cuentas_banco.update({
            where: { id: id },
            data: updateData
        });
    }

    async updateCategoriaCuenta(id, updateData) {
        return prisma.categoria_cuenta.update({
            where: { id: id },
            data: updateData
        });
    }
    

    async updateCuentaTipoDoc(id, updateData) {
        return prisma.cuenta_tipo_documento.update({
            where: { id: id },
            data: updateData
        });
    }

    async updateBanco(id, updateData) {
        return prisma.bancos.update({
            where: { id: id },
            data: updateData
        });
    }

    async updateCondicionPago(id, updateData) {
        return prisma.condicion_pago.update({
            where: { id: id },
            data: updateData
        });
    }

    async updateCondicionesCondicionPago(id, updateData) {
        return prisma.condiciones_condicion_pago.update({
            where: { id: id },
            data: updateData
        });
    }
}


export default new cuentasRepository()