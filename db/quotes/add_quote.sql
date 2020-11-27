INSERT INTO quotes
(author, content, source, user_id)
VALUES
($1, $2, $3, $4);

SELECT * FROM quotes ORDER BY id; 