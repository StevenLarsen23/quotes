SELECT quotes.content, quotes.author, quotes.source, favorites.user_id, favorites.id
FROM quotes
INNER JOIN favorites ON quotes.id = favorites.quote_id
ORDER BY favorites.id;