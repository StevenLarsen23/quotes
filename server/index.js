require("dotenv").config();

const express = require("express");
const massive = require("massive");
const session = require("express-session");

const userCtrl = require('./userController')
const qCtrl = require('./quoteController')

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  })
);
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("database online");
  })
  .catch((err) => console.log("Database error:" + err));

  // user endpoints
  app.post('/auth/register', userCtrl.register);
  app.post('/auth/login', userCtrl.login);
  app.post('/auth/logout', userCtrl.logout);
  app.get('/api/user', userCtrl.getUser);
  // app.put('/api/user/:id', userCtrl.editUser);

  // quotes endpoints
  app.get('/api/quotes', qCtrl.allQuotes);
  app.get('/api/quotes/:id', qCtrl.oneQuote);
  app.get('/api/search', qCtrl.searchQuotes)
  app.post('/api/quotes', qCtrl.addQuote);
  app.put('/api/quotes/:id', qCtrl.editQuote);
  app.delete('/api/quotes/:id', qCtrl.deleteQuote);

  // user's quotes endpoints
  app.get('/api/favorites', qCtrl.myQuotes);
  app.get('/api/searchfav', qCtrl.searchFavorites);
  app.post('/api/favorites', qCtrl.addFavorites);
  app.put('/api/favotires/:id', qCtrl.editFavorites);
  app.delete('/api/favorites/:id', qCtrl.deleteFavorite);

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port: ${SERVER_PORT}`)
);
