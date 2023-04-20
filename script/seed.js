'use strict'

const { db, models: { User, ProductLine, Product } } = require('../server/db')
// const { User, ProductLine, Product, Cart, CartProduct } = models;


async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  // Creating ProductLine
  const productLines = await Promise.all([
    ProductLine.create({ prodLine_Id: 0, name: 'prodLine1', description: 'description for prodLine1' }),
    ProductLine.create({ prodLine_Id: 1, name: 'prodLine2', description: 'description for prodLine2' }),
    ProductLine.create({ prodLine_Id: 2, name: 'prodLine3', description: 'description for prodLine3' }),
    ProductLine.create({ prodLine_Id: 3, name: 'prodLine4', description: 'description for prodLine4' }),
  ])

  // Creating Products
  const products = await Promise.all([
    Product.create({
      id: 0,
      name: 'prod1',
      description: 'This stapler is capable of stapling through 250 sheets of paper, just like your TPS report cover sheet. It even comes with a red Swingline option for those who appreciate the classics.',
      imageUrl: 'https://via.placeholder.com/150x150',
      price: 29.99,
      stock: 100,
      prodLine_Id: 0,
    }),

    Product.create({
      id: 1,
      name: 'prod2',
      description: 'Nobody wants to work on a Saturday, just like nobody wants this Swingline stapler. But hey, it gets the job done, right?',
      imageUrl: 'https://via.placeholder.com/150x150',
      price: 14.99,
      stock: 250,
      prodLine_Id: 2,
    })
  ])

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  JUST FUCKIN AROUND w/ LOGGING SEEDING PERFORANCE METRICS  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*

  ## store tbl creation + seeding time to loadTime
    for (let seeding of tblSeedings) {
      // let status = (seeding.errors > 0) ? ERROR : SUCCESS;
      status = (seeding.errors > 0) ? ERROR : `SUCCESS`;
      let loadTime = Performance.seeding();
    };

  ## could consider adding the following metrics:
        - relationship type (1:many, many:1, etc)
        - table complexity (im sure a (fx) exist: number of foreign keys, num. fields, and calc query time of most verbose call w/i it)
        - blah blah blah.... really just would be nice to build out some of the framework for db analysis / auto-normalizatin tools 
  
*/


  const seedingResults = {
    users: {
      // tbl: 'users',
      qty: users.length,
      errors: 0,
      loadTime: 28,
      // status: status,
      status: `SUCCESS`,
    },

    productLines: {
      // tbl: 'productLines',
      qty: productLines.length,
      errors: 0,
      loadTime: 34,
      // status: status,
      status: `SUCCESS`,
    },

    products: {
      // tbl: 'products',
      qty: products.length,
      errors: 0,
      loadTime: 18,
      // status: status,
      status: `SUCCESS`,
    },
  };
  console.table(seedingResults);


  // console.log(`seeded ${users.length} users successfully`)
  // console.log(`seeded ${productLines.length} productLines successfully`)
  // console.log(`seeded ${products.length} products successfully`)


  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    productLines: {
      prodLine1: productLines[0],
      prodLine2: productLines[1],
    },
    products: {
      prod1: products[0],
      prod2: products[1],
    },
  }
};

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
};

if (module === require.main) {
  runSeed()
};

module.exports = seed;
