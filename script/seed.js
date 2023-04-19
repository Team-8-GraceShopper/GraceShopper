'use strict'

const { db, models: { User, ProductLine, Product } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
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
    ProductLine.create({ name: 'prodLine1', description: 'descrip for prodLine1' }),
    ProductLine.create({ name: 'prodLine2', description: 'descrip for prodLine2' }),
    ProductLine.create({ name: 'prodLine3', description: 'descrip for prodLine3' }),
    ProductLine.create({ name: 'prodLine4', description: 'descrip for prodLine4' }),
  ])

  // Creating Products
  const products = await Promise.all([
    Product.create({
      model_id: 0, model_name: 'prod1', model_description: 'This stapler is capable of stapling through 250 sheets of paper, just like your TPS report cover sheet. It even comes with a red Swingline option for those who appreciate the classics.', image_url: 'https://via.placeholder.com/150x150', price: 29.99, in_stock: 100, product_line_id: 0,
    }),

    Product.create({
      model_id: 1, model_name: 'prod2', model_description: 'Nobody wants to work on a Saturday, just like nobody wants this Swingline stapler. But hey, it gets the job done, right?', image_url: 'https://via.placeholder.com/150x150', price: 14.99, in_stock: 250, product_line_id: 2,
    })
  ])



  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
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







/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
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
  }

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed


