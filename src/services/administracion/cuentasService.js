import cuentasRepository from "../../persistence/repositorys/administracion/cuentasRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";

class cuentasService {

    async createCuentasBanco(data) {
        const id = idgenerate("Cuenta-banco");
        
        return  cuentasRepository.createCuentaBanco({ ...data, id: id });
    }

    async createCuentaBancoConciliacion(data) {
        const id = idgenerate("Cuenta-banco-conciliacion");
        
        return  cuentasRepository.createCuentaBancoConciliacion({ ...data, id: id });
    }

    async createCategoriaCuenta(data) {
        const id = idgenerate("Categoria-cuenta");
        
        return  cuentasRepository.createCategoriaCuenta({ ...data, id: id });
    }

    async createCuentaTipoDocumento(data) {
        const id = idgenerate("Cuenta-tipo-doc");
        
        return  cuentasRepository.createCuentaTipoDocumento({ ...data, id: id });
    }

    async createBanco(data) {
        const id = idgenerate("Banco-");
        
        return  cuentasRepository.createBanco({ ...data, id: id });
    }

    async createCondicionPago(data) {

        try{
            const id = idgenerate("Condicion-pago");
            const idCPago = idgenerate("Condiciones-Pago")

            const {condicion_pago, condiciones_condicion_pago} = data;

            const CondicionPago = await cuentasRepository.createCondicionPago({ ...condicion_pago, id: id });

            const CondicionesCondicionPago = await cuentasRepository.createCondicionesCondicionPago({ ...condiciones_condicion_pago, id: idCPago, idCondicion : id });

            return [CondicionPago, CondicionesCondicionPago];
        } catch (error) {
            console.error("Error al crear condicion de pago y respectivas condiciones:", error);
            throw error;
        }
        
    }
    

    async getCuentaBancoById(id) {
        return cuentasRepository.findCuentaBancoById(id);
    }

    async getCuentaBancoConciliacionId(id) {
        return cuentasRepository.findCuentaBancoConciliacionById(id);
    }


    async getCategoriaCuentaById(id) {
        return cuentasRepository.findCategoriaCuentaById(id);
    }

    async getCuentaTipodocumentoById(id) {
        return cuentasRepository.findCuentaTipodocumentoById(id);
    }

    async getCondicionPagoById(id) {
        return cuentasRepository.findCondicionPagoById(id);
    }

    async getCondicionesCondicionPagoById(id) {
        return cuentasRepository.findCondicionesCondicionPagoById(id);
    }

    async getAllCuentasBancoByUserId(id) {
        return cuentasRepository.findAllCuentasBancoByUserId(id);
    }

    async getAllCuentasBancoConciliacionByUserId(id) {
        return cuentasRepository.findAllCuentasBancoConciliacionByUserId(id);
    }

    async getAllCategoriasCuentaByUserId(id) {
        return cuentasRepository.findAllCategoriasCuentaByUserId(id);
    }

    async getAllCuentasTipoDocumentoByUserId(id) {
        return cuentasRepository.findAllCuentaTipoDocumentoByUserId(id);
    }

    async getAllBancosByUserId(id) {
        return cuentasRepository.findAllBancosByUserId(id);
    }

    async getAllCondicionPagoByUserId(id) {
        return cuentasRepository.findAllCondicionPagoByUserId(id);
    }

    async updateCuentasBanco(id, updateData) {
        return cuentasRepository.updateCuentasBanco(id, updateData);
    }

    async updateCategoriaCuenta(id, updateData) {
        return cuentasRepository.updateCategoriaCuenta(id, updateData);
    }

    async updateCuentaTipoDoc(id, updateData) {
        return cuentasRepository.updateCuentaTipoDoc(id, updateData);
    }

    async updateBanco(id, updateData) {
        return cuentasRepository.updateBanco(id, updateData);
    }

    async updateCondicionPago(id, updateData) {
        return cuentasRepository.updateCondicionPago(id, updateData);
    }

    async updateCondicionesCondicionPago(id, updateData) {
        return cuentasRepository.updateCondicionesCondicionPago(id, updateData);
    }


}


export default new cuentasService()