# A NodeJS middleware for an old anime game

The name "dportal" refers to a [Dimensional Portal](https://grandchase.fandom.com/wiki/Dimensional_Chasm), which is an element from the Korean game [Grand Chase (for PC)](https://grandchase.fandom.com/wiki/Grand_Chase_Wiki).

> A dimensional chasm, rift, gap, fissure or crevice refers to the place located between the ends of all dimensions in the Grand Chase universe.

Composed as a full-stack solution, this project is also split in two (front-end app is [gc-app-caps](https://github.com/gustavokei/gc-app-caps))

# Getting started

- Clone this repository on your local computer
- Configure .env as needed
- Run the `npm install` and `npm start`.

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

[https://api.devgames.app/api/all](https://api.devgames.app/api/all)

This will return all users data, [check our wiki for more information](https://github.com/gustavokei/gc-dportal-caps/wiki)

## .env file configuration

The database used in this project was provided by a 3rd party provider

This file will configure the database connection

- `SQL_DATABASE_LIST` = a list of databases, I'm currently using `,` + `split()` method to separate names
- `SQL_USER` = the user name
- `SQL_PASS` = the user password
- `EXPOSED_HOST` = server address
- `EXPOSED_PORT` = server port

## Documentation

For more information about our project, [visit our wiki.](https://github.com/gustavokei/gc-dportal-caps/wiki)
