import mercadopago from "mercadopago";
import { v4 as uuidv4 } from "uuid";
const uniqueID = uuidv4();
import {viteUrl} from "../../utils.js"

const dolar_price = 487

const mp_react_native = async (req, res, next) => {
  mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

  const { unit_price } = req.body;

  const preference = {
    items: [
      {
        id: uniqueID,
        title: "Payment",
        unit_price: parseFloat(unit_price*dolar_price),
        quantity: 1,
      },
    ],
    back_urls: {
      success: `${viteUrl}success`,
      failure: `${viteUrl}failure`,
      pending: `${viteUrl}pending`,
    },
    auto_return: "approved",
    binary_mode: true,
  };

  const response = await mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: error.message });
    });
};

export default mp_react_native;
