# Khoa Huynh's work for Kanban Board
## Features
- Create cards
- Update cards
- Move cards back and forth between columns and within a column
- NodeJS backend server handles CRUD
## Drawbacks
My work has some deficiencies:
- The UI is not 100% accurate to the design.
- The server is restarted when the json files are updated with the card data. The cause of this issue is because I use json files to store the data of cards and columns, **causing the nodemon to reload the whole server**. I implement it in this way to keep the setup simple, otherwise you have to install the database locally to run the code. For this reason**you should wait around 5-7 seconds after changes** on the board while the server is restarting.
## Solutions to this issue:
- Of course, we can get data stored in the database. This is the best solution.
- Second, we can utilize redux persist to temporarily preserve the store data accross the whole application. And then we can schedule the data update with the server. 
- We can implement the redis (in-memory storage) to handle the data right on the backend server.

## Tech Stack
- NodeJS
- ReactJS - Frontend
- ExpressJS - backend

## Installation

Install the dependencies and devDependencies and start the server.

```sh
First you have to cd into Khoa-Kanban-Board-Backend-BO and run commands: (port: 5000)
    yarn install
    yarn run start:dev
Then you cd into Khoa-Kanban-Board-BO and run commands: (port: 3000)
    yarn install
    yarn run start
```
