import { idgenerate } from "../../utils/id/idGenerate.js";
import conciliacionRepository from "../../persistence/repositorys/conciliacion/conciliacionRepository.js";

class conciliacionService {

    async saveBankData(jsonData) {
        try {
            const { data } = jsonData;
            const { username } = idgenerate('temp-user')
            const { id: link_id_banco, holder_id, link_token, accounts } = data;

            // Crear el registro en la tabla link_fintoc_bancos
            const linkData = {
                conciliacion_id: data.id,
                link_id_banco,
                link_token,
                holder_id,
                user: username
            };
            await conciliacionRepository.createLink(linkData);

            // Crear registros en la tabla CuentasBancarias
            for (const account of accounts) {
                const cuentaData = {
                    cuenta_id: account.id,
                    conciliacion_id: data.id,
                    account_id: account.id,
                    tipo: account.type,
                    numero: account.number,
                    nombre: account.name,
                    saldo_disponible: account.balance.available,
                    saldo_actual: account.balance.current,
                    moneda: account.currency
                };
                await conciliacionRepository.createCuentaBancaria(cuentaData);
            }

            console.log('Datos de bancos y cuentas bancarias guardados correctamente.');
        } catch (error) {
            console.error('Error al guardar datos de bancos y cuentas bancarias:', error);
        }
    }

    async createMovimientos(data) {

        return conciliacionRepository.createMovimientos(data);
    }

    async getLinkByUserId(userId){

        return conciliacionRepository.findLinkByUserId(userId);

    }

    async getCuentasByCuentaId(cuentaId){

        return conciliacionRepository.findCuentasByCuentaId(cuentaId);
        
    }

    async getMovimientosById(id){

        return conciliacionRepository.findMovimientosById(id);
        
    }

    async getConciliacionesByUserId(userId) {

        return conciliacionRepository.findConciliacionesByUserId(userId);

    }

    async getCuentasBancariasByConciliacionId(conciliacionId){

        return conciliacionRepository.findCuentasBancariasByConciliacionId(conciliacionId);
        
    }

    async getMovimientosByCuentaId(cuentaId) {

        return conciliacionRepository.findMovimientosByCuentaId(cuentaId);
    }

    async updateUserConciliacion(id, userId) {

        return conciliacionRepository.updateUserConciliacion(id, userId);
    }
}

export default new conciliacionService();




