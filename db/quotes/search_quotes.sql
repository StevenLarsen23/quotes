SELECT * FROM quotes
WHERE LOWER(content) LIKE LOWER(CONCAT('%', $1, '%'));
