const router = require("express").Router();
const { Product } = require("../db");
const { isUser, isAdmin } = require("./authMiddleware");
module.exports = router;

// Get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// Get a specific product by ID
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// Update a product
router.put("/:itemId", isUser, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId);
    await product.update(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// Create a new product
router.post("/", isUser, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Delete a product
router.delete("/:itemId", isUser, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId);
    if (product) {
      await product.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});
