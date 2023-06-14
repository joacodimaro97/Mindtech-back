import Product from "../../models/Product.js";
import Category from "../../models/Category.js";
import Brand from "../../models/Brand.js";

export const paginateProducts = async (req, res, next) => {
  const page = req.query.page;
  const limit = req.query.limit;

  try {
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const searchByName = async (req, res, next) => {
  const search = req.query.search;
  try {
    const query = {
      $or: [{ name: { $regex: search, $options: "i" } }],
    };

    const products = await Product.find(query);

    res.status(200).json({
      products: products,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const searchByCategory = async (req, res, next) => {
  const search = req.query.search;
  try {
    const category = await Category.findOne({
      name: { $regex: search, $options: "i" },
    });

    if (category) {
      const products = await Product.find({ category: category._id });

      res.status(200).json({
        products: products,
      });
    } else {
      res.status(200).json({
        products: [],
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const searchByBrand = async (req, res, next) => {
  const search = req.query.search;
  try {
    const brand = await Brand.findOne({
      name: { $regex: search, $options: "i" },
    });

    if (brand) {
      const products = await Product.find({ brand: brand._id });

      res.status(200).json({
        products: products,
      });
    } else {
      res.status(200).json({
        products: [],
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};



export const rating = async (req, res, next) => {
  const { _id } = req.body;
console.log(_id)
  try {
    const product = await Product.findById(
      { _id: _id }   
  );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.rating++;
    await product.save();

    res.status(200).json({ message: 'Rating saved correctly' });
  } catch (error) {
    next(error);
  }
};
