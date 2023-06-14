import express from "express";
let router = express.Router();

import usersRouter from "./users.js";
import productsRouter from "./products.js";
import categoriesRouter from "./categories.js";
import brandsRouter from "./brands.js";
import paymentsRouter from "./payments.js"
<<<<<<< HEAD
=======
import cartsRouter from "./carts.js";

>>>>>>> 2222b088c0e6cb1dfa2fb04081cded539a47852f

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Mind Tech API",
    subtitle: "Endpoints of Mind Tech",
  });
});

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use('/payments', paymentsRouter)
router.use("/categories", categoriesRouter);
router.use("/brands", brandsRouter);
router.use("/carts", cartsRouter);

export default router;
