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
git clone https://github.com/2005N/Airline-Management-System.git
cd Airline-Management-System
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
![image](https://github.com/user-attachments/assets/19fc2fae-5b35-492e-a1e7-cf2b07145971)
![image](https://github.com/user-attachments/assets/54875dec-9271-47f8-837a-f9e7b932516d)
![image](https://github.com/user-attachments/assets/83c81a4b-af46-4395-b47f-72ef0d9027ef)
![image](https://github.com/user-attachments/assets/7317981e-26be-423b-a4fc-c53edb149c1d)
![image](https://github.com/user-attachments/assets/13398d91-c53c-4e12-9dfc-8374f060630b)
![image](https://github.com/user-attachments/assets/6fc17675-16eb-435e-b424-0927807bd5c2)
![image](https://github.com/user-attachments/assets/ba07ef71-ad4a-4c4d-9905-18a4a6961c40)
![image](https://github.com/user-attachments/assets/f2abf986-a848-48df-87dd-58119958c7e0)

