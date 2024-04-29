import { idgenerate } from "../../utils/id/idGenerate.js";
import conciliacionRepository from "../../persistence/repositorys/conciliacion/conciliacionRepository.js";

import { CustomError } from "../../utils/httpRes/handlerResponse.js";

class conciliacionService {

    async saveBankData(jsonData) {
        try {
            console.log(idgenerate('funciono'));
            const { data } = jsonData;
            const username = idgenerate('temp-user');
            console.log(username);
            const { id: link_id_banco, holder_id, link_token, accounts } = data;
    
            // Crear el registro en la tabla link_fintoc_bancos
            const linkData = {
                id: data.id,
                link_id_banco,
                link_token,
                holder_id,
                user: username // Incluye el username aquí
            };
            await conciliacionRepository.createLink(linkData);
    
            if (Array.isArray(accounts)) {
                // Iterar sobre cada movimiento en la lista
                for (const account of accounts) {
                    const cuentaData = {
                        id: account.id,
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
            } else {
                // Si solo hay una cuenta, crea el registro directamente
                const cuentaData = {
                    id: accounts.id,
                    conciliacion_id: data.id,
                    account_id: accounts.id,
                    tipo: accounts.type,
                    numero: accounts.number,
                    nombre: accounts.name,
                    saldo_disponible: accounts.balance.available,
                    saldo_actual: accounts.balance.current,
                    moneda: accounts.currency
                };
                await conciliacionRepository.createCuentaBancaria(cuentaData);
            }
    
            console.log('Datos de bancos y cuentas bancarias guardados correctamente.');
        } catch (error) {
            console.error('Error al guardar datos de bancos y cuentas bancarias:', error);
        }
    }
    async createMovimientos(data) {

        try{

            return conciliacionRepository.createMovimientos(data);
        } catch (error) {
            throw new CustomError('400', error)
        }
    }

    async createCuentaLink(id) {

        try{

            return conciliacionRepository.createCuentaBancariaLinkConciliacion(id);

        } catch (error) {

            throw new CustomError('400', error)
        }
    }

    async getCuentaLinkById(id){

        try{

            return conciliacionRepository.findLinkCuentasBancoConciliacionByCuentaId(id);

        } catch (error) {

            throw new CustomError('400', error)
        }

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

    async updateUserConciliacion(id, user) {
        const updateData = { user }; 
        return conciliacionRepository.updateUserConciliacion(id, updateData);
    }

    async updateCuentaBancariaById(id, accId) {
        const updateData = {activo: accId}; 
        return conciliacionRepository.updateCuentaBancariaById(id, updateData);
    }
}

export default new conciliacionService();




