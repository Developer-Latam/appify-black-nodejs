import sistemaRepository from "../../../persistence/repositorys/miempresa/configs/sistemaRepository.js";
class SistemaService {
    async createSistema(empresa	, pais, idioma, correo_cobranza, moneda, moneda_secundaria, con_decimales, tasa_venta, tasa_compra, tasa_cambio, tolerancia, registro_entregas_autocompletar) {
        try {
            return sistemaRepository.createSistema(empresa	, pais, idioma, correo_cobranza, moneda, moneda_secundaria, con_decimales, tasa_venta, tasa_compra, tasa_cambio, tolerancia, registro_entregas_autocompletar)
        } catch (error) {
            throw(error)
        }
    }
}

export default new SistemaService()