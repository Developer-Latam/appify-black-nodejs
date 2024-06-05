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
    try {
      const client = new MercadoPagoConfig({
        accessToken:
          "APP_USR-5142058413684084-060311-23980a0a13b1bf13a16af2f0c0515520-1677027160",
        options: { timeout: 5000 },
      });
      console.log("client:", client);
      console.log("paymentid:", paymentId);
      console.log("inside register pay");

      const payment = await new Payment(client).get({ id: paymentId });
      console.log("payment", payment);

      console.log("RegisterPay - Payment Status:", payment.status);
      console.log("RegisterPay - Payment Payer:", payment.payer);

      if (payment.status === "approved") {
        console.log("RegisterPay - Payment Approved");
        return await mpRepository.registerPay(id, payment.payer);
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
