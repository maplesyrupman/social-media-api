# Social Media API

A simple api for a social media application. Includes CRUD routes for *Users* and *Thoughts*(posts). Users can have friends and *React* to *Thoughts* 

## Description

Includes two models (*User* and *Thought*) and one sub-schema (*Reaction*) which belongs to the *Thought* model. CRUD routes exist for all three aformentioned schemas. Deleting a *User* will also delete all their thoughts. 

## Getting Started

### Dependencies 

Requires the following to be installed before deployment: 
- Nodejs version 16.0.0 or higher
- MongoDB version 5.0.5 or higher

This application has the following dependancies: 
- date-fns v2.27.0
- express v4.17.2
- mongoose v6.1.2
- nodemon v2.0.15

### Installation

1. ```git clone https://github.com/maplesyrupman/social-media-api.git```
2. ```npm i```
3. *only run if seeds desired*
    ```node seeds.js```
4. ```npm start```

## Author

Written by [maplesyrupman](https://github.com/maplesyrupman)

If you'd like to get in touch, you can send me an email at [maplesyrupman@protonmail.com](mailto:maplesyrupman@protonmail.com)


