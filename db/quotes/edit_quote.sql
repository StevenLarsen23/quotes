UPDATE quotes
SET author = $2, content = $3, source = $4, is_private = $5
WHERE id = $1;

SELECT * FROM quotes ORDER BY id;