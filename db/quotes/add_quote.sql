INSERT INTO quotes
(author, content, source, user_id,  is_private)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;