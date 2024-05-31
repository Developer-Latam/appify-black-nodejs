import { MercadoPagoConfig, Preference } from "mercadopago";
console.log("mercadopag type:", typeof MercadoPagoConfig);
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
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  /*  const monto = req.body.amount; */
  /* console.log(monto);*/
  /*   console.log("entro create_preference", req);
   */
  const preference = new Preference(client);

  preference
    .create({
      body: {
        items: [
          {
            title: req.body.description,
            unit_price: Number(req.body.price),
            quantity: Number(req.body.quantity),
            currecy_id: "CLP",
          },
        ],
        back_urls: {
          success: "https://appify-black-side.vercel.app/mp/feedback",
          failure: "https://appify-black-side.vercel.app/mp/feedback",
          pending: "https://appify-black-side.vercel.app/mp/feedback",
        },
        auto_return: "approved",
        notification_url: `https://appify-black-side.vercel.app/mp/feedback`,
      },
    })
    .then((result) => {
      const respuesta = result;
      console.log(respuesta.id);

      res.status(200).json({ id: respuesta.id });
    })
    .catch(console.log);
};

export const feedbackMp = async (req, res, next) => {
  try {
    console.log("entre a feedback req.query:", req.query);
    const { query } = req;
    const topic = query.topic || query.type;
    console.log("topic:");
    console.log(topic);
    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];
      await registerPay(
        paymentId /* , params.rut, params.idDoc, params.monto */
      );
    }

    ResponseHandler.Ok(res, 200, "OK");
  } catch (error) {
    /* console.log("entre a feedback req:", req); */
    /* const { query } = req; */
    /*const topic = query.topic || query.type;
  console.log("query:", { query });
  console.log("topic:");
  console.log(topic); */
    /* res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
    Payment_type: req.query.payment_type,
  }); */

    /* console.log("response feedback", res); */
    ResponseHandler.HandleError(res, error);
  }
};

async function registerPay(paymentId /* , rut, idDoc, monto */) {
  const data = await mercadopago.payment.findById(paymentId);
  console.log("data.body registerPay:", data.body);
  const date = new Date();

  if (data.body.status === "approved") {
    console.log("pago aprobado");
    try {
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
      //Aca deberia ir el socket
      io.emit("pegoRegister", { idDocOf, status: "apro" });
    } catch (err) {
      console.log(err);
    }
  }
}
