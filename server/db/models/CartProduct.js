const Sequelize = require("sequelize");
const db = require("../db");

const CartProduct = db.define("cartProduct", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = CartProduct;
