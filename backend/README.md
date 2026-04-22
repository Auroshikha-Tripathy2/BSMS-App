# BSMS Backend

Book Store Management System Backend API

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bsms
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 3. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally if not already installed
# Then run the server
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### 4. Start the Server

**Development (with hot reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register
- **POST** `/api/auth/register`
- Body: `{ name, email, password, role }`
- Response: `{ success, token, user }`

#### Login
- **POST** `/api/auth/login`
- Body: `{ email, password }`
- Response: `{ success, token, user }`

#### Get Current User
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer <token>`
- Response: `{ success, user }`

#### Update Profile
- **PUT** `/api/auth/update`
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, phone, address }`
- Response: `{ success, user }`

#### Logout
- **POST** `/api/auth/logout`
- Headers: `Authorization: Bearer <token>`
- Response: `{ success, message }`

## Project Structure

```
backend/
├── config/          # Database configuration
├── models/          # MongoDB schemas
├── controllers/     # Route controllers
├── routes/          # API routes
├── middleware/      # Custom middleware
├── server.js        # Main server file
├── package.json     # Dependencies
└── .env            # Environment variables (create from .env.example)
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Security middleware

## Next Steps

1. Implement book management routes
2. Add order management endpoints
3. Add inventory management
4. Implement email verification
5. Add admin dashboard endpoints
