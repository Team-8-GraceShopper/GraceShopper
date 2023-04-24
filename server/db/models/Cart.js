const Sequelize = require("sequelize");
const db = require("../db");
const CartProduct = require("./cartProduct");

const Cart = db.define("cart", {});

Cart.hasMany(CartProduct);

module.exports = Cart;
