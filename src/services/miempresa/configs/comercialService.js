import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
import ComercialRepositoy from "../../../persistence/repositorys/miempresa/configs/comercialRepository.js";
import comercialRepository from "../../../persistence/repositorys/miempresa/configs/comercialRepository.js";

class comercialService {

    async updateProyecto(id, inputData) {
        try {
            const camposPermitidos = [
                'valor_impuesto', 'porcentaje_de_ot', 'texto_para_compartir_proyecto','cotizacion_descuento_visible', 'nombre_impuesto', 'logo'
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
            return await ComercialRepositoy.updateProyecto(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }

    async updateParaClientes(id, inputData) {
        try {
            const camposPermitidos = [
                'texto_inferior_firma', 'mensaje_envio_proyecto', 'texto_confirmacion_compra'
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
            return await ComercialRepositoy.updateParaClientes(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
    async getProyectoYParaClientes(userId) {
        try {
            const result = await comercialRepository. 
        } catch (error) {
            throw(error)
        }
    }
}


export default new comercialService()