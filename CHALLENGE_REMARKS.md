# How to go through all functionality

## Setup

`cp .env.dist .env` - setup env vars

`yarn install` - install deps

## Part1

`git checkout tags/part1` - checkout first part of the solution on the `solution` branch

`yarn migration:run` - run initial migration to setup user table

`yarn test` - run tests

`yarn start` - run server, create some data using [openapi docs](http://localhost:9000/docs)

## Part2

`git checkout tags/part2` - checkout second part of the solution on the `solution` branch

`yarn test` - run tests, tests a snapshot of current user entity against previous reference

`yarn migration:run` - run initial migration to setup user table

`yarn start` - run server, find same behavior with split table
