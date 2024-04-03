import ItemSistemaRepository from "../../../persistence/repositorys/miempresa/configs/sistemaRepository.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
class ItemsSistemaService {
    async createSistema(empresa	, pais, idioma, correo_cobranza, moneda, moneda_secundaria, con_decimales, tasa_venta, tasa_compra, tasa_cambio, tolerancia, registro_entregas_autocompletar) {
        try {
            return ItemSistemaRepository.createSistema(empresa	, pais, idioma, correo_cobranza, moneda, moneda_secundaria, con_decimales, tasa_venta, tasa_compra, tasa_cambio, tolerancia, registro_entregas_autocompletar)
        } catch (error) {
            throw(error)
        }
    }
    async updateSistema(id, inputData) {
        try {
            const camposPermitidos = [
                'empresa', 'pais', 'idioma','correo_cobranza', 'moneda', 'moneda_secundaria',
                'con_decimales', 'tasa_venta', 'tasa_compra', 'tasa_cambio', 'tolerancia',
                'registro_entregas_autocompletar'
            ]
            //Contruyo un objeto de datos solo con los campos permitidos que tambien esten presentes en input data
            let dataToUpdate = {}
            camposPermitidos.forEach(campo =>{
                if (inputData.hasOwnProperty(campo)){
                    dataToUpdate[campo] = inputData[campo]
                }
            })
            if(Object.keys(dataToUpdate).length === 0){
                throw new CustomError(400, "No valid fields provided for update")
            }
            return await ItemSistemaRepository.updateSistema(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
    async createEmpresa(user, nombre, direccion_matriz, direccion_bodega, prefijo_tel, RUT, giro, pagina_web, prefijo_cel) {
        try {
            const empresaExist = await ItemSistemaRepository.getEmpresaByRUT(RUT)
            if(empresaExist){
                throw new CustomError(409, "Empresa ya existente con el RUT indicado", {empresaExist})
            }
            return ItemSistemaRepository.createEmpresa(user, nombre, direccion_matriz, direccion_bodega, prefijo_tel, RUT, giro, pagina_web, prefijo_cel)
        } catch (error) {
            throw(error)
        }
    }
    async updateEmpresa(id, inputData) {
        try {
            const camposPermitidos = [
                'nombre', 'direccion_matriz', 'direccion_bodega','prefijo_tel', 'RUT', 'giro',
                'pagina_web', 'prefijo_cel', 'logo'
            ]
            //Contruyo un objeto de datos solo con los campos permitidos que tambien esten presentes en input data
            let dataToUpdate = {}
            camposPermitidos.forEach(campo =>{
                if (inputData.hasOwnProperty(campo)){
                    dataToUpdate[campo] = inputData[campo]
                }
            })
            if(Object.keys(dataToUpdate).length === 0){
                throw new CustomError(400, "No valid fields provided for update")
            }
            return await ItemSistemaRepository.updateEmpresa(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
}

export default new ItemsSistemaService()