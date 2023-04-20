const router = require("express").Router();
const { Cart, CartProduct, Product } = require("../db");

router.post("/", async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    if (req.user) {
      const cart = await Cart.findOne({ where: { userId: req.user.id } });
      const cartProduct = await CartProduct.findOne({
        where: { cartId: cart.id, productId: productId },
      });

      if (cartProduct) {
        cartProduct.quantity += quantity;
        await cartProduct.save();
      } else {
        await CartProduct.create({
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        });
      }

      res.status(201).send(cart);
    } else {
      if (!req.session.cart) {
        req.session.cart = [];
      }

      const cartProductIndex = req.session.cart.findIndex(
        (item) => item.productId === productId
      );

      if (cartProductIndex >= 0) {
        req.session.cart[cartProductIndex].quantity += quantity;
      } else {
        req.session.cart.push({ productId, quantity });
      }

      res.status(201).send(req.session.cart);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const quantity = parseInt(req.body.quantity);

    if (quantity < 0) {
      return res.status(400).send("Invalid quantity value");
    }

    if (req.user) {
      const cart = await Cart.findOne({ where: { userId: req.user.id } });
      const cartProduct = await CartProduct.findOne({
        where: { cartId: cart.id, productId: productId },
      });

      if (cartProduct) {
        cartProduct.quantity = quantity;
        await cartProduct.save();
        res.status(200).send(cartProduct);
      } else {
        res.status(404).send("Product not found in cart");
      }
    } else {
      if (!req.session.cart) {
        return res.status(404).send("Cart not found");
      }

      const cartProductIndex = req.session.cart.findIndex(
        (item) => item.productId === productId
      );

      if (cartProductIndex >= 0) {
        req.session.cart[cartProductIndex].quantity = quantity;
        res.status(200).send(req.session.cart[cartProductIndex]);
      } else {
        res.status(404).send("Product not found in cart");
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
