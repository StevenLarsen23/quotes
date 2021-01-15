SELECT * FROM quotes
WHERE LOWER(content) LIKE LOWER(CONCAT('%', $1, '%')) OR LOWER(author) LIKE LOWER(CONCAT('%', $1, '%')) OR LOWER(source) LIKE LOWER(CONCAT('%', $1, '%'))
ORDER BY id;
