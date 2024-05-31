import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import axios from "axios";
import clientesService from "../comercial/clientesService.js";
import 'dotenv/config'
import { crearFacturaConDescuento, crearFacturaSimple } from "./dteFunctions.js";
import dteTemporal from "./dteTemporal.js";
import dteReal from "./dteReal.js";
import ventasService from "../administracion/ventasService.js";
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
    async createNCOD(data) {
        const {
            emisor,
            notas_de_credito_debito,
            nota_factura_venta,
            nota_factura_venta_excenta,
            nota_credito_nota_NC,
            item_servicio_nota_credito,
            item_producto_nota_credito,
            item_servicio_nota_credito_NC,
            item_producto_nota_credito_NC,
            item_servicio_factura_venta,
            item_producto_factura_venta,
            item_servicio_factura_venta_excenta,
            item_producto_factura_venta_excenta
        } = data
        try {
            let folio;
            let folioSII;
            let dataAdapted;
            if(notas_de_credito_debito.tipo_debito === true){
                folioSII = await this.getInfoFolios('56', emisor.RUT)
            }
            folioSII = await this.getInfoFolios('61', emisor.RUT)
            if (folioSII.tieneDisponible){
                folio = folioSII.siguienteFolio
            } else {
                throw new CustomError(404, "Bad Request", "No hay folios disponibles para la factura")
            }
            if(notas_de_credito_debito.anula_doc === true){
                dataAdapted = await this.dataAdapterNC_ANULA_DOC(folio, data)
                console.log("DATA LISTA PARA HACER NOTA", dataAdapted)
                
            } else if (notas_de_credito_debito.corrige_monto === true){
                dataAdapted = await this.dataAdapterNC_CORRIGE_MONTOS(folio, data)
                console.log("DATA LISTA PARA HACER NOTA", dataAdapted)
            }
            // const dteTemp = await dteTemporal.postData(result)
            // const dteR = await dteReal.emit(dteTemp)
            return dteR
        } catch (error) {
            throw error
        }
    }
    async dataAdapterNC_ANULA_DOC(folio, data) {
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
        let itemsDocAsoc;
        if (nota_factura_venta) {
            idReferencia = nota_factura_venta.idFacturaVenta;
            const fv = await ventasRepository.getFV_detailsDTE_ById(idReferencia)
            itemsDocAsoc = await ventasRepository.getItemsByFVId(idReferencia)
            nroFolio = fv.numero_documento;
            nroDTEref = '33';
        } else if (nota_factura_venta_excenta) {
            idReferencia = nota_factura_venta_excenta.idFacturaVentaExcenta;
            const fve = await ventasRepository.getNotaFVE_detailsDTE_ById(idReferencia)
            itemsDocAsoc = await ventasRepository.getItemsByFVEId(idReferencia)
            nroFolio = fve.numero_documento
            nroDTEref = '34';
        } else if (nota_credito_nota_NC) {
            idReferencia = nota_credito_nota_NC.idNotadeCD;
            const nc = await ventasRepository.getNota_detailsDTE_ById(idReferencia)
            const resultado = await ventasService.buscarFacturaAsociada(idReferencia);
            itemsDocAsoc = resultado.items;
            nroFolio = nc.numero_documento
            if(nc.tipo_credito === true){
                nroDTEref = '61';  
            }else {
                nroDTEref = '56';
            }                                        
        }
        const cliente = await clientesService.getClienteById(notas_de_credito_debito.idCliente);
        if (!cliente) throw new CustomError(404, "Not Found", "Cliente no encontrado");
        const tipoDTE = notas_de_credito_debito.tipo_credito ? 61 : 56; // 61 para crédito, 56 para débito
        // Transformar los items asociados para el detalle
        let detalles = this.transformarItemsADetalle(itemsDocAsoc);
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
            Detalle: detalles,
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
    async dataAdapterNC_CORRIGE_MONTOS(folio, data) {
        const {
            emisor,
            notas_de_credito_debito,
            item_servicio_nota_credito,
            item_producto_nota_credito,
            item_servicio_nota_credito_NC,
            item_producto_nota_credito_NC,
            item_servicio_factura_venta,
            item_producto_factura_venta,
            item_servicio_factura_venta_excenta,
            item_producto_factura_venta_excenta
        } = data;
        let idReferencia;
        let nroFolio;
        let nroDTEref;
        let itemsDocAsoc;
        if (item_servicio_factura_venta || item_producto_factura_venta) {
            idReferencia = notas_de_credito_debito.idDoc;
            const fv = await ventasRepository.getFV_DetailsDTE_byDV(idReferencia)
            if (fv.length > 0) {
                nroFolio = Array.isArray(fv) ? fv[0].numero_documento : fv.numero_documento;
                nroDTEref = '33';
            } else {
                throw new CustomError(404, "Not Found", "No existe DOC ASOCIADO A ESE ID DOC")
            }
            itemsDocAsoc = await this.transformarDatosEntrantes(item_servicio_factura_venta, item_producto_factura_venta)
        } else if (item_servicio_factura_venta_excenta || item_producto_factura_venta_excenta) {
            idReferencia = notas_de_credito_debito.idDoc;
            const fve = await ventasRepository.getFVE_DetailsDTE_byDV(idReferencia)
            if (fve.length > 0) {
                nroFolio = Array.isArray(fve) ? fve[0].numero_documento : fve.numero_documento;
                nroDTEref = '34';
            } else {
                throw new CustomError(404, "Not Found", "No existe DOC ASOCIADO A ESE DOC-VENTA")
            }
            itemsDocAsoc = await this.transformarDatosEntrantes(item_servicio_factura_venta_excenta, item_producto_factura_venta_excenta)
        } else if (item_servicio_nota_credito || item_producto_nota_credito) {
            idReferencia = notas_de_credito_debito.idDoc;
            let nc = await ventasRepository.getNCoDbyIdDoc(idReferencia)
            nc = nc[0] 
            itemsDocAsoc = await this.transformarDatosEntrantes(item_servicio_nota_credito, item_producto_nota_credito)
            nroFolio = nc.numero_documento
            if(nc.tipo_credito === true){
                nroDTEref = '61';  
            }else {
                nroDTEref = '56';
            }
        }else if(item_servicio_nota_credito_NC || item_producto_nota_credito_NC){
            idReferencia = notas_de_credito_debito.idDoc
            let nc = await ventasRepository.getNCoDbyIdDoc(idReferencia)
            nc = nc[1]
            itemsDocAsoc = await this.transformarDatosEntrantes(item_servicio_nota_credito_NC, item_producto_nota_credito_NC)
            nroFolio = nc.numero_documento
            if(nc.tipo_credito === true){
                nroDTEref = '61';  
            }else {
                nroDTEref = '56';
            }
        }
        const cliente = await clientesService.getClienteById(notas_de_credito_debito.idCliente);
        if (!cliente.cliente) {
            throw new CustomError(404, "Not Found", "Cliente no encontrado");
        }
        const tipoDTE = notas_de_credito_debito.tipo_credito ? 61 : 56; // 61 para crédito, 56 para débito
        // Transformar los items asociados para el detalle
        let detalles = this.transformarItemsADetalle(itemsDocAsoc);
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
            Detalle: detalles,
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
    transformarItemsADetalle(itemsDocAsoc) {
        const detalles = [];
        // Procesar servicios si existen
        if (itemsDocAsoc.servicios && itemsDocAsoc.servicios.length > 0) {
            itemsDocAsoc.servicios.forEach(servicio => {
                if (servicio.cantidad && servicio.unitario) { // Asegurarse de que la cantidad y el unitario no son null
                    detalles.push({
                        NmbItem: servicio.nombre || servicio.codigo,
                        QtyItem: servicio.cantidad,
                        PrcItem: servicio.unitario
                    });
                }
            });
        }
        // Procesar productos si existen
        if (itemsDocAsoc.productos && itemsDocAsoc.productos.length > 0) {
            itemsDocAsoc.productos.forEach(producto => {
                if (producto.cantidad && producto.unitario) { // Asegurarse de que la cantidad y el unitario no son null
                    detalles.push({
                        NmbItem: producto.nombre || producto.codigo,
                        QtyItem: producto.cantidad,
                        PrcItem: producto.unitario
                    });
                }
            });
        }
        return detalles;
    }
    // Función para transformar los datos
    async transformarDatosEntrantes(servicios = [], productos = []) {
        // Mapeamos los servicios y resolvemos las promesas
        const serviciosTransformados = await Promise.all(servicios.map(async servicio => {
            const { servicio: nombreServicio } = await ventasRepository.getNameProdServByID(servicio.idServicio, null);
            return {
                idServicio: servicio.idServicio,
                codigo: servicio.codigo || null,
                cantidad: servicio.cantidad,
                unitario: servicio.unitario,
                nombre: nombreServicio || servicio.notas  // Usamos el nombre obtenido, fallback a las notas si no hay nombre
            };
        }));
        // Mapeamos los productos y resolvemos las promesas
        const productosTransformados = await Promise.all(productos.map(async producto => {
            const { producto: nombreProducto } = await ventasRepository.getNameProdServByID(null, producto.idProducto);
            return {
                idProducto: producto.idProducto,
                codigo: producto.codigo || null,
                cantidad: producto.cantidad,
                unitario: producto.unitario,
                nombre: nombreProducto || producto.notas  // Usamos el nombre obtenido, fallback a las notas si no hay nombre
            };
        }));
        return {
            servicios: serviciosTransformados,
            productos: productosTransformados
        };
    }
}

export default new DTEService()
