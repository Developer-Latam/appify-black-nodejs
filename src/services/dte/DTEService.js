import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import axios from "axios";
import clientesService from "../comercial/clientesService.js";
import 'dotenv/config'
import { crearFacturaConDescuento, crearFacturaSimple } from "./dteFunctions.js";
import dteTemporal from "./dteTemporal.js";
import dteReal from "./dteReal.js";
import ventasRepository from "../../persistence/repositorys/administracion/ventasRepository.js";
class DTEService {
    constructor() {
        this.apiUrl = `${process.env.URL_API_PY}`;
    }
    async getInfoFolios(tipoDTE, emisor) {
        const params = {
            dte: tipoDTE,
            emisor: emisor,
        };
        try {
            const response = await axios.get(`${this.apiUrl}/dte_folios/info`, {params});
            const data = response.data
            //Verificar si hay folios disponibles
            const tieneDisponible = data.disponibles > 0;
            const siguienteFolio = tieneDisponible ? data.siguiente : null;
            return {tieneDisponible, siguienteFolio}
        } catch (error) {
            throw new CustomError(500, "Error fetching data from API",  error.message);
        }
    }
    async createFV(data) {
        const {
            emisor,
            item_servicio_factura_venta,
            item_producto_factura_venta
        } = data
        try {
            let folio;
            const folioSII = await this.getInfoFolios('33', emisor.RUT)
            if (folioSII.tieneDisponible){
                folio = folioSII.siguienteFolio
                const dataAdapted = await this.dataAdapterFV(folio, data)
                  // Combinamos los items de servicio y producto
                const items = (item_servicio_factura_venta || []).concat(item_producto_factura_venta || []);
                // Verificamos si hay alguna bonificación mayor a 0 en cualquier item
                const tieneBonificaciones = items.some(item => item.bonificacion && item.bonificacion > 0);
                let result;
                if (tieneBonificaciones) {
                    result = await crearFacturaSimple(dataAdapted)
                } else {
                    result = await crearFacturaConDescuento(dataAdapted)
                }
                const dteTemp = await dteTemporal.postData(result)
                const dteR = await dteReal.emit(dteTemp)
                return dteR
            } else {
                throw new CustomError(404, "Bad Request", "No hay folios disponibles para la factura")
            }
        } catch (error) {
            throw error
        }
    }
    async dataAdapterFV(folio, data) {
        const {
            emisor,
            factura_venta,
            item_servicio_factura_venta,
            item_producto_factura_venta
        } = data;
        // Obtenemos la información del cliente
        const clienteAFacturar = await clientesService.getClienteById(factura_venta.idCliente);
        if (!clienteAFacturar) throw new CustomError(404, "Not Found", "Cliente no encontrado");
        // Combinamos los items de servicio y producto
        const items = (item_servicio_factura_venta || []).concat(item_producto_factura_venta || []);
        // Verificamos si hay alguna bonificación mayor a 0 en cualquier item
        const tieneBonificaciones = items.some(item => item.bonificacion && item.bonificacion > 0);
        // Adaptamos los detalles en función de si hay bonificaciones
        const detalles = items.map(item => {
            if (tieneBonificaciones) {
                return {
                    NmbItem: item.notas, // Asumiendo que notas contiene el nombre del item
                    QtyItem: item.cantidad,
                    PrcItem: item.unitario,
                    DescuentoPct: item.bonificacion
                };
            } else {
                return {
                    NmbItem: item.notas,
                    QtyItem: item.cantidad,
                    PrcItem: item.unitario
                };
            }
        });
        // Estructura del objeto a retornar
        return {
            tipoDTE: 33,
            fechaEmision: new Date().toISOString().split('T')[0], // Usamos la fecha actual
            folio: folio, // Extracción del folio desde el número_documento
            rutEmisor: `${emisor.RUT}-0`, // Asumimos que el RUT necesita un dígito verificador
            rutReceptor: clienteAFacturar.cliente.rut,
            razonSocialReceptor: clienteAFacturar.cliente.razon_social,
            giroReceptor: clienteAFacturar.cliente.giro,
            contacto: clienteAFacturar.contactos[0]?.telefono, // Usar el primer contacto, manejo de posibles undefined
            correoReceptor: clienteAFacturar.contactos[0]?.email,
            direccionReceptor: clienteAFacturar.cliente.direccion,
            comunaReceptor: clienteAFacturar.cliente.comuna,
            detalles: detalles,
            referencias: []
        };
    }
    async createNCODAnulaDoc(data) {
        const {
            emisor,
            notas_de_credito_debito,
            nota_factura_venta,
            nota_factura_venta_excenta,
            nota_credito_nota_NC
        } = data
        try {
            let folio;
            let folioSII;
            if(notas_de_credito_debito.tipo_debito === true){
                folioSII = await this.getInfoFolios('56', emisor.RUT)
            }
            folioSII = await this.getInfoFolios('61', emisor.RUT)
            if (folioSII.tieneDisponible){
                folio = folioSII.siguienteFolio
                const dataAdapted = await this.dataAdapterNC(folio, data)
                //const dteTemp = await dteTemporal.postData(result)
                //const dteR = await dteReal.emit(dteTemp)
                //return dteR
            } else {
                throw new CustomError(404, "Bad Request", "No hay folios disponibles para la factura")
            }
        } catch (error) {
            throw error
        }
    }
    async dataAdapterNC(folio, data) {
        const {
            emisor,
            notas_de_credito_debito,
            nota_factura_venta,
            nota_factura_venta_excenta,
            nota_credito_nota_NC
        } = data;
        let idReferencia;
        let nroFolio;
        let nroDTEref;
        if (nota_factura_venta) {
            idReferencia = nota_factura_venta.idFacturaVenta;
            const fv = await ventasRepository.getFV_detailsDTE_ById(idReferencia)
            nroFolio = fv.numero_documento;
            nroDTEref = '33';
        } else if (nota_factura_venta_excenta) {
            idReferencia = nota_factura_venta_excenta.idFacturaVentaExcenta;
            const fve = await ventasRepository.getNotaFVE_detailsDTE_ById(idReferencia)
            nroFolio = fve.numero_documento
            nroDTEref = '34';
        } else if (nota_credito_nota_NC) {
            idReferencia = nota_credito_nota_NC.idNotadeCD;
            const nc = await ventasRepository.getNota_detailsDTE_ById(idReferencia)
            nroFolio = nc.numero_documento
            if(nc.tipo_credito === true){
                nroDTEref = '61';  
            }
            nroDTEref = '56'                                          
        }
        // Aquí asumimos que podemos obtener datos adicionales como el RUT del cliente desde un servicio o base de datos
        const cliente = await clientesService.getClienteById(notas_de_credito_debito.idCliente);
        //console.log("debug cliente", cliente)
        if (!cliente) throw new CustomError(404, "Not Found", "Cliente no encontrado");
        const tipoDTE = notas_de_credito_debito.tipo_credito ? 61 : 56; // 61 para crédito, 56 para débito
        return {
            Encabezado: {
                IdDoc: {
                    TipoDTE: tipoDTE,
                    FchEmis: notas_de_credito_debito.fecha.split('T')[0],
                    Folio: folio
                },
                Emisor: {
                    RUTEmisor: `${emisor.RUT}-0`
                },
                Receptor: {
                    RUTRecep: cliente?.cliente?.rut,
                    RznSocRecep: cliente?.cliente?.razon_social,
                    GiroRecep: cliente?.cliente?.giro,
                    Contacto: cliente?.contactos[0]?.telefono,
                    CorreoRecep: cliente?.contactos[0]?.email,
                    DirRecep: cliente?.cliente?.direccion,
                    CmnaRecep: cliente?.cliente?.comuna
                },
                Totales: {
                    MntTotal: 0 // Este valor debería calcularse según la lógica de negocio relevante
                }
            },
            Detalle: [
                {
                    NmbItem: "Descripción del item" // Deberás ajustar según la lógica de negocio
                }
            ],
            Referencia: [
                {
                    TpoDocRef: nroDTEref,
                    RazonRef: notas_de_credito_debito.motivo_referencia, // Ejemplo estático, ajustar según lógica de negocio
                    FolioRef: nroFolio,
                    CodRef: 2 // Código de referencia ajustado según lógica de negocio
                }
            ]
        };
    }
}

export default new DTEService()
