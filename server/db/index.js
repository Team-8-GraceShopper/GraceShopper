const db = require("./db");
const User = require("./models/User");
const ProductLine = require("./models/ProductLine");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const CartProduct = require("./models/CartProduct");

module.exports = {
  db,
  models: {
    User,
    ProductLine,
    Product,
    Cart,
    CartProduct,
  },
};
