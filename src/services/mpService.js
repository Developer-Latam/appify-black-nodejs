import mpRepository from "../persistence/repositorys/mpRepository.js";
import { CustomError } from "../utils/httpRes/handlerResponse.js";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ResponseHandler } from "../utils/dependencys/injection.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mercadopago = require("mercadopago");
import "dotenv/config";

class mpService {
  async registerPay(paymentId, id) {
    console.log("registerpay inside");
    try {
      const client = new MercadoPagoConfig({
        accessToken:
          "APP_USR-5142058413684084-060311-23980a0a13b1bf13a16af2f0c0515520-1677027160",
        options: { timeout: 5000 },
      });
      console.log("client:", client);
      console.log("paymentid:", paymentId);

      const payment = await new Payment(client).get({ id: paymentId });
      console.log("payment", payment);

      console.log("RegisterPay - Payment Status:", payment.status);
      console.log("RegisterPay - Payment Payer:", payment.payer);

      if (payment.status === "approved") {
        console.log("RegisterPay - Payment Approved");
        console.log("id", id);
        const data = {
          id: id,
          currency_id: payment.currency_id,
          date_approved: payment.date_approved,
          payer_email: payment.payer.email,
          payer_phone: "null, lo dejamos?", //ver si sacar
          payment_type_id: payment.payment_type_id,
          payer_rut: "dejamos o sacamos", //ver si sacar
          duracion: new Date("2024-07-05 14:30:00").toISOString(), //cambiar
          register: true,
        };
        return await mpRepository.registerPay(data);
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
