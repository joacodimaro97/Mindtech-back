import express from "express";
let router = express.Router();

import usersRouter from "./users.js";
import productsRouter from "./products.js";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Mind Tech API",
    subtitle: "Endpoints of Mind Tech",
  });
});

router.use("/users", usersRouter);
router.use("/products", productsRouter);

export default router;
