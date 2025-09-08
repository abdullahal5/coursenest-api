# 📚 Course Management API

The Course Management API is a backend application built with Node.js, Express.js, and MongoDB. It allows users to browse, purchase, and manage online courses, while providing secure authentication and role-based access control. This project follows the MVC architecture and includes proper input validation, error handling, and JWT-based authentication.

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/abdullahal5/coursenest-api.git
cd coursenest-api
npm install
# or
yarn install
```

---

## ✨ Features

- 🔐 JWT Authentication with role-based access (user & admin)
- 🧑‍🏫 Admin Course Management: create, update, and delete courses
- 📚 User Course Access: browse all courses and get course details by ID
- 💳 Purchase System: users can purchase courses and track their purchases
- 🛡️ Secure Passwords with bcrypt hashing
- ✅ Input Validation using Zod for all requests
- ⚡ Centralized Error Handling for consistent API responses
- 🗂️ MVC Architecture for maintainable and modular code
- 📦 Tech Stack: Node.js, Express.js, MongoDB, Mongoose, TypeScript

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **ORM/ODM:** Mongoose
- **Database:** MongoDB
- **Authentication** JWT (jsonwebtoken), bcrypt
- **Validation:** Zod
- **Middleware:** CORS, cookie-parser
- **Development Tools:** TypeScript, ts-node-dev, ESLint, Prettier

---

## 🔑 Environment Variables

Create a `.env` file in the root of the project and add the following variables (use your own secure values instead of these demo placeholders):

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://fahim:fahim@cluster0.zelnjpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

BCRYPT_SALT_ROUNDS=12

JWT_ACCESS_SECRET = 091b2c529dec033b5ff4531e622ea3f93170e045222963319662b7e4a34f0cdd
JWT_ACCESS_EXPIRES_IN=10d
JWT_REFRESH_SECRET = 41b991b21dc0a439cb45fed544992ba3fafa3f912d3c4dedebec3592d7d552fb74a86a4d69ea560bcf7bf988d173ddecaffa9815dd5a6661bcacd58c0cdb2dc5
JWT_REFRESH_EXPIRES_IN=365d

SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_AUTH_EMAIL="abdullahalfahin183@gmail.com"
SMTP_AUTH_PASSWORD="njvx iwhw wdnm mxqo"

# super admin credentials
ADMIN_EMAIL="admin@admin.com"
ADMIN_PASSWORD="Admin_1234"

# Frontend Links
CLIENT_URL="http://localhost:5173"
```

---

## 📚 API Endpoints

**Base URL:** `http://localhost:5000/api/v1`

> ⚠️ **Note:** After logging in, you will receive an `accessToken` in the response.  
> Use this token in the `Authorization` header (`Bearer <accessToken>`) for all protected routes.

---

### **Auth Routes**

#### 1. Login User

`POST /auth/login`  
Authenticate a user and receive access & refresh tokens.

**Request Body:**

```json
{
  "email": "johndoe@gmail.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "role": "admin"
  }
}
```

#### 2. Logout User

`POST /auth/logout`  
Logs out the user and invalidates the refresh token.

**Request Header:**

```http
Authorization: Bearer accessToken
```

**Response:**

```json
{
  "success": true,
  "message": "User logged out successfully",
  "data": null
}
```

### **Course Routes**

_Admin-only routes require Authorization header with an admin access token._

---

#### 1. Get All Courses

`GET /course/`  
Fetch all available courses.

**Request Header:**

```http
Authorization: Bearer accessToken
```

**Response:**

```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": [
    {
      "_id": "64fa0b2f5e3b2c1a2c9d1f0a",
      "title": "Mastering Node.js",
      "description": "Learn Node.js from scratch...",
      "price": 49.99,
      "instructor": "John Doe",
      "createdAt": "2025-09-08T12:34:56.789Z"
    }
  ]
}
```

#### 2. Get Course By ID

`GET /course/:id`  
Fetch a single course by its ID.

**Request Header:**

```http
Authorization: Bearer accessToken
```

**Response:**

```json
{
  "success": true,
  "message": "Course retrieved successfully",
  "data": {
    "_id": "64fa0b2f5e3b2c1a2c9d1f0a",
    "title": "Mastering Node.js",
    "description": "Learn Node.js from scratch...",
    "price": 49.99,
    "instructor": "John Doe",
    "createdAt": "2025-09-08T12:34:56.789Z"
  }
}
```

#### 3. Create Course (Admin Only)

`POST /course`  
Create a new course.

**Request Header:**

```http
Authorization: Bearer accessToken
```

**Request Body:**

```json
{
  "title": "React for Beginners",
  "description": "Learn React from scratch with hands-on examples.",
  "price": 39.99,
  "instructor": "Jane Doe"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Course retrieved successfully",
  "data": {
    "_id": "64fa0b2f5e3b2c1a2c9d1f0a",
    "title": "Mastering Node.js",
    "description": "Learn Node.js from scratch...",
    "price": 49.99,
    "instructor": "John Doe",
    "createdAt": "2025-09-08T12:34:56.789Z"
  }
}
```

#### 4. Update Course (Admin Only)

`PATCH /course/:id`
Update a course by ID.

**Request Header:**

```http
Authorization: Bearer accessToken
```

**Request Body `(all fields optional)`**:

```json
{
  "price": 44.99,
  "description": "Updated course description."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "_id": "64fa0b2f5e3b2c1a2c9d1f0b",
    "title": "React for Beginners",
    "description": "Updated course description.",
    "price": 44.99,
    "instructor": "Jane Doe",
    "updatedAt": "2025-09-08T13:30:00.000Z"
  }
}
```

#### 1. Delete Course (Admin Only)

`DELETE /course/:id`
Delete a course by ID.

**Request Header:**

```http
Authorization: Bearer accessToken
```

**Response:**

```json
{
  "success": true,
  "message": "Course deleted successfully",
  "data": null
}
```
