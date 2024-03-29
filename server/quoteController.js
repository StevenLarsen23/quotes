let favorites = [];

module.exports = {
  allQuotes: async (req, res) => {
    const db = req.app.get("db");
    const user = req.session.user
    const quotes = await db.quotes.all_quotes(user ? user.id : null);
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
    const { author, content, source, /*is_private*/} = req.body;
    const is_private = false;
    const user_id = req.session.user.id;
    try {
      const quote = await db.quotes.add_quote([
        author,
        content,
        source,
        user_id,
        is_private,
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

  /* 
  addTag: (req, res) => {
    const db = req.app.get("db");
    const {quote_id, tag_id} = req.body;
    try {
      const tag = await db.quote.add_tags([
        quote_id
      ])
    }
    db.quotes.add_tags(quote_id, tag_id)
    .then((tags) => {res.status(200).send(tags)})
  },
  */

  addFavorites: (req, res) => {
    const db = req.app.get("db");
    const user_id = req.session.user.id;
    const { quote_id } = req.body;
    db.favorites.add_favorite(user_id, quote_id)
    .then((quotes) => {res.status(200).send(quotes)})
  
  },

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
    db.quotes.my_quotes()
    .then(quotes => res.status(200).send(quotes))
  },

  myFavorites: (req, res) => {
    const db = req.app.get("db");
    db.favorites.get_favorites()
    .then(quotes => res.status(200).send(quotes))
  },

  editQuote: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { author, content, source, is_private} = req.body;

    try {
      const quotes = await db.quotes.edit_quote([+id, author, content, source, is_private]);
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
