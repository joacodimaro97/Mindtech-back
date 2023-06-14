import Cart from "../../models/Cart.js";
import User from "../../models/User.js";
import Product from "../../models/Product.js";

export const createCartOnLogin = async (req, res, next) => {
  try {
    const userID = req.query.userID;

    const existingCart = await Cart.findOne({ user: userID });
    if (existingCart) {
      return res.json(existingCart);
    }

    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const newCart = new Cart({
      user: user._id,
      email: user.email,
      products: [],
      total: 0,
    });

    await newCart.save();

    res.json(newCart);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cartID = req.query.cartID;

    const cart = await Cart.findById(cartID);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    cart.products = [];
    cart.total = 0;

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const removeProduct = async (req, res, next) => {
  try {
    const cartID = req.query.cartID;
    const productID = req.query.productID;

    const cart = await Cart.findById(cartID);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const existingProductIndex = cart.products.findIndex(
      (product) => product.product_id.toString() === productID
    );

    if (existingProductIndex !== -1) {
      cart.products.splice(existingProductIndex, 1); // Eliminar el producto del array
    } else {
      return res.status(404).json({ error: "Producto no encontrado en el carrito" });
    }

    cart.total = cart.products.reduce((total, product) => {
      return total + product.subtotal;
    }, 0);

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


export const addProduct = async (req, res, next) => {
  try {
    const cartID = req.query.cartID;
    const productID = req.query.productID;

    const cart = await Cart.findById(cartID);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const existingProduct = cart.products.find(
      (product) => product.product_id.toString() === productID
    );

    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.subtotal = existingProduct.quantity * product.price;
    } else {
      cart.products.push({
        product_id: productID,
        name: product.name,
        quantity: 1,
        subtotal: product.price,
      });
    }

    cart.total = cart.products.reduce((total, product) => {
      return total + product.subtotal;
    }, 0);

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const delProduct = async (req, res, next) => {
  try {
    const cartID = req.query.cartID;
    const productID = req.query.productID;

    const cart = await Cart.findById(cartID);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const existingProductIndex = cart.products.findIndex(
      (product) => product.product_id.toString() === productID
    );

    if (existingProductIndex !== -1) {
      const existingProduct = cart.products[existingProductIndex];
      const product = await Product.findById(productID);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      existingProduct.quantity -= 1;
      existingProduct.subtotal = existingProduct.quantity * product.price;

      if (existingProduct.quantity <= 0) {
        cart.products.splice(existingProductIndex, 1);
      }
    }

    cart.total = cart.products.reduce((total, product) => {
      return total + product.subtotal;
    }, 0);

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
