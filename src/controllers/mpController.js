import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ResponseHandler } from "../utils/dependencys/injection.js";
import mpService from "../services/mpService.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mercadopago = require("mercadopago");
import "dotenv/config";

export const testMPController = async (req, res, next) => {
  const { code } = req.query;
  if (!code) {
    ResponseHandler.Unauthorized(res, "Falta la query");
  }
  try {
    ResponseHandler.Ok(res, code);
  } catch (error) {
    ResponseHandler.HandleError(res, error);
  }
};

export const preferencesMp = async (req, res, next) => {
  const { orderData, userLoggedData } = req.body;
  const userId = userLoggedData.id;
  console.log("Received order data:", orderData);
  console.log("Received user logged data:", userLoggedData);
  console.log("User ID:", userId);
  try {
    const client = new MercadoPagoConfig({
      /* accessToken: process.env.MP_ACCESS_TOKEN, */
      accessToken:
        "APP_USR-1545338219587427-052910-e7616698dd014d5ff4a495b66b757de3-1677027160",
    });

    const preference = new Preference(client);
    
    const url = 'http://localhost:8080'

    const result = await preference.create({
      body: {
        items: [
          {
            title: orderData.description,
            unit_price: Number(orderData.price),
            quantity: Number(orderData.quantity),
            currecy_id: "CLP",
          },
        ],
        back_urls: {
          success: `${url}/mp/feedback`,
          failure: `${url}/mp/feedback`,
          pending: `${url}/mp/feedback`
        },
        auto_return: "approved",
        notification_url: `https://enrollment-laptops-elegant-tom.trycloudflare.com/mp/feedback/${userId}`,
      },
    });

    ResponseHandler.Ok(res, { id: result.id });
  } catch (error) {
    console.log(error);
    ResponseHandler.HandleError(res, error);
  }
};

export const feedbackMp = async (req, res, next) => {
  const userId = req.params;
  console.log("userId in feedback endpoint", userId);

  try {
    console.log("entre a feedback req.query:", req.query);
    const { query } = req;
    const topic = query.topic || query.type;
    console.log("topic:");
    console.log(topic);
    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];
      await mpService.registerPay(paymentId, userId);
      await registerPay(
        paymentId /* , params.rut, params.idDoc, params.monto */
      );
    }

    ResponseHandler.Ok(res, "OK");
  } catch (error) {
    ResponseHandler.HandleError(res, error);
  }
};

///this would be in service
async function registerPay(paymentId, userId /* , rut, idDoc, monto */) {
  const client = new MercadoPagoConfig({
    /* accessToken: process.env.MP_ACCESS_TOKEN, */
    accessToken:
      "APP_USR-1545338219587427-052910-e7616698dd014d5ff4a495b66b757de3-1677027160",
  });
  console.log("paymentid:", paymentId);
  console.log("inside register pay");

  try {
    const payment = await new Payment(client).get({ id: paymentId });
    /* console.log("payment :", payment); */
    console.log("payment status :", payment.status);
    console.log("payment payer :", payment.payer);
    const date = new Date();

    if (payment.status === "approved") {
      console.log("pago aprobado");
      //here registerPaymentInDataBase(payment, date) and this is in repository
      /* try {
        const idDocOf = idDoc.replace("-", "/");
        console.log("respuesta de registros");
        const [responseFact] = await connection.execute(
          `SELECT * FROM pagos_marcados WHERE idCliente="${rut}" AND idDoc = "${idDocOf}" AND bruto = "${monto}" AND neto ="${monto}" AND fecha = "${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}"`
        );

        console.log(responseFact);

        if (responseFact.length === 0) {
          await connection.execute(
            "INSERT INTO pagos_marcados(idCliente,idDoc,bruto,neto,fecha) VALUES (?,?,?,?,?)",
            [
              rut,
              idDocOf,
              monto,
              monto,
              `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            ]
          );
        }
        // Emit the socket event
        io.emit("pegoRegister", { idDocOf, status: "apro" });
      } catch (err) {
        console.log("Error during database operation:", err);
      } */
    }
  } catch (error) {
    console.log("Error finding payment by ID:", error);
  }
}
