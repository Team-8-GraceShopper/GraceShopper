const router = require("express").Router();
const Product = require("../db/models/Product");

//GET ALL PRODUCTS
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// GET SINGLE PRODUCT //
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
