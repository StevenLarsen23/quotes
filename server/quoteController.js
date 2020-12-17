let favorites = [];

module.exports = {
  allQuotes: async (req, res) => {
    const db = req.app.get("db");
    const quotes = await db.quotes.all_quotes();
    res.status(200).send(quotes);
  },

  

  oneQuote: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const [quote] = await db.quotes.one_quote(+id);
    if (quote) {
      res.status(200).send(quote);
    } else {
      res.status(404).send("Quote not found");
    }
  },

  searchQuotes: async (req, res) => {
    const db = req.app.get("db");
    const { search } = req.query;
    const quotes = await db.quotes.search_quotes(search);
    if (quotes) {
      res.status(200).send(quotes);
    } else {
      res.status(400).send("No quotes matching input");
    }
  },

  addQuote: async (req, res) => {
    const db = req.app.get("db");
    const { author, content, source } = req.body;
    const user_id = req.session.user.id;
    try {
      const quote = await db.quotes.add_quote_get_quote([
        author,
        content,
        source,
        user_id,
      ]);
    
      const quote_id = quote[0].id

      db.favorites.add_favorite(user_id, quote_id)
      const quotes = await db.quotes.all_quotes()
    .then(() => {res.status(200).send(quotes)})
    } catch (err) {
      console.log("error adding quote", err);
      res.sendStatus(500);
    }
  },

  addFavorites: (req, res) => {
    const db = req.app.get("db");
    const user_id = req.session.user.id;
    const { quote_id } = req.body;
    db.favorites.add_favorite(user_id, quote_id)
    .then((quotes) => {res.status(200).send(quotes)})
  
  },

  // addQuote: async (req, res) => {
  //   const db = req.app.get("db");
  //   const { author, content, source } = req.body;
  //   const user_id = req.session.user.id;
  //   try {
  //     const quotes = await db.quotes.add_quote([
  //       author,
  //       content,
  //       source,
  //       user_id,
  //     ]);

      

  //     res.status(200).send(quotes);
  //   } catch (err) {
  //     console.log("error adding quote", err);
  //     res.sendStatus(500);
  //   }
  // },

  

  deleteFavorite: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    try {
      const favorites = await db.favorites.delete_favorites(+id);
      res.status(200).send(favorites);
    } catch (err) {
      console.log(`Couldn't delete quote`, err);
      res.sendStatus(500);
    }
  },

  myQuotes: (req, res) => {
    const db = req.app.get("db");
    db.favorites.get_favorites()
    .then(quotes => res.status(200).send(quotes))
  },

  editQuote: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { author } = req.body;
    const { content } = req.body;
    const { source } = req.body;

    try {
      const quotes = await db.quotes.edit_quote([+id, author, content, source]);
      res.status(200).send(quotes);
    } catch (err) {
      console.log("Error when editing quote", err);
      res.sendStatus(500);
    }
  },

  deleteQuote: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    try {
      const quotes = await db.quotes.delete_quote(+id);
      res.status(200).send(quotes);
    } catch (err) {
      console.log(`Couldn't delete quote`, err);
      res.sendStatus(500);
    }
  },
};
