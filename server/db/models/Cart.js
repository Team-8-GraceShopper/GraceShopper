const Sequelize = require("sequelize");
const db = require("../db");
const CartProduct = require("./CartProduct");

const Cart = db.define("cart", {
  isProcessed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }});

Cart.hasMany(CartProduct);

module.exports = Cart;
