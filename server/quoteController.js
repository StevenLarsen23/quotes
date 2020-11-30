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

  addQuote: async (req, res) => {
    const db = req.app.get("db");
    const { author } = req.body;
    const { content } = req.body;
    const { source } = req.body;
    const { user_id } = req.session.user;
    try {
      const quotes = await db.quotes.add_quote([
        author,
        content,
        source,
        user_id,
      ]);
      res.status(200).send(quotes);
    } catch (err) {
      console.log("error adding quote", err);
      res.sendStatus(500);
    }
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