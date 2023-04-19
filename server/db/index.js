//this is the access point for all things database related!

const db = require('./db')
const User = require('./models/User')
const ProductLine = require("./models/ProductLine");
const Product = require("./models/Product");


const productLines = [
  {
    id: 0,
    name: 'The Office Essentials',
    description: 'Products that every office needs'
  },
  {
    id: 1,
    name: 'The Fireproof',
    description: 'Products designed to withstand high temperatures'
  },
  {
    id: 2,
    name: 'The Flair',
    description: 'Products that add a touch of style to your workspace'
  },
  {
    id: 3,
    name: 'The Weekend Warrior',
    description: 'Products that help you get through those weekend projects'
  },
  {
    id: 4,
    name: 'The Basement Collection',
    description: 'Products for the home workshop or garage'
  },
];

const products = [
  {
    model_id: 0,
    model_name: 'TPS Report Stapler',
    model_description: 'This stapler is capable of stapling through 250 sheets of paper, just like your TPS report cover sheet. It even comes with a red Swingline option for those who appreciate the classics.',
    image_url: 'https://via.placeholder.com/150x150',
    price: 29.99,
    in_stock: 100,
    product_line_id: 0,
  },
  {
    model_id: 1,
    model_name: 'Saturday Swingline',
    model_description: 'Nobody wants to work on a Saturday, just like nobody wants this Swingline stapler. But hey, it gets the job done, right?',
    image_url: 'https://via.placeholder.com/150x150',
    price: 14.99,
    in_stock: 250,
    product_line_id: 2,
  },
  {
    model_id: 2,
    model_name: 'Fireproof Stapler',
    model_description: 'When the building\'s on fire, this stapler keeps on stapling. It might even be the only thing left after the flames have subsided.',
    image_url: 'https://via.placeholder.com/150x150',
    price: 49.99,
    in_stock: 50,
    product_line_id: 2,
  },
  {
    model_id: 3,
    model_name: 'Basement Dweller',
    model_description: 'This stapler is perfect for the employee whose desk is in the basement, far away from the sunlight and his colleagues. It even comes with a matching stapler remover!',
    image_url: 'https://via.placeholder.com/150x150',
    price: 19.99,
    in_stock: 75,
    product_line_id: 1,
  },
  {
    model_id: 4,
    model_name: 'Bob\'s Special',
    model_description: 'This stapler is for the Bobs. You know, the consultants. It doesn\'t do much, but it looks pretty good on a resume.',
    image_url: 'https://via.placeholder.com/150x150',
    price: 9.99,
    in_stock: 500,
    product_line_id: 1,
  },
  {
    model_id: 5,
    model_name: 'Bare Minimum Stapler',
    model_description: 'If you feel that the bare minimum is enough, then okay. But some people choose to wear more and we encourage that. But hey, at least this stapler won\'t disappoint you!',
    image_url: 'https://via.placeholder.com/150x150',
    price: 4.99,
    in_stock: 1000,
    product_line_id: 3,
  },
  {
    model_id: 6,
    model_name: 'Flair Stapler',
    model_description: 'You can never have enough flair, especially when it comes to your stapler. This one is decked out in the appropriate number of pieces of flair, so you know it means business.',
    image_url: 'https://via.placeholder.com/150x150',
    price: 14.99,
    in_stock: 500,
    product_line_id: 3,
  },
  {
    model_id: 7,
    model_name: 'Glitch Fixer',
    model_description: 'Built specifically for the accounting department, this stapler can fix any glitch. Just make sure you have your TPS report handy!',
    image_url: 'https://via.placeholder.com/150x150',
    price: 24.99,
    in_stock: 100,
    product_line_id: 0,
  },
  {
    model_id: 8,
    model_name: 'Lumberg\'s Choice',
    model_description: 'Umm, yeah. This stapler is perfect for those who like to, umm, follow the rules. And wear TPS report cover sheets. Yeah.',
    image_url: 'https://via.placeholder.com/150x150',
    price: 9.99,
    in_stock: 250,
    product_line_id: 0,
  },
  {
    model_id: 9,
    model_name: 'Office Space: The Stapler',
    model_description: 'This is the stapler that started it all. It might not look like much, but it\'s a classic. And sometimes, that\'s all you need.',
    image_url: 'https://via.placeholder.com/150x150',
    price: 99.99,
    in_stock: 10,
    product_line_id: 0,
  },
  {
    model_id: 10,
    model_name: 'Milton\'s Revenge',
    model_description: 'This stapler is for those who\'ve had enough of their bosses stealing their red Swingline staplers. It\'s just as reliable, but with a little bit of edge.',
    image_url: 'https://via.placeholder.com/150x150',
    price: 29.99,
    in_stock: 50,
    product_line_id: 2,
  },
  {
    model_id: 11,
    model_name: 'Peter\'s Pick',
    model_description: 'Peter may not care about his job, but he does care about his stapler. This one is his pick, and it should be yours too.',
    image_url: 'https://via.placeholder.com/150x150',
    price: 19.99,
    in_stock: 100,
    product_line_id: 1,
  },
  {
    model_id: 12,
    model_name: 'Samir\'s Secret Weapon',
    model_description: 'Samir may have a hard time with the printer, but with this stapler, he\'s unstoppable. It\'s his secret weapon, and now it can be yours.',
    image_url: 'https://via.placeholder.com/150x150',
    price: 44.99,
    in_stock: 1,
    product_line_id: 3.
  },
];

const users = [
  {
    username: 'cody',
    password: '123'
  },
  {
    username: 'murphy',
    password: '123'
  },
];

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(productLines.map(productLine => ProductLine.create(productLine)));
    await Promise.all(products.map(product => Product.create(product)));
    await Promise.all(users.map(user => User.create(user)));

    //   await db.close();

    console.log("Successfully seeded the database!");
  } catch (error) {
    console.error("There was a problem seeding the database", error);
    //   await db.close();
  }
};






ProductLine.hasMany(Product, { foreignKey: "product_line_id" });
Product.belongsTo(ProductLine, { foreignKey: "product_line_id" });

module.exports = {
  db,
  models: {
    User,
    ProductLine,
    Product,
  },
}
