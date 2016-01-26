# Purchases API

### Running the project

1. `npm install`. It installs all project's dependencies
2. Set up MySQL database and type correct database connection settings in `config/env/development.js`
3. `npm start`. It runs the project using local nodemon.
4. Go to http://localhost:8080 and see result.

### Authentication

#### Sign Up
To sign up make http post request to '/sign-up' passing such parameters at body
```
{
  "username": "YourUsername",
  "name": "YourName",
  "password": "YourPassword123"
}
```

If you pass correct data you will get response of user and token
otherwise you will get ValidationError or any other error.

#### Sign In
To sign in make http post request to '/sign-in' passing such parameters at body
```
{
  "username": "YourUsername",
  "password": "YourPassword123"
}
```

If you pass correct data you will get response of user and token
otherwise you will get IncorrectData error or any other error.

#### Sign Out
To sign out you need destroy token on your client side.

### Change environment

To change environment change NODE_ENV variable in `package.json start script`.
