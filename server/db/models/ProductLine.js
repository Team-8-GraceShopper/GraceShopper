const Sequelize = require("sequelize");
const db = require("../db");

const ProductLine = db.define("productLine", {
    id:  {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    descrip: {
        type: Sequelize.TEXT,
    },
});

module.exports = ProductLine;
