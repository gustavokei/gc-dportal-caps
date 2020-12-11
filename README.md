# A NodeJS REST API for the [gc-app-caps](https://github.com/gustavokei/gc-app-caps) project
This server listens to front-end requests, fetches data from a MSSQL database, and then sends the response back.

The name "dportal" refers to a [Dimensional Portal](https://grandchase.fandom.com/wiki/Dimensional_Chasm), which is an element from the Korean game [Grand Chase](https://grandchase.fandom.com/wiki/Grand_Chase_Wiki).

# Getting started

* Clone this repository on your local computer
* Configure .env as needed 
* Run the `npm install` and `npm start`.

```
git clone https://github.com/gustavokei/gc-dportal-caps.git
cd gc-dportal-caps/
cp .env.sample .env
// modify .env as needed
npm install
npm start
// visit localhost:3000
```

Your server should now be running on [localhost:4000](http://localhost:4000/).

## .env file configuration

This file will provide the database connection information to the server.

* `DB_DATABASE` = the database name
* `DB_USER` = the user name
* `DB_PASS` = the user password
* `DB_HOST` = server address
* `DB_PORT` = server port

## Documentation

For more information about our project, [visit our wiki.](https://github.com/gustavokei/gc-dportal-caps/wiki)
