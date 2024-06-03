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
  const { orderData, email } = req.body;
  console.log("Received order data:", orderData);
  console.log("Received email data:", email);

  const url = "http://localhost:8080";
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

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
          pending: `${url}/mp/feedback`,
        },
        auto_return: "approved",
        notification_url: `https://complicated-consent-deposit-informal.trycloudflare.com/mp/feedback/${email}`,
      },
    });

    ResponseHandler.Ok(res, { id: result.id });
  } catch (error) {
    console.log(error);
    ResponseHandler.HandleError(res, error);
  }
};

export const feedbackMp = async (req, res, next) => {
  const email = req.params;
  console.log("email in feedback endpoint", email);

  try {
    console.log("entre a feedback req.query:", req.query);
    const { query } = req;
    const topic = query.topic || query.type;
    console.log("topic:");
    console.log(topic);
    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];
      await mpService.registerPay(paymentId, email);
    }

    ResponseHandler.Ok(res, "OK");
  } catch (error) {
    ResponseHandler.HandleError(res, error);
  }
};
