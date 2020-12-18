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
// visit localhost:4000
```

Your server should now be running on [localhost:4000](http://localhost:4000/)

You can try accessing [localhost:4000/api/all](http://localhost:4000/api/all) to see if it is working

# Live Demo

This will return all users data, [check our wiki for more information](https://github.com/gustavokei/gc-dportal-caps/wiki)

[https://gc-dportal-caps.herokuapp.com/api/all](https://gc-dportal-caps.herokuapp.com/api/all)

## .env file configuration

The database used in this project was provided by a 3rd party provider

This file will configure the database connection

* `DB_DATABASE` = the database name
* `DB_USER` = the user name
* `DB_PASS` = the user password
* `DB_HOST` = server address
* `DB_PORT` = server port

## Documentation

For more information about our project, [visit our wiki.](https://github.com/gustavokei/gc-dportal-caps/wiki)
