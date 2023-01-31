CREATE TABLE transactions (
    symbol VARCHAR(55) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    shares INT NOT NULL,
    user_id BIGINT REFERENCES users(id),
    price NUMERIC NOT NULL,
    transaction_type boolean NOT NULL,
    transaction_date TIMESTAMP NOT NULL,
    PRIMARY KEY(user_id, transaction_date)

)