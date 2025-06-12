# 🚧Under Construction🚧

# Checkmate

A board game stats app with a social component, mobile and web friendly. A great place to research board games, track your stats, and compete with your friends. You can also make wishlists and keep track of your collection.

## Tech & Frameworks: 

#### Web

* React
* Webpack
* Tamagui
* `zxcvbn` for password strength checking

#### Mobile

* React Native
* Tamagui
* `zxcvbn` for password strength checking

#### Backend

* Node/Typescript Backend that utilizes Axios to make requests to [Board Game Geek API](https://boardgamegeek.com/wiki/page/BGG_XML_API2). 
* Database is Postgres with Knex, hosted through AWS RDS
* Backend utilizes `Jest` and `Supertest` for acceptance tests along with a Test Database
*

## Database Design

![image](./docs/db-ERD.png)