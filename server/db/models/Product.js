const Sequelize = require("sequelize");
const db = require("../db");
//const ProductLine = require("../models/ProductLine");
const CartProduct = require("../models/CartProduct");
const Cart = require("../models/Cart");

const Product = db.define("product", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },  
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/150x150",
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  inStock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

Product.associate = (models) => {
  Product.belongsTo(models.ProductLine);
  Product.belongsToMany(Cart, { through: CartProduct });
  Cart.belongsToMany(Product, { through: CartProduct });
};

module.exports = Product;
