SELECT * FROM quotes
WHERE LOWER(content) LIKE LOWER(CONCAT('%', $1, '%'))
ORDER BY id;
