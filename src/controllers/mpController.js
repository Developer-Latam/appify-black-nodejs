import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ResponseHandler } from "../utils/dependencys/injection.js";
import mpService from "../services/mpService.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mercadopago = require("mercadopago");
import "dotenv/config";
import axios from "axios";
import { io } from "../../index.js";

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
  try {
    /*   console.log("Req body total", req.body);
     */
    const orderData = req.body.transaction_amount;
    const email = req.body.payer.email;
    /* console.log("Received order data:", orderData);
    console.log("Received email data:", email); */
    const { payer, token, transaction_amount } = req.body;

    const data = {
      preapproval_plan_id: "2c9380848fde7fa4018fdec39c5c0018",
      payer_email: "test_user_422112672@testuser.com",
      card_token_id: token,
      /*     back_url: `https://spas-moved-scripting-rx.trycloudflare.com/mp/feedback/${email}`,
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
        console.log("Respuesta:", response.data);
        /*  feedbackMp(response.data, email); */
      } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught in the main try-catch block
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
  /* const email = req.params;
  console.log("email in feedback endpoint", email); */
  /* console.log("req:", req); */

  console.log("req.body in feedback", req.body);
  /*   console.log("req params", req.params);
   */
  try {
    const email = "lkulisz2@wecom.global";
    console.log("entre a feedback:");
    const { query } = req;
    const topic = query.topic || query.type;
    console.log("topic:", topic);
    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];
      await mpService.registerPay(paymentId, email);
    }

    ResponseHandler.Ok(res, "OK");
    if (ResponseHandler.Ok) {
      io.emit("update", "desde el server, datos de update");
    }
    //aca
  } catch (error) {
    ResponseHandler.HandleError(res, error);
  }
};
