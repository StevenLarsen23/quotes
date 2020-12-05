SELECT quotes.content, quotes.author, quotes.source
FROM quotes
INNER JOIN favorites ON quotes.id = favorites.quote_id;