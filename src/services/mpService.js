import mpRepository from "../persistence/repositorys/mpRepository.js";
import { CustomError } from "../utils/httpRes/handlerResponse.js";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ResponseHandler } from "../utils/dependencys/injection.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mercadopago = require("mercadopago");
import "dotenv/config";

class mpService {
  async registerPay(paymentId, email) {
    try {
      const client = new MercadoPagoConfig({
        /* accessToken: process.env.MP_ACCESS_TOKEN, */
        accessToken:
          "APP_USR-1545338219587427-052910-e7616698dd014d5ff4a495b66b757de3-1677027160",
      });
      console.log("paymentid:", paymentId);
      console.log("inside register pay");

      const payment = await new Payment(client).get({ id: paymentId });

      console.log("RegisterPay - Payment Status:", payment.status);
      console.log("RegisterPay - Payment Payer:", payment.payer);

      if (payment.status === "approved") {
        console.log("RegisterPay - Payment Approved");
        return await mpRepository.registerPay(email, payment.payer);
      } else {
        throw new CustomError("400", "Payment not approved");
      }
    } catch (error) {
      console.error("RegisterPay - Error:", error);
      throw new CustomError("500", error.message || "Internal Server Error");
    }
  }
}

export default new mpService();
