import mercadopago from "mercadopago";

const mp_react_native = async (req, res, next) => {
  mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

  const { unit_price } = req.body;

  const preference = {
    items: [
      {
        title: "Payment",
        unit_price: parseFloat(unit_price),
        quantity: 1,
      },
    ],
    back_urls: {
      success: "http://localhost:5173",
      failure: "http://localhost:5173",
      pending: "http://localhost:5173",
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
