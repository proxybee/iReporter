[![Build Status](https://travis-ci.org/proxybee/iReporter.svg?branch=develop)](https://travis-ci.org/proxybee/iReporter)
[![Coverage Status](https://coveralls.io/repos/github/proxybee/iReporter/badge.svg?branch=develop)](https://coveralls.io/repos/github/proxybee/iReporter/badge.svg?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/fcf4220d15a85451b773/maintainability)](https://codeclimate.com/github/proxybee/iReporter/maintainability)

# iReporter
iReporter is an Whistleblower project. It is a product which if effectively utilized is anticipated to curb the current  menace and viral spread of corruption in African countries, which has been a huge bane to her growth.


This project is managed by the use of pivortal tracker, you can view iReport project management plan <a href="https://www.pivotaltracker.com/n/projects/2226594">here</a>


The site is very easy to naviagte and update if and when the need arises, below are links to some of our pages in a developemet environment

<br>

### Getting Started
1. Clone the repository:
    ```
    $ git clone https://github.com/proxybee/iReporter.git
    ```


2. Install dependencies:
    ```
    $ npm install
    ```
<br>

### Usage
1. Start src
    ```
    $ npm run start
    ```

2. Navigate to your browser and type in: http://localhost:3020

<br>

### API Endpoints
https://ireporterafrica.herokuapp.com/
    
GET =>		/api/v1/red-flags 				-(get all red flags)
GET =>		/api/v1/red-flags/:id 			-(get a specific redFlag using its id)
POST =>		/api/v1/red-flags 				-(post an id to the database)
PATCH => 	/api/v1/red-flags/:id/location 	-(to edit location, ensure to check the conditions)
PATCH =>	/api/v1/red-flags/:id/comment 	-(edit comment on a post)
DELET =>	/api/v1/red-flags/:id/delete	-(delete a redFlag)

<br>

### External Dependencies/Packages
~ Babel/cli<br>
~ Babel/core<br>
~ Babel/node<br>
~ Babel/preset-env<br>
~ Babel-preset-airbnb<br>
~ Body-parser<br>
~ Express<br>
~ Winston<br>
~ Eslint<br>
~ Eslint-config-airbnb-base<br>
~ Eslint-plugin-import<br>
~ Jasmine<br>
~ Nodemon<br>
~ Supertest

<br>

### Running Tests
Run jasmine for the spec folder through bundle:
    ```npm test
    ```
    
<br>        


