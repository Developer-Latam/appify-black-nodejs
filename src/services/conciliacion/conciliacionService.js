import { idgenerate } from "../../utils/id/idGenerate.js";
import conciliacionRepository from "../../persistence/repositorys/conciliacion/conciliacionRepository.js";

import { CustomError } from "../../utils/httpRes/handlerResponse.js";

class conciliacionService {
    async saveBankData(jsonData) {
        try {
            const { data } = jsonData;
            const username = idgenerate('temp-user');
            const { id: link_id_banco, holder_id, link_token, accounts } = data;
            // Crear el registro en la tabla link_fintoc_bancos
            const linkData = {
                conciliacion_id: data.id,
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
            } else {
                // Si solo hay una cuenta, crea el registro directamente
                const cuentaData = {
                    cuenta_id: accounts.id,
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
        } catch (error) {
            throw error
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
        try {
            return conciliacionRepository.findLinkByUserId(userId);
        } catch (error) {
            throw error;
        }
    }
    async getCuentasByCuentaId(cuentaId){
        try {
            return conciliacionRepository.findCuentasByCuentaId(cuentaId);
        } catch (error) {
            throw error;
        }
    }
    async getMovimientosById(id){
        try {
            return conciliacionRepository.findMovimientosById(id);
        } catch (error) {
            throw error;
        }
    }
    async getConciliacionesByUserId(userId) {
        try {
            return conciliacionRepository.findConciliacionesByUserId(userId);
        } catch (error) {
            throw error;
        }
    }
    async getCuentasBancariasByConciliacionId(conciliacionId){
        try {
            return conciliacionRepository.findCuentasBancariasByConciliacionId(conciliacionId);
        } catch (error) {
            throw error;
        }
    }
    async getMovimientosByCuentaId(cuentaId) {
        try {
            return conciliacionRepository.findMovimientosByCuentaId(cuentaId);
        } catch (error) {
            throw error;
        }
    }
    async updateUserConciliacion(id, user) {
        try {
            const updateData = { user }; 
            return conciliacionRepository.updateUserConciliacion(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async updateCuentaBancariaById(id, accId) {
        try {
            const updateData = {activo: accId}; 
            return conciliacionRepository.updateCuentaBancariaById(id, updateData);
        } catch (error) {
            throw error;
        }
    }
}
export default new conciliacionService();