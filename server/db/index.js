const db = require("./db");
const User = require("./models/User");
const ProductLine = require("./models/ProductLine");
const Product = require("./models/Product");

module.exports = {
  db,
  models: {
    User,
    ProductLine,
    Product,
  },
};
