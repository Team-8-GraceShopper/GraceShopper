"use strict";

const { db, models } = require("../server/db");
const { User, ProductLine, Product, Cart, CartProduct } = models;

async function seed() {
  try {
    await db.sync({
      force: true,
    }); // clears db and matches models to tables
    console.log("db synced!");

    // Creating Users
    const [cody, murphy] = await Promise.all([
      User.create({
        username: "cody",
        password: "123",
      }),
      User.create({
        username: "murphy",
        password: "123",
      }),
    ]);

    // Creating ProductLines
    const [prodLine1, prodLine2, prodLine3, prodLine4] = await Promise.all([
      ProductLine.create({
        name: "prodLine1",
        description: "descrip for prodLine1",
      }),
      ProductLine.create({
        name: "prodLine2",
        description: "descrip for prodLine2",
      }),
      ProductLine.create({
        name: "prodLine3",
        description: "descrip for prodLine3",
      }),
      ProductLine.create({
        name: "prodLine4",
        description: "descrip for prodLine4",
      }),
    ]);

    // Creating Products
    const [prod1, prod2] = await Promise.all([
      Product.create({
        name: "prod1",
        description:
          "This stapler is capable of stapling through 250 sheets of paper, just like your TPS report cover sheet. It even comes with a red Swingline option for those who appreciate the classics.",
        imageUrl: "https://via.placeholder.com/150x150",
        price: 29.99,
        inStock: 100,
        productLineId: prodLine1.id,
      }),

      Product.create({
        name: "prod2",
        description:
          "Nobody wants to work on a Saturday, just like nobody wants this Swingline stapler. But hey, it gets the job done, right?",
        imageUrl: "https://via.placeholder.com/150x150",
        price: 14.99,
        inStock: 250,
        productLineId: prodLine2.id,
      }),
    ]);

    console.log(`seeded ${cody.username} and ${murphy.username}`);
    console.log(
      `seeded ${prodLine1.name}, ${prodLine2.name}, ${prodLine3.name}, ${prodLine4.name}`
    );
    console.log(`seeded ${prod1.name} and ${prod2.name}`);

    // Creating Carts
    const [cartCody, cartMurphy] = await Promise.all([
      Cart.create({
        userId: cody.id,
      }),
      Cart.create({
        userId: murphy.id,
      }),
    ]);

    // Adding products to the carts
    await Promise.all([
      CartProduct.create({
        cartId: cartCody.id,
        productId: prod1.id,
        quantity: 2,
      }),
      CartProduct.create({
        cartId: cartMurphy.id,
        productId: prod2.id,
        quantity: 1,
      }),
    ]);

    console.log(`seeded carts for ${cody.username} and ${murphy.username}`);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("...seeding complete");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
