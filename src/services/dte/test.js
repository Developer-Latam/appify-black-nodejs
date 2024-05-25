import { crearFacturaSimple } from "./dteFunctions.js";
import dteReal from "./dteReal.js";
import dteTemporal from "./dteTemporal.js";

const data = {
    tipoDTE: 33,
    fechaEmision: "2024-05-16",
    folio: "12",
    rutEmisor: "77918411-0",
    rutReceptor: "60803000-K",
    razonSocialReceptor: "Servicio de Impuestos Internos (SII)",
    giroReceptor: "Administración Pública",
    contacto: "+56 2 3252 5575",
    correoReceptor: "facturacionmipyme@sii.cl",
    direccionReceptor: "Teatinos 120",
    comunaReceptor: "Santiago",
    detalles: [
        {
            NmbItem: "Pañuelo AFECTO",
            QtyItem: 492,
            PrcItem: 3867
        },
        {
            NmbItem: "Relleno AFECTO",
            QtyItem: 62,
            PrcItem: 3607
        }
    ],
    referencias: [
        {
            TpoDocRef: "SET",
            RazonRef: "CASO 3890515-1",
            FolioRef: "12"
        }
    ]
};

// Llama a la función para crear la factura
const factura = crearFacturaSimple(data);
console.log(JSON.stringify(factura, null, 2));
(async () => {
    try {
        const res = await dteTemporal.postData(factura);
        console.log("DEBUG DEL DTE TEMPORAL POST", res);
        const DTEREAL = await dteReal.emit(res);
        console.log("DEBUG DEL DTE REAL POST", DTEREAL);
    } catch (error) {
        console.error("Error processing DTE:", error);
    }
})();

