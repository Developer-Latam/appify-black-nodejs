import { ResponseHandler } from "../../utils/dependencys/injection.js";
import dteTemporal from "../../services/dte/dteTemporal.js";
import DtePayloadBuilder from "../../services/dte/dtePayloadBuilder.js";
import dteReal from "../../services/dte/dteReal.js";
export const emitirDTEtemporalController = async (req, res) => {
    try {
        const {encabezado, detalle, referencia} = req.body
        const payload = DtePayloadBuilder.buildDtePayload(encabezado, detalle, referencia)
        const result = await dteTemporal.postData(payload);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}

export const testDTEtemporalPARAMS = async (req, res) => {
    try {
        const {codigo, dte, emisor, receptor} = req.query;
        const result = await dteTemporal.delete(codigo, dte, emisor, receptor);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const emitirDTERealController = async (req, res) => {
    try {
        const result = await dteReal.emit(req.body);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const testDTERealPDF = async (req, res) => {
    try {
        const { dte, emisor, folio} = req.query;
        const pdfBuffer = await dteReal.getPdf( dte, emisor, folio);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="documento.pdf"');
        res.send(pdfBuffer); // Envía el buffer directament
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const dteUpdStatusSII = async (req, res) => {
    try {
        const {tipo, folio, emisor} = req.query;
        const result = await dteReal.updStatusSII(tipo, folio, emisor);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
//ESTA RUTA ES LA QUE VA A QUEDAR, NO SE TOCA, EL QUE LA TOCA LO MATO, y despues lo culeo
export const testDTEtemporalPDF = async (req, res) => {
    try {
        const {codigo, dte, emisor, receptor} = req.query;
        const pdfBuffer = await dteTemporal.getPdf(codigo, dte, emisor, receptor);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="documento.pdf"');
        res.send(pdfBuffer); // Envía el buffer directament
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}