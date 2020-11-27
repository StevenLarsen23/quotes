DELETE FROM quotes
WHERE id = $1;

SELECT * FROM quotes ORDER BY id;