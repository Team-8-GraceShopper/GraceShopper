"use strict";

const { db, models } = require("../server/db");
const { User, ProductLine, Product } = models;

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const [cody, murphy, skywalker, vader, yoda ] = await Promise.all([
    User.create({ username: "cody", password: "123", email: "cody@gmail.com", isAdmin: false }),
    User.create({ username: "murphy", password: "123", email: "murphy@gmail.com", isAdmin: true }),
    User.create({ username: "skywalker", password: "123", email: "skywalker@gmail.com", isAdmin: true}),
    User.create({ username: "vader", password: "123", email: "vader@gmail.com", isAdmin: false}),
    User.create({ username: "yoda", password: "123", email: "yoda@gmail.com", isAdmin: true})
  ]);

  // Creating ProductLines

  const [rebels, republic, empire, separatists] = await ProductLine.bulkCreate([
    {
      name: "The Rebel Alliance",
      description:
        "A resistance movement formed by various species and factions across the galaxy to oppose the tyrannical rule of the Galactic Empire",
    },
    {
      name: "The Grand Republic",
      description: "We are all the Republic",
    },
    {
      name: "The Galactic Empire",
      description:
        "Working to expand our authority and establish order throughout the galaxy through the might of our military, and quashing any resistance or rebellion that threatened our rule",
    },
    {
      name: "The Separatist Alliance",
      description:
        "Corporations led by Count Dooku to secede from the Galactic Republic and establish their own independent government",
    },
  ]);

  // Creating Products

  const [
    deathstar,
    executer,
    xwing,
    millenniumFalcon,
    starDestroyer,
    ywing,
    tieFighter,
    tieInterceptor,
    droidTri,
    tradeBattleship,
    dookusSailor,
    petersPick,
    republicStarCruiser,
    nabooStarfighter,
    arc170,
  ] = await Promise.all([
    Product.create({
      name: "Death Star",
      description:
        "The Death Star is the Empire's battle station which has ability to use a kyber-crystal powered laser to destroy entire planets.",
      imageUrl:
        "https://p7.hiclipart.com/preview/951/709/266/grand-moff-tarkin-death-star-stormtrooper-star-wars-galactic-empire-death-star.jpg",
      price: 8999.99,
      inStock: 2,
      productLineId: empire.id,
    }),
    Product.create({
      name: "Executer",
      description:
        "The Executor serves as Darth Vader's flagship during the events of The Empire Strikes Back, leading the Death Squadron against the Rebel Alliance on Hoth and in pursuit of the Millennium Falcon.",
      imageUrl:
        "https://w7.pngwing.com/pngs/658/94/png-transparent-super-star-destroyer-executor-grand-admiral-thrawn-star-wars-airplane-death-star-airplane-weapon-star-destroyer.png",
      price: 1599.99,
      inStock: 100,
      productLineId: empire.id,
    }),
    Product.create({
      name: "X-wing Starfighter",
      description:
        "The X-wing is a versatile Rebel Alliance starfighter that balances speed with firepower. Armed with four laser cannons and two proton torpedo launchers, the X-wing can take on anything the Empire throws at it.",
      imageUrl:
        "https://static.independent.co.uk/2022/05/10/15/05224039-7f8ad3b9-b0a1-430e-9ab1-2a6134bedcd7.jpg?quality=75&width=990&crop=5776%3A4336%2Csmart&auto=webp",
      price: 210.0,
      inStock: 150,
      productLineId: rebels.id,
    }),
    Product.create({
      name: "Millennium Falcon",
      description:
        "The Millenium Falcon is a YT-1300 freighter that has been heavily modified to become faster, stronger, and more powerful. The ship was made in Corellia, the homeworld of Han Solo.",
      imageUrl:
        "https://www.pngkit.com/png/detail/12-126143_millennium-falcon-star-wars-png-photo-star-wars.png",
      price: 9999.99,
      inStock: 1,
      productLineId: rebels.id,
    }),
    Product.create({
      name: "Star Destoryer",
      description:
        "A Star Destroyer is a dagger-shaped type of capital ship that were used by the Galactic Republic, the Galactic Empire, the First Order, and the Sith Eternal",
      imageUrl:
        "https://www.pngfind.com/pngs/m/678-6782698_star-destroyer-png-transparent-png.png",
      price: 5000.0,
      inStock: 25000,
      productLineId: empire.id,
    }),
    Product.create({
      name: "Y-wing",
      description:
        "The Y-wing is a workhorse starfighter has been in use since the Clone Wars. Used for dogfights and for bombing runs against capital ships and ground targets",
      imageUrl:
        "https://e7.pngegg.com/pngimages/251/348/png-clipart-clone-wars-y-wing-x-wing-starfighter-a-wing-star-wars-star-wars-fighter-aircraft-clone-wars.png",
      price: 99.99,
      inStock: 500,
      productLineId: rebels.id,
    }),
    Product.create({
      name: "Tie Figther",
      description:
        "Built specifically for the accounting department, this stapler can fix any glitch. Just make sure you have your TPS report handy!",
      imageUrl:
        "https://www.pngmart.com/files/22/Star-Wars-TIE-Fighter-PNG-Isolated-Transparent-Picture.png",
      price: 999.99,
      inStock: 100,
      productLineId: empire.id,
    }),
    Product.create({
      name: "Tie Interceptor",
      description:
        "The TIE interceptor is the lightest, fastest, and most responsive starfighter in space. It can use its high acceleration and turn rates to outmaneuver an enemy fighter, evade missiles, and dodge incoming cannon fire from capital ship turrets.",
      imageUrl:
        "https://w7.pngwing.com/pngs/386/694/png-transparent-anakin-skywalker-star-wars-tie-fighter-tie-avanzado-star-wars-thumbnail.png",
      price: 99.99,
      inStock: 10,
      productLineId: empire.id,
    }),
    Product.create({
      name: "Droid Tri-fighter",
      description:
        "PThe droid tri-fighter is a weapon of the Trade Federation, which has aligned itself with the Separatist forces. The droid is armed with laser missiles that contain buzz droids, which attach to enemy ships and tear them apart.",
      imageUrl: "https://m.media-amazon.com/images/I/51MnDIeSxTL.jpg",
      price: 499.99,
      inStock: 100,
      productLineId: separatists.id,
    }),
    Product.create({
      name: "Trade Federation battleship ",
      description:
        "Trade Federation Landing Ships transport the Trade Federation's invasion forces to planets surfaces.(Made to Order)",
      imageUrl:
        "https://i.pinimg.com/originals/f5/1e/2d/f51e2d2dfa74e1ca023960b64df8a9db.jpg",
      price: 799.99,
      inStock: 30000,
      productLineId: separatists.id,
    }),
    Product.create({
      name: "Dooku's solar sailer",
      description:
        "The solar sailer is a luxurious yacht commissioned by Dooku from his allies on Geonosis prior to the outbreak of the Clone Wars.",
      imageUrl: "https://swrpggm.com/wp-content/uploads/2020/12/SSFE.png",
      price: 1999.99,
      inStock: 5,
      productLineId: separatists.id,
    }),
    Product.create({
      name: "Jedi Starfighter",
      description:
        "A starfighter for pilots with Force-aided reflexes, stripping down the fighters’ systems and making their controls as responsive as possible. ",
      imageUrl:
        "https://media.sketchfab.com/models/053a14f9353a4f4aa6300fa0a398ffab/thumbnails/10320578cdc4444dac0171ca0ea2e368/9da15018c3a04066820a9665abb913d2.jpeg",
      price: 5999.99,
      inStock: 100,
      productLineId: republic.id,
    }),
    Product.create({
      name: "Republic Star Cruiser",
      description:
        "Republic Cruisers are generally unarmed and feature a red color scheme as a symbol of neutrality and diplomatic immunity.",
      imageUrl:
        "https://www.iconarchive.com/download/i61913/jonathan-rey/star-wars-vehicles/Republic-Attack-Cruiser.ico",
      price: 557.99,
      inStock: 2000,
      productLineId: republic.id,
    }),
    Product.create({
      name: "Naboo N-1 Starfighter",
      description:
        "Protecting the skies and space around Naboo is the N-1 starfighter. Its sleek design exemplifies the philosophy of art and function witnessed throughout Naboo technology.",
      imageUrl:
        "https://cdn.rebrickable.com/media/thumbs/mocs/moc-112176.jpg/1000x800.jpg",
      price: 500.0,
      inStock: 5,
      productLineId: republic.id,
    }),
    Product.create({
      name: "ARC-170 starfighter",
      description:
        "A heavy-duty model of starfighter used by the Galactic Republic during the Clone Wars and was considered the latest in fighter technology",
      imageUrl:
        "https://thumbs.coleka.com/media/item/201710/01/revenge-of-the-sith-arc-170-starfighter-001.webp",
      price: 549.99,
      inStock: 500,
      productLineId: republic.id,
    }),
  ]);

  console.log(`seeded ${cody.username} and ${murphy.username} and ${skywalker.username} , ${yoda.username} , ${vader.username}`);
  console.log(
    `seeded ${rebels.name}, ${republic.name}, ${empire.name}, ${separatists.name}`
  );
  console.log(
    `seeded ${deathstar.name}, ${executer.name},${xwing.name},${millenniumFalcon.name},${starDestroyer.name},${ywing.name},${tieFighter.name},${tieInterceptor.name},${droidTri.name},${dookusSailor.name},${tradeBattleship.name},${petersPick.name},${republicStarCruiser.name}, ${nabooStarfighter.name}`,
    `${arc170.name}`
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
