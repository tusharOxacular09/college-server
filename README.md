# College Management System API

## Overview

This is a backend application built using **NestJS** and **PostgreSQL** to manage and query college-related data. The API allows managing college information, placements, courses, and provides various filters for querying colleges by city and state. It also includes JWT-based authentication for secure access.

### Tools and Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeScript**: A strongly typed programming language built on JavaScript.
- **PostgreSQL**: A relational database management system used to store the data.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **Render**: Cloud platform used for deploying the application.
- **Swagger**: For API documentation and testing.

## Deployment

This project is hosted on **Render**.

- **API base URL**: [https://oxacular-college-server.onrender.com/api](https://oxacular-college-server.onrender.com/api)
- **Swagger Documentation URL**: [https://oxacular-college-server.onrender.com/documentation](https://oxacular-college-server.onrender.com/documentation)

## Installation Instructions

1. Clone the repository:
   git clone git@github.com:tusharOxacular09/college-server.git
   cd college-server

2. Install dependencies:
   npm install

3. Create a .env file and add the following environment variables:
   PORT=3000
   MODE=DEV
   JWT_SECRET_KEY=your_jwt_secret_key
   POSTGRES_HOST=your_postgres_host
   POSTGRES_PORT=5432
   POSTGRES_USER=your_postgres_user
   POSTGRES_PASSWORD=your_postgres_password
   POSTGRES_DATABASE=your_postgres_database
   RUN_MIGRATIONS=true

4. Run the application in development mode:
   npm run start:dev

- The server should now be running at http://localhost:3000.

# API Endpoints

## Health Check

- **GET** `/api`
  - Description: Verifies if the server is running.

---

## Authentication

### Signup

- **POST** `/api/auth/signup`
  - Description: Registers a new user.

### Login

- **POST** `/api/auth/login`
  - Description: Logs in an existing user and returns a JWT token.

---

## College Data

### Average Placement Data

- **GET** `/api/college_data/{college_id}/avg_section`
  - Description: Returns the average of all placement fields (highest_placement, average_placement, median_placement, placement_rate) grouped by year.

### Full Placement Data

- **GET** `/api/college_data/{college_id}/placement_section`
  - Description: Returns all placement data for a specific college.

---

## College Filters

### Filter Colleges by City or State

- **GET** `/api/colleges`
  - Description: Filters colleges by city or state.

---

## College Courses

### Get College Courses Data

- **GET** `/api/college_courses/{college_id}`
  - Description: Returns all courses for a specific college, sorted by course fee in descending order.

Conclusion
This project demonstrates how to build a backend API with NestJS, PostgreSQL, and JWT authentication. The application is designed to handle large datasets efficiently, and it provides various filters and calculations for college-related data. The deployment and API documentation are hosted on Render for easy access.

License
This project is licensed under the MIT License - see the LICENSE file for details.

vbnet
Copy code

This `README.md` covers everything from setup instructions to API routes and deployment information. You can copy and paste it directly into your project. Let me know if you need any adjustments!
