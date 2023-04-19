const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
    model_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    description: {
        type: Sequelize.TEXT,
    },
    image_url: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            allowNull: false,
            isDec: true,
        },
    },
    in_stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    product_line_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "ProductLine",
            key: "id",
        },
    },
});

module.exports = Product;
