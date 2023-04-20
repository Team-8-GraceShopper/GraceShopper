const Sequelize = require("sequelize");
const db = require("../db");

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
};

module.exports = Product;
