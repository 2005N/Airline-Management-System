# Airline Management System

DBMS Project

A simple full-stack flight booking web application built with React, Node.js/Express, and MySQL.

## Project Structure
/client -> React frontend 
/server -> Express backend



---

##  Tech Stack

- **Frontend:** React, Axios, SweetAlert2  
- **Backend:** Node.js, Express  
- **Database:** MySQL  

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/2005N/Airline_Management_System.git
cd Airline_Management_System
```

### 2.  Import the Database
Make sure MySQL is running.

```bash
mysql -u your_username -p < database.sql
```
This will create the database, tables, and seed data.

### 3. Install Backend and Frontend Dependencies
```bash
cd server
npm install
```
```bash
cd client
npm install

```
Start the server and client concurrently by running `npm run dev` in server directory.

### Environment Variables
Create a .env in the server/ directory:
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=airport_ms
```

## Screenshots
