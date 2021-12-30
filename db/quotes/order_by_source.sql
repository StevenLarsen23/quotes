SELECT * FROM quotes
WHERE is_private = false OR user_id = $1
ORDER BY source;