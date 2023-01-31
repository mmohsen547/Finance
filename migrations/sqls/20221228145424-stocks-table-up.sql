CREATE TABLE stocks (
    symbol VARCHAR(55) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    shares INT NOT NULL,
    user_id BIGINT REFERENCES users(id),
    PRIMARY KEY(user_id, symbol)
)