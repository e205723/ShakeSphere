# How to use
## Start the containers
- `$ docker compose up -d`
## Set a web server for development
- `$ docker compose exec react bash`
  - Access the react container
- `$ cd shake-sphere`
- `$ npm start`
  - Access `http://localhost`
  - Please, turn cookies on.
## Set a api server
- `$ docker compose exec api bash`
  - Access the api container
- `$ go run .`
## You can do the followings
- Sign up
- Sign in
- Securely transmit information with JWT
