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
  app.delete('/auth/logout', userCtrl.logout);

  // quotes endpoints
  app.get('/api/quotes', qCtrl.allQuotes);
  app.get('/api/quotes/:id', qCtrl.oneQuote);
  app.post('/api/quotes', qCtrl.addQuote);
  app.put('/api/quotes/:id', qCtrl.editQuote);
  app.delete('/api/quotes/:id', qCtrl.deleteQuote);

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port: ${SERVER_PORT}`)
);
