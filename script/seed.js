"use strict";

const { db, models } = require("../server/db");
const { User, ProductLine, Product } = models;

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const [cody, murphy] = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123", isAdmin: true }),
  ]);

  // Creating ProductLines

  const [
    officeEssentials,
    fireproof,
    flair,
    weekendWarrior,
    basementCollection,
  ] = await ProductLine.bulkCreate([
    {
      name: "The Office Essentials",
      description: "Products that every office needs",
    },
    {
      name: "The Fireproof",
      description: "Products designed to withstand high temperatures",
    },
    {
      name: "The Flair",
      description: "Products that add a touch of style to your workspace",
    },
    {
      name: "The Weekend Warrior",
      description: "Products that help you get through those weekend projects",
    },
    {
      name: "The Basement Collection",
      description: "Products for the home workshop or garage",
    },
  ]);

  // Creating Products

  const [
    tpsReportStapler,
    saturdaySwingline,
    fireproofStapler,
    basementDweller,
    bobSpecial,
    bareMinimumStapler,
    flairStapler,
    glitchFixer,
    lumbergsChoice,
    officeSpaceTheStapler,
    miltonsRevenge,
    petersPick,
    samirsSecretWeapon,
  ] = await Promise.all([
    Product.create({
      name: "TPS Report Stapler",
      description:
        "This stapler is capable of stapling through 250 sheets of paper, just like your TPS report cover sheet. It even comes with a red Swingline option for those who appreciate the classics.",
      imageUrl:
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/2fd33721936819.56045277877f7.png",
      price: 29.99,
      inStock: 100,
      productLineId: officeEssentials.id,
    }),
    Product.create({
      name: "Saturday Swingline",
      description:
        "Nobody wants to work on a Saturday, just like nobody wants this Swingline stapler. But hey, it gets the job done, right?",
      imageUrl:
        "https://media.accobrands.com/media/560-560/375713.jpg?width=1360px&height=898px",
      price: 14.99,
      inStock: 250,
      productLineId: officeEssentials.id,
    }),
    Product.create({
      name: "Fireproof Stapler",
      description:
        "When the building's on fire, this stapler keeps on stapling. It might even be the only thing left after the flames have subsided.",
      imageUrl:
        "https://images.thdstatic.com/productImages/7f1e355c-f919-40a6-9d3b-b40c2781f895/svn/dewalt-staple-guns-dwht74841d-64_600.jpg",
      price: 49.99,
      inStock: 50,
      productLineId: fireproof.id,
    }),
    Product.create({
      name: "Basement Dweller",
      description:
        "This stapler is perfect for the employee whose desk is in the basement, far away from the sunlight and his colleagues. It even comes with a matching stapler remover!",
      imageUrl:
        "https://www.schoolaids.com/web/image/product.template/38277/image_1024?unique=fb47a3d",
      price: 19.99,
      inStock: 75,
      productLineId: basementCollection.id,
    }),
    Product.create({
      name: "Bob's Special",
      description:
        "This stapler is for the Bobs. You know, the consultants. It doesn't do much, but it looks pretty good on a resume.",
      imageUrl: "https://content.etilize.com/1300/1010066440.jpg",
      price: 9.99,
      inStock: 500,
      productLineId: basementCollection.id,
    }),
    Product.create({
      name: "Bare Minimum Stapler",
      description:
        "If you feel that the bare minimum is enough, then okay. But some people choose to wear more and we encourage that. But hey, at least this stapler won't disappoint you!",
      imageUrl:
        "https://content.oppictures.com/Master_Images/Master_Variants/Variant_500/784280.JPG",
      price: 4.99,
      inStock: 1000,
      productLineId: weekendWarrior.id,
    }),
    Product.create({
      name: "Flair Stapler",
      description:
        "You can never have enough flair, especially when it comes to your stapler. This one is decked out in the appropriate number of pieces of flair, so you know it means business.",
      imageUrl:
        "https://www.ldproducts.com/media/catalog/product/cache/ae0f6c9d4182962579989c7d9a447cb1/1/0/1010066477.jpg",
      price: 14.99,
      inStock: 500,
      productLineId: flair.id,
    }),
    Product.create({
      name: "Glitch Fixer",
      description:
        "Built specifically for the accounting department, this stapler can fix any glitch. Just make sure you have your TPS report handy!",
      imageUrl:
        "https://media.accobrands.com/media/560-560/45581.jpg?width=680px&height=449px",
      price: 24.99,
      inStock: 100,
      productLineId: flair.id,
    }),
    Product.create({
      name: "Lumberg's Choice",
      description:
        "Umm, yeah. This stapler is perfect for those who like to, umm, follow the rules. And wear TPS report cover sheets. Yeah.",
      imageUrl: "https://m.media-amazon.com/images/I/51AWrURGnqL.jpg",
      price: 9.99,
      inStock: 250,
      productLineId: weekendWarrior.id,
    }),
    Product.create({
      name: "Office Space: The Stapler",
      description:
        "This is the stapler that started it all. It might not look like much, but it's a classic. And sometimes, that's all you need.",
      imageUrl:
        "https://media.accobrands.com/media/560-560/491504.jpg?width=1360px&height=898px",
      price: 99.99,
      inStock: 10,
      productLineId: officeEssentials.id,
    }),
    Product.create({
      name: "Milton's Revenge",
      description:
        "This stapler is for those who've had enough of their bosses stealing their red Swingline staplers. It's just as reliable, but with a little bit of edge.",
      imageUrl:
        "https://sc04.alicdn.com/kf/H175a9a0043fb43e4be026107525fa9bcF.jpg",
      price: 29.99,
      inStock: 50,
      productLineId: fireproof.id,
    }),
    Product.create({
      name: "Peter's Pick",
      description:
        "Peter may not care about his job, but he does care about his stapler. This one is his pick, and it should be yours too.",
      imageUrl:
        "https://de2wfhoo6xqi5.cloudfront.net/orig/c6f/44a/0860bdbb1e2d9b5ea0506ab5e53fd3a48b.jpg",
      price: 19.99,
      inStock: 100,
      productLineId: officeEssentials.id,
    }),
    Product.create({
      name: "Samir's Secret Weapon",
      description:
        "Samir may have a hard time with the printer, but with this stapler, he's unstoppable. It's his secret weapon, and now it can be yours.",
      imageUrl:
        "https://content.oppictures.com/Master_Images/Master_Variants/Variant_500/784216.JPG",
      price: 44.99,
      inStock: 1,
      productLineId: weekendWarrior.id,
    }),
  ]);

  console.log(`seeded ${cody.username} and ${murphy.username}`);
  console.log(
    `seeded ${officeEssentials.name}, ${flair.name}, ${fireproof.name}, ${weekendWarrior.name}, ${basementCollection.name}`
  );
  console.log(
    `seeded ${tpsReportStapler.name}, ${saturdaySwingline.name},${fireproofStapler.name},${basementDweller.name},${bobSpecial.name},${bareMinimumStapler.name},${flairStapler.name},${glitchFixer.name},${lumbergsChoice.name},${officeSpaceTheStapler.name},${miltonsRevenge.name},${petersPick.name},${samirsSecretWeapon.name}`
  );

  await db.close();
  console.log("db connection closed");
}

if (module === require.main) {
  (async () => {
    console.log("seeding...");
    try {
      await seed();
    } catch (err) {
      console.error(err);
      process.exitCode = 1;
    } finally {
      console.log("...seeding complete");
    }
  })();
}

module.exports = seed;
