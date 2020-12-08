SELECT quotes.content, quotes.author, quotes.source, favorites.user_id
FROM quotes
INNER JOIN favorites ON quotes.id = favorites.quote_id;