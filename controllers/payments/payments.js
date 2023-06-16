import mercadopago from "mercadopago";
import nodemailer from "nodemailer";
import { viteUrl } from "../../utils.js";

const dolar_price = 487;

const payments = async (req, res, next) => {
  mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

  try {
    const { unit_price } = req.body;
    console.log(unit_price);
    const preference = {
      items: [
        {
          title: "Payment",
          unit_price: parseFloat(unit_price * dolar_price),
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

    const response = await mercadopago.preferences.create(preference);

    res.status(201).json({
      preferenceId: response.body.id,
      message: "The payment was successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Oops! An error occurred while creating the donation preference.",
    });
  }
};

export default payments;
