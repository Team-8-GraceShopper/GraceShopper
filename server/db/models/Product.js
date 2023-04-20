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
        validate: {
            notEmpty: true,
        },
    },
    descrip: {
        type: Sequelize.TEXT,
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        // validate: {
        //     // allowNull: false,
        //     isDec: true,
        // },
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    prodLine_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //     model: "ProductLine", 
        //     key: "id",
        // },
    },

});


module.exports = Product;
