import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ResponseHandler } from "../utils/dependencys/injection.js";
import mpService from "../services/mpService.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mercadopago = require("mercadopago");
import "dotenv/config";
import axios from "axios";

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
  console.log("Req body total", req.body);
  const orderData = req.body.transaction_amount;
  const email = req.body.payer.email;
  console.log("Received order data:", orderData);
  console.log("Received email data:", email);
  const { payer, token, transaction_amount } = req.body;

  const data = {
    preapproval_plan_id: "2c9380848fde7fa4018fdec39c5c0018",
    external_reference: "YG-001",
    payer_email: payer.email,
    card_token_id: token,
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      start_date: "2024-06-01T13:07:14.260Z",
      end_date: "2025-06-06T15:59:52.581Z",
      transaction_amount: transaction_amount,
      currency_id: "CLP",
    },
    back_url: `https://scared-jonathan-respond-respected.trycloudflare.com/mp/feedback/${email}`,
    status: "authorized",
  };

  const generarSuscripcion = () => {
    axios
      .post("https://api.mercadopago.com/preapproval", data, {
        headers: {
          Authorization:
            "Bearer APP_USR-5142058413684084-060311-23980a0a13b1bf13a16af2f0c0515520-1677027160",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Respuesta:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  };
  if (token) {
    generarSuscripcion();
  }
  res.status(200).send({ success: true });
};

export const feedbackMp = async (req, res, next) => {
  const id = req.params;
  console.log("email in feedback endpoint", id);

  try {
    console.log("entre a feedback req.query:", req.query);
    const { query } = req;
    const topic = query.topic || query.type;
    console.log("topic:");
    console.log(topic);
    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];
      await mpService.registerPay(paymentId, id);
    }

    ResponseHandler.Ok(res, "OK");
  } catch (error) {
    ResponseHandler.HandleError(res, error);
  }
};
