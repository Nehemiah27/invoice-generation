<h1 align="center" id="title">Invoice Generation Backend</h1>

<p id="description">Invoice Generation is a full-stack web application using the following tech (MongoDB, Express.js, Node.js) stack. The objective is to create a user-friendly Invoice Generator application that enables users to create, and download invoices in PDF and Image format.</p>

<h2>🚀 Demo</h2>

**Important Links**:

- For Postman Collection API documentation

[https://documenter.getpostman.com/view/38172940/2sAXjRVV66](https://documenter.getpostman.com/view/38172940/2sAXjRVV66)

- For Checking API Endpoints

[https://www.postman.com/seerapunehemiah/my-workspace/request/12xtsun/new-user-creation-request?tab=body](https://www.postman.com/seerapunehemiah/my-workspace/request/12xtsun/new-user-creation-request?tab=body)

- For Swagger API Docs Summary & API Hits

[https://raven.e2eresearch.com/invoice/api-docs/](https://raven.e2eresearch.com/invoice/api-docs/)

**Walkthrough Info**:

- The first link provided above can be used for the complete detailed explanation of the Project including the functional management of the backend.
- The second link provided can show the Flow of the API ranging from User creation, Login & to Invoice Management(token is included wherever required, you can change it, if required).
- The third link is provided for the API docs summary for some dry runs.

<h2>🧐 Features</h2>

Here're some of the project's best features:

- **Create Users**: Users can be created with Email as unique value.
- **Login & JWT Auth**: JSON web token is used for securing the required & expiration of Token is added as this is a demo project.
- **State Management**: Users can create and download Invoices with the state of the Invoice variables captured.
- **Joi Validation**: Every payload is validated with "Joi" library.
- **Advanced Alogrithms**: An algorithm identifies and returns the respones optiming the process for the User when he creates an Invoice.
- **Advanced Quering**: Implemented a efficient mechanism to improve the performance of Large data sets of Invoice stored with the option to sort on creation date to make recents appear first.
- **User Management**: Users can be created with password setting & Payload validation.
- **Containerization**: The application is containerized and deployed via Docker.
- **JWT Authentication**: JWT Authentication with verification of tokens are implemented.

<br />
<br />
<h2>🛠️ Installation Steps:</h2>
<br />
<p>1. Node.js (v18+)</p>

```
npm run start:dev //(if nodemon is available with you then use "npm run start:dev-nodemon")
```

<p>2. MongoDB</p>

<p>3. A VPS or server with HTTPS enabled for backend deployment</p>

  <br />
<br />
<h2>💻 Built with</h2>

Technologies used in the project:

- Stack:- Node.js Express.js & Mongoose/MongoDB
- Database:- MongoDB
- Authentication:- JSON Web Tokens (JWT)
- Deployment:- VPS/Server with HTTPS (Backend MongoDB & Redis via Docker Containerizations)

<br />
<br />

<h2>Libraries Used</h2>

Libraries used in the project:

- bcrypt:- For hashing the User password and comparing user login password with Salt rounds of 10.
- cors:- For Cross Site enablements.
- dotenv:- For Enviroment variable captures.
- joi:- For Payload validation and enabling strict maintanenace of Error handling at Payload level.
- jsonwebtoken:- For JWT Authentication and request security.
- puppeteer:- For PDF & Image generation of Invoice.
- swagger-jsdoc:- For API documentation summary with Project Integration & dry runs.
- swagger-ui-express:- For web UI of the API documentation summary with Project Integration & dry runs.
- nodemon:- For development ease to make the code changes run without restarting the backend.

<br />
<br />

## API Endpoints

The API wise break up has been provided with Swagger API documentation in the link of https://raven.e2eresearch.com/invoice/api-docs/

<br />
<br />

## Advanced JWT Integration for Enhanced Performance and Security

<br />

## Overview

In this application, JWT is strategically integrated to optimize both security and performance. By leveraging JWT Auth Strategy structure capabilities, the application efficiently manages user authentication and secures the User Data. This approach not only enhances user experience by reducing latency but also ensures robust Application management.
<br />

## JWT Use Cases

<br />

### Token Management and Session Security

**Purpose**: To enhance security and manage user sessions effectively.

**Mechanism**:

- **Token Generation**: Upon user authentication, a unique token is generated.
- **Session Authorization**: Alongside the token, The user requests of the session are authorized with Tokens.
- **Request Validation**: For every incoming request, the application checks the Token. If the Token is faulty, then the user will be logged out forcefully.
- **Continuous Integration Update**: With each valid request & verification ensuring active sessions remain valid.
  <br />

**Benefits**:

- **Enhanced Security**: Automatically verifies users & reducing the risk of unauthorized access.
- **Efficient Resource Utilization**: Tokens are for active sessions, reducing unauthorized usage.
- **Load Balancing**: The combined use of JWT auth and MongoDB ensures that both database & Node JS share the load & verifications, preventing any single point from becoming a bottleneck.

<br />
<br />
<br />

## Identifying Recently Added Invoices

<br />
<b>Objective</b>: To provide Quotation list of the most recent Invoice along with all the invoices generated by the User, an endpoint was created to access the list of Invoices with the option to download them in PDF & PNG formats. This was accomplished using an efficient aggregation algorithm designed to handle large datasets.

<br />
<br />

**Implementation**:

To achieve this, we utilized MongoDB's powerful aggregation framework. The key steps involved in the aggregation pipeline are:

**Matching**:

- The User data can be searched and matched with the UserID(an unique ID of the User generated using "uuid" library).

<br />

**Sorting**:

The results from the matching stage are then sorted in descending order of creation date resulting to appear the recent invoices on the top of the list based on the time stamps, ensuring that the most recent Invoices appear first.
<br />

**Benefits**:

- **Efficient Data Processing**: This aggregation method is designed to efficiently process large datasets, making it scalable as the volume of map data increases.

## Repo Cloning & Production Access

- **Cloning**: To Clone the repo, hit the URL in bash with command as git clone https://github.com/Nehemiah27/invoice-generation.git
- **Production**: To Access production Database, hit the URL "mongodb://invoice_generation_db_owner:i5u3h1PHb61@92.205.63.217:40003/invoice_generation" in the Mongoose Compass
