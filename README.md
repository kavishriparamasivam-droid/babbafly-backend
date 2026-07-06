# BabbaFly Backend API

A RESTful backend API built with **Node.js**, **Express.js**, and **MongoDB Atlas** for the BabbaFly Internship Project.

## Features

- Create new listings
- View all listings
- MongoDB Atlas integration
- Railway deployment
- REST API architecture
- Input validation
- Environment variable support

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Railway
- Postman
- Git & GitHub

---

##  Project Structure

```
babbafly-backend/
│── models/
│── routes/
│── controllers/
│── middleware/
│── config/
│── server.js
│── package.json
│── .env
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/kavishriparamasivam-droid/babbafly-backend.git
```

Go to the project folder

```bash
cd babbafly-backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run the server

```bash
node server.js
```

or

```bash
npm start
```

---

##  Live API

**Railway Deployment**

https://babbafly-backend-production.up.railway.app

---

##  API Endpoints

### Home

```
GET /
```

Returns

```
BabbaFly Backend Running
```

---

### Get All Listings

```
GET /api/listings
```

Response

```json
[
  {
    "_id": "...",
    "title": "BMW X5",
    "description": "Luxury SUV",
    "category": "Cars",
    "price": 70000,
    "location": "Chennai",
    "images": [
      "https://example.com/car.jpg"
    ],
    "rating": 5
  }
]
```

---

### Create Listing

```
POST /api/listings
```

Example Request

```json
{
  "title": "BMW X5",
  "description": "Luxury SUV",
  "category": "Cars",
  "price": 70000,
  "location": "Chennai",
  "images": [
    "https://example.com/car.jpg"
  ],
  "rating": 5
}
```

---

##  Testing

API endpoints were tested using **Postman**.

---

##  Deployment

Backend deployed using **Railway**

Database hosted on **MongoDB Atlas**

---

##  Demo

Project includes:

- GitHub Repository
- Railway Deployment
- MongoDB Atlas Database
- Postman API Testing

---

##  Author

**Kavishri Paramasivam**

GitHub

https://github.com/kavishriparamasivam-droid

---

## License

This project was developed as part of the **BabbaFly Backend Internship Assignment**.
