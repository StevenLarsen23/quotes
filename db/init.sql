CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    author VARCHAR(100),
    content VARCHAR(500),
    source VARCHAR(400),
    user_id INT REFERENCES users(id)
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    quote_id INT REFERENCES quotes(id)
);