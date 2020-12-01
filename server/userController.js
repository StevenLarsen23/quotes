const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;

    try {
      const [foundUser] = await db.auth.find_email(email);
      if (foundUser) {
        res.status(401).send("Email already registered");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await db.auth.register_user([email, hash]);

        req.session.user = newUser;
        res.status(200).send(req.session.user);
      }
    } catch (err) {
      "Database err on register function", err;
    }
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    try {
      const [foundUser] = await db.auth.find_email(email);

      if (foundUser) {
        const comparePassword = foundUser.password;
        const authenticated = bcrypt.compareSync(password, comparePassword);
        if (authenticated) {
          delete foundUser.password;
          req.session.user = foundUser;
          res.status(200).send(req.session.user);
        } else {
          res.status(401).send("email or password incorrect");
        }
      } else {
        res.status(401).send("email or password incorrect");
      }
    } catch (err) {
      console.log("database error on login function", err);
    }
  },

  logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200)
  },

  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(401).send("Please log in");
    }
  },

};
