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
        try {
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
        } catch (error) {
            throw error
        }
    }
    async createNCOD(data) {
        const { emisor, notas_de_credito_debito } = data;
        try {
            let folioSII = await this.getInfoFolios(notas_de_credito_debito.tipo_debito ? '56' : '61', emisor.RUT);
            if (!folioSII.tieneDisponible) {
                throw new CustomError(404, "Bad Request", "No hay folios disponibles para la factura");
            }
            let folio = folioSII.siguienteFolio;
            let dataAdapted = notas_de_credito_debito.anula_doc ? 
                                await this.dataAdapterNC_ANULA_DOC(folio, data) :
                                await this.dataAdapterNC_CORRIGE_MONTOS(folio, data);
            console.log("DATA LISTA PARA HACER NOTA", dataAdapted);
            // Las siguientes líneas están comentadas porque dependen de implementaciones específicas
            // const dteTemp = await dteTemporal.postData(dataAdapted)
            // console.log("debug dte temporal", dteTemp)
            // const dteR = await dteReal.emit(dteTemp)
            // console.log("debug dte real", dteR)
            return dteR;
        } catch (error) {
            throw error
        }
    }
    async getDataReferences(data) {
        try {
            let nroFolio, nroDTEref, itemsDocAsoc, docDetails;
            if (data.nota_factura_venta) {
                docDetails = await ventasRepository.getFV_detailsDTE_ById(data.nota_factura_venta.idFacturaVenta);
                itemsDocAsoc = await ventasRepository.getItemsByFVId(data.nota_factura_venta.idFacturaVenta);
                nroFolio = docDetails.numero_documento;
                nroDTEref = '33';
            } else if (data.nota_factura_venta_excenta) {
                docDetails = await ventasRepository.getNotaFVE_detailsDTE_ById(data.nota_factura_venta_excenta.idFacturaVentaExcenta);
                itemsDocAsoc = await ventasRepository.getItemsByFVEId(data.nota_factura_venta_excenta.idFacturaVentaExcenta);
                nroFolio = docDetails.numero_documento;
                nroDTEref = '34';
            } else if (data.nota_credito_nota_NC) {
                docDetails = await ventasRepository.getNota_detailsDTE_ById(data.nota_credito_nota_NC.idNotadeCD);
                const resultado = await ventasService.buscarFacturaAsociada(data.nota_credito_nota_NC.idNotadeCD);
                itemsDocAsoc = resultado.items;
                nroFolio = docDetails.numero_documento;
                nroDTEref = docDetails.tipo_credito ? '61' : '56';
            }
            return { nroFolio, nroDTEref, itemsDocAsoc };
        } catch (error) {
            throw error
        }
    }
    async dataAdapterNC_ANULA_DOC(folio, data) {
        try {
            const {notas_de_credito_debito} = data
            const refData = await this.getDataReferences(data);
            const cliente = await clientesService.getClienteById(notas_de_credito_debito.idCliente);
            if (!cliente) throw new CustomError(404, "Not Found", "Cliente no encontrado");
            // 61 para crédito, 56 para débito
            const tipoDTE = notas_de_credito_debito.tipo_credito ? 61 : 56;
            // Construir el documento utilizando los datos obtenidos y los transformados
            return this.buildDocDetails(folio, cliente, refData,tipoDTE, data);
        } catch (error) {
            throw error
        }
    }
    buildDocDetails(folio, cliente, refData,tipoDTE, data) {
        let detalles = this.transformarItemsADetalle(refData.itemsDocAsoc);
        let fechaEmision = data.notas_de_credito_debito.fecha.split('T')[0]; // Asegurarse de que la fecha está en el formato correcto.
        return {
            Encabezado: {
                IdDoc: {
                    TipoDTE: tipoDTE,
                    FchEmis: fechaEmision,
                    Folio: `${folio}`
                },
                Emisor: {
                    RUTEmisor: `${data.emisor.RUT}-0`
                },
                Receptor: {
                    RUTRecep: cliente.cliente.rut,
                    RznSocRecep: cliente.cliente.razon_social,
                    GiroRecep: cliente.cliente.giro,
                    Contacto: cliente.contactos[0].telefono,
                    CorreoRecep: cliente.contactos[0].email,
                    DirRecep: cliente.cliente.direccion,
                    CmnaRecep: cliente.cliente.comuna
                },
                Totales: {
                    MntNeto: 0,
                    TasaIVA: 19,
                    IVA: 0,
                    MntTotal: 0
                }
            },
            Detalle: detalles,
            Referencia: [{
                TpoDocRef: refData.nroDTEref,
                RazonRef: data.notas_de_credito_debito.motivo_referencia,
                FolioRef: refData.nroFolio,
                CodRef: 1
            }]
        };
    }
    async getDocumentDetailsByType(data, idReferencia) {
        try {
            let details = {}, itemsDocAsoc = [], nroDTEref;
            // Define las estructuras de datos para manejar las diversas consultas y referencias.
            const types = [
                { items: [data.item_servicio_factura_venta, data.item_producto_factura_venta], repoMethod: 'getFV_DetailsDTE_byDV', refType: '33' },
                { items: [data.item_servicio_factura_venta_excenta, data.item_producto_factura_venta_excenta], repoMethod: 'getFVE_DetailsDTE_byDV', refType: '34' },
                { items: [data.item_servicio_nota_credito, data.item_producto_nota_credito, data.item_servicio_nota_credito_NC, data.item_producto_nota_credito_NC], repoMethod: 'getNCoDbyIdDoc', refType: 'dynamic' }
            ];
            for (let type of types) {
                if (type.items.some(item => item)) {
                    const response = await ventasRepository[type.repoMethod](idReferencia);
                    if (!response.length) throw new CustomError(404, "Not Found", "Documento no encontrado");
        
                    const doc = Array.isArray(response) ? response[0] : response;
                    itemsDocAsoc = await this.transformarDatosEntrantes(...type.items.filter(item => item));
        
                    nroDTEref = type.refType === 'dynamic' ? (doc.tipo_credito ? '61' : '56') : type.refType;
                    return { nroFolio: doc.numero_documento, nroDTEref, itemsDocAsoc };
                }
            }
            throw new CustomError(404, "Not Found", "Tipo de documento no encontrado");
        } catch (error) {
            throw error
        }
    }    
    async dataAdapterNC_CORRIGE_MONTOS(folio, data) {
        try {
            const { emisor, notas_de_credito_debito } = data;
            let idReferencia = notas_de_credito_debito.idDoc;
            // Obtener detalles y referencias de documento basado en el tipo de ítem existente.
            const { nroFolio, nroDTEref, itemsDocAsoc } = await this.getDocumentDetailsByType(data, idReferencia);
            const cliente = await clientesService.getClienteById(notas_de_credito_debito.idCliente);
            if (!cliente.cliente) {
                throw new CustomError(404, "Not Found", "Cliente no encontrado");
            }
            let detalles = this.transformarItemsADetalle(itemsDocAsoc);
            const tipoDTE = notas_de_credito_debito.tipo_credito ? 61 : 56;
            return {
                Encabezado: {
                    IdDoc: {
                        TipoDTE: tipoDTE,
                        FchEmis: notas_de_credito_debito.fecha.split('T')[0],
                        Folio: `${folio}`
                    },
                    Emisor: {
                        RUTEmisor: `${emisor.RUT}-0`
                    },
                    Receptor: {
                        RUTRecep: cliente.cliente.rut,
                        RznSocRecep: cliente.cliente.razon_social,
                        GiroRecep: cliente.cliente.giro,
                        Contacto: cliente.contactos[0].telefono,
                        CorreoRecep: cliente.contactos[0].email,
                        DirRecep: cliente.cliente.direccion,
                        CmnaRecep: cliente.cliente.comuna
                    },
                    Totales: {
                        MntNeto: 0,
                        TasaIVA: 19,
                        IVA: 0,
                        MntTotal: 0
                    }
                },
                Detalle: detalles,
                Referencia: [{
                    TpoDocRef: nroDTEref,
                    RazonRef: notas_de_credito_debito.motivo_referencia,
                    FolioRef: nroFolio,
                    CodRef: 2
                }]
            };
        } catch (error) {
            throw error
        }
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
        // Mapear los servicios y resolver las promesas
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
        // Mapear los productos y resolver las promesas
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
