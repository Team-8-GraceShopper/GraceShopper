const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});



//  at async init(/home/phx_admin / Documents / FullstackAcademy / srPhase / graceShopper / GraceShopper / server / index.js: 12: 7) {
//   name: 'SequelizeDatabaseError',
//     parent: error: relation "ProductLine" does not exist
//   {
//     sql: 'CREATE TABLE IF NOT EXISTS "products" ("model_id"  SERIAL , "name" VARCHAR(255) NOT NULL, "description" TEXT, "image_url" VARCHAR(255), "price" DECIMAL(10,2) NOT NULL DEFAULT 0, "in_stock" INTEGER NOT NULL DEFAULT 0, "product_line_id" INTEGER NOT NULL REFERENCES "ProductLine" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("model_id"));',
//       parameters: undefined
// } 

//   original: error: relation "ProductLine" does not exist
//   {
//     sql: 'CREATE TABLE IF NOT EXISTS "products" ("model_id"  SERIAL , "name" VARCHAR(255) NOT NULL, "description" TEXT, "image_url" VARCHAR(255), "price" DECIMAL(10,2) NOT NULL DEFAULT 0, "in_stock" INTEGER NOT NULL DEFAULT 0, "product_line_id" INTEGER NOT NULL REFERENCES "ProductLine" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("model_id"));',
//       parameters: undefined
//   }


// sql: 'CREATE TABLE IF NOT EXISTS "products" ("model_id"  SERIAL , "name" VARCHAR(255) NOT NULL, "description" TEXT, "image_url" VARCHAR(255), "price" DECIMAL(10,2) NOT NULL DEFAULT 0, "in_stock" INTEGER NOT NULL DEFAULT 0, "product_line_id" INTEGER NOT NULL REFERENCES "ProductLine" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("model_id"));',
//   parameters: { }
// }

