# Finance Backend Project
A virtual API for a storeFront Where users can buy and sell shares form different stocks. Stocks data are fetched from [IEX Cloud API](https://iexcloud.io/docs/api/).
## Getting Started
This readme will help you run the application locally.

## Technologies Used

- Postgres 
- Nodejs
- dotenv 
- db-migrate
- jsonwebtoken
- express

## Setup steps
#### Download dependencies
You need to download all the dependencies the app need using this command.
```shell    
    npm install
```    
- Create database to connect to the application.
- update the .env file with your local environment variable
- make a migration. `db-migrate up`
- run the application. `npm start`

#### Database Creation
You need to create a database with a specific user then connect it to the application.
```shell
# create a user
CREATE USER my_user WITH PASSWORD 'password123'

# Create databases with my_user as owner of the database
CREATE DATABASE finance WITH OWNER my_user
```

#### Enviroment Variables
You need to create .env file and store enviroment variables in it.

.env file example:
```shell

PORT=3000
# database varaiables
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_USER=my_user
POSTGRES_PASSWORD=password123
DB_PORT=5432

# encryption variables & JWT
SALT_ROUNDS=10
BCRYPT_PASSWORD=speak-freind-and-enter
PEPPER=allohamora123
SECRET_TOKEN=secret-token


#### Make migrations
```shell
db-migrate up
```


#### Run the application
```shell
npm start
```

