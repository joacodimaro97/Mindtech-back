import mercadopago from "mercadopago";

const payments = async (req, res, next) => {
  mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

  try {
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
