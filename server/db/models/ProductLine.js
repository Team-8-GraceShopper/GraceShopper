const Sequelize = require("sequelize");
const db = require("../db");

const ProductLine = db.define("productline", {
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
});

ProductLine.associate = (models) => {
  ProductLine.belongsTo(models.Product);
  ProductLine.hasMany(models.Product);
};

module.exports = ProductLine;
