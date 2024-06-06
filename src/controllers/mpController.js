import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ResponseHandler } from "../utils/dependencys/injection.js";
import mpService from "../services/mpService.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mercadopago = require("mercadopago");
import "dotenv/config";
import axios from "axios";
import initializeSocket from "../../src/socket/indexSocket.js";
import { server } from "../../index.js";
/* import { io } from "../../index.js"; */

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
let userEmail = "";
export const preferencesMp = async (req, res, next) => {
  try {
    /*     console.log("Req body total in preferenceMp:", req.body);
     */ userEmail = req.body.payer.email;
    /* const orderData = req.body.amount;
    const email = req.body.payer.email;
    console.log("Received order data:", orderData);
    console.log("Received email data:", email); */
    const { payer, token, transaction_amount } = req.body;

    const data = {
      preapproval_plan_id: "2c9380848fde7fa4018fdec39c5c0018",
      payer_email: "test_user_422112672@testuser.com",
      card_token_id: token,
      /*     back_url: `https://connection-respiratory-ja-against.trycloudflare.com/mp/feedback/${email}`,
       */
      status: "authorized",
    };

    const generarSuscripcion = async () => {
      try {
        const response = await axios.post(
          "https://api.mercadopago.com/preapproval",
          data,
          {
            headers: {
              Authorization: process.env.MP_ACCESS_TOKEN,
            },
          }
        );
        /*  console.log("Respuesta:", response.data); */
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    };

    if (token) {
      await generarSuscripcion();
    }

    ResponseHandler.Ok(res, "Ok");
  } catch (error) {
    ResponseHandler.HandleError(res, error);
  }
};

export const feedbackMp = async (req, res, next) => {
  try {
    /* const email = use  rEmail; */
    /*  console.log("req in feedback:", req); */
    const email = "lkulisz5@wecom.global";
    console.log("entre a feedback:");
    const { query } = req;
    const topic = query.topic || query.type;
    console.log("topic:", topic);
    if (topic === "payment") {
      console.log("req.date_created:", req.body.date_created);
      const startDate = new Date(req.body.date_created);
      startDate.setMonth(startDate.getMonth() + 12);
      const endDate = startDate.toISOString(); // '2025-05-30T15:19:08.000Z'
      console.log("End Date:", endDate);
      const paymentId = query.id || query["data.id"];
      await mpService.registerPay(paymentId, email, endDate);
    }

    ResponseHandler.Ok(res, "OK");
    if (ResponseHandler.Ok) {
      initializeSocket(server);
      /* io.emit("update", "desde el server, datos de update socket"); */
    }
    //aca
  } catch (error) {
    ResponseHandler.HandleError(res, error);
  }
};
