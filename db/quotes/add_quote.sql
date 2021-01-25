INSERT INTO quotes
(author, content, source, is_private, user_id)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;