import empresaRepository from "../../../persistence/repositorys/miempresa/configs/empresaRepository.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
class EmpresaService {
    async createEmpresa(user, nombre, direccion_matriz, direccion_bodega, prefijo_tel, RUT, giro, pagina_web, prefijo_cel) {
        try {
            const empresaExist = await empresaRepository.getEmpresaByRUT(RUT)
            if(empresaExist){
                throw new CustomError(409, "Empresa ya existente con el RUT indicado", {empresaExist})
            }
            return empresaRepository.createEmpresa(user, nombre, direccion_matriz, direccion_bodega, prefijo_tel, RUT, giro, pagina_web, prefijo_cel)
        } catch (error) {
            throw(error)
        }
    }
}

export default new EmpresaService()