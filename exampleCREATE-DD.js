    // async createDD(data) {
    //     try {
    //         const {
    //             documento_despacho,
    //             documento_despacho_venta,
    //             item_producto_documento_despacho_venta,
    //             item_despacho_venta_ot,
    //             documento_despacho_traslado,
    //             item_despacho_traslado_ot,
    //             item_producto_documento_despacho_traslado
    //         } = data
    //         if (!documento_despacho) {
    //             throw new CustomError(400, "Bad Request", "El documento de despacho es obligatorio.");
    //         }
    //         const idDD = idgenerate("DD")
    //         let operations = []
    //         operations.push(ventasRepository.createDD(idDD, documento_despacho));
    //         if (documento_despacho.venta === true){
    //             if (!documento_despacho_venta) {
    //                 throw new CustomError(400, "Bad Request", "Los detalles de la venta son obligatorios.");
    //             }
    //             const idDDV = idgenerate("DDV")
    //             operations.push(ventasRepository.createDocDespachoVenta(idDDV, idDD, documento_despacho_venta));
    //             if(documento_despacho_venta.ot === true){
    //                 if (!item_despacho_venta_ot || item_despacho_venta_ot <= 0) {
    //                     throw new CustomError(400, "Bad Request", "Los items de despacho de venta OT son necesarios y deben ser mayores a 0.");
    //                 }
                    
    //                 const promiseDVot = ventasRepository.createItemDespachoVentaOt(idDDV, item_despacho_venta_ot)
    //                 operations.push(...promiseDVot)
                    
    //             } else if (documento_despacho_venta.fact_libre === true){
    //                 if (!item_producto_documento_despacho_venta || item_producto_documento_despacho_venta <= 0) {
    //                     throw new CustomError(400, "Bad Request","Los productos del documento de despacho de venta son necesarios y deben ser mayores a 0.");
    //                 }
    //                 const promiseDDVProd = ventasRepository.createItemProductoDDV(idDDV, item_producto_documento_despacho_venta)
    //                 operations.push(...promiseDDVProd)
    //             }
    //         }else if(documento_despacho.traslado === true){
    //             if (!documento_despacho_traslado) {
    //                 throw new CustomError(400, "Bad Request","Los detalles de traslado son obligatorios.");
    //             }
    //             const idDDT = idgenerate("DDT")
    //             operations.push(ventasRepository.createDDT(idDDT, idDD, documento_despacho_traslado ));
    //             if(documento_despacho_traslado.ot === true){
    //                 if (!item_despacho_traslado_ot || item_despacho_traslado_ot <= 0) {
    //                     throw new CustomError(400, "Bad Request","Los items de despacho de traslado OT son necesarios y deben ser mayores a 0.");
    //                 }
    //                 const promiseDDTot = ventasRepository.createItemDespachoTrasladoOt(idDDT, item_despacho_traslado_ot)
    //                 operations.push(...promiseDDTot)
    //             } else if (documento_despacho_traslado.fact_libre === true){
    //                 if (!item_producto_documento_despacho_traslado || item_producto_documento_despacho_traslado <= 0) {
    //                     throw new CustomError(400, "Bad Request","Los productos del documento de despacho de traslado son necesarios y deben ser mayores a 0.");
    //                 }
    //                 const promiseItemProdDDT = ventasRepository.createItemProductoDDT(idDDT, item_producto_documento_despacho_traslado)
    //                 operations.push(...promiseItemProdDDT)
    //             }
    //         }
    //         //Ejecutar las operaciones en una transaction
    //         const result = await executeTransactions(operations)
    //         return { message: "Transacciones FVE completas con éxito", result };
    //     } catch (error) {
    //         throw error;
    //     }
    // }