# BSMS - Book Store Management System
## Complete Setup Guide

A full-stack bookstore management system with role-based dashboards for readers and shopkeepers.

---

## Project Architecture

```
BSMS/
├── BSMS/              # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/   # API calls
│   │   ├── context/    # Auth Context
│   │   ├── hooks/      # useAuth hook
│   │   └── styles/
│   └── package.json
├── backend/           # Node.js/Express Backend
│   ├── config/        # Database config
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API routes
│   ├── controllers/   # Route logic
│   ├── middleware/    # Auth middleware
│   └── server.js
└── README.md
```

---

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)
- **Git**

---

## 🚀 Quick Start

### 1. Clone/Setup Project

```bash
cd BSMS
```

### 2. Frontend Setup

```bash
cd BSMS
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 3. Backend Setup

```bash
cd ../backend
npm install
cp .env.example .env
```

Edit `.env` with your settings:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bsms
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

---

## 🗄️ Database Setup

### Option A: Local MongoDB

1. **Install MongoDB** from https://www.mongodb.com/try/download/community

2. **Start MongoDB**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Windows
   mongod
   
   # On Linux
   sudo systemctl start mongod
   ```

3. **Verify Connection**
   ```bash
   mongo
   ```

### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bsms?retryWrites=true&w=majority
   ```

---

## 🔐 Authentication Flow

### User Registration
```
Frontend (Register) → Backend (POST /api/auth/register) → MongoDB
                    ↓
              Generate JWT Token
                    ↓
          Store in localStorage
```

### User Login
```
Frontend (Login) → Backend (POST /api/auth/login) → MongoDB
                 ↓
           Verify credentials & Generate JWT
                 ↓
         Return token + user data
                 ↓
      Store in AuthContext + localStorage
```

### Protected Requests
```
Frontend (Protected Route) → Add JWT to Authorization header
                           ↓
                  Backend (POST /api/endpoint)
                           ↓
                 Middleware verifies JWT token
                           ↓
            Execute route logic → Return data
```

---

## 📱 Features by Role

### Reader Dashboard
- ✅ Currently Reading books with progress tracking
- ✅ Recent orders and order history
- ✅ Wishlist management
- ✅ Price alerts for favorite books
- ✅ Personalized recommendations
- ✅ Shopping cart

### Shopkeeper Dashboard
- ✅ Pending orders view
- ✅ Inventory management
- ✅ Stock alerts (low/out of stock)
- ✅ Top selling books
- ✅ Today's performance metrics
- ✅ Action queue/task list

### Common Features
- ✅ User authentication (register/login/logout)
- ✅ Profile management
- ✅ Settings
- ✅ Responsive design

---

## 🔌 API Endpoints

### Authentication Routes

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "reader"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "John Doe", ... }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "John Doe", ... }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer eyJhbGc...

Response:
{
  "success": true,
  "user": { "id": "...", "name": "John Doe", ... }
}
```

#### Update Profile
```http
PUT /api/auth/update
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "1234567890",
  "address": "123 Main St"
}

Response:
{
  "success": true,
  "user": { ... }
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer eyJhbGc...

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🧪 Testing the Application

### Test Account (For Manual Testing)

Reader Account:
```
Email: reader@test.com
Password: password123
Role: Reader
```

Shopkeeper Account:
```
Email: owner@test.com
Password: password123
Role: Owner
```

### Test Flow

1. **Open Frontend**: `http://localhost:5173`
2. **Click Login** on Navbar
3. **Register** with test credentials or use existing account
4. **Select Role** (Reader or Shopkeeper)
5. **Get Redirected** to appropriate dashboard
6. **Explore Features** based on your role

---

## 🛠️ Development Workflow

### Making API Calls from Frontend

```javascript
import { authAPI } from "../services/api";

// Login
const result = await authAPI.login(email, password);

// Register
const result = await authAPI.register(name, email, password, role);

// Get current user
const response = await authAPI.getMe(token);

// Update profile
const response = await authAPI.updateProfile(token, updateData);
```

### Using Auth Context

```javascript
import { useAuth } from "../hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

---

## 📦 Dependencies

### Frontend
- React 18.3
- React Router 7.1
- Bootstrap 5.3
- Lucide React Icons
- Vite

### Backend
- Express.js 4.18
- MongoDB/Mongoose 8.0
- JWT for authentication
- bcryptjs for password hashing
- CORS middleware
- Helmet for security

---

## ⚠️ Important Notes

1. **JWT Secret**: Change the `JWT_SECRET` in production
2. **CORS**: Update `FRONTEND_URL` in backend `.env` for production
3. **Environment Variables**: Never commit `.env` file
4. **Database**: Use MongoDB Atlas for production instead of local
5. **HTTPS**: Use HTTPS in production
6. **Rate Limiting**: Implement in production

---

## 📚 Next Steps

### To Add
- [ ] Book management routes (CRUD)
- [ ] Order management system
- [ ] Payment integration
- [ ] Email verification
- [ ] Password reset
- [ ] Admin dashboard
- [ ] Search & filtering
- [ ] Reviews & ratings
- [ ] Notifications
- [ ] Analytics

### Best Practices
- [ ] Add input validation
- [ ] Add error handling
- [ ] Add logging
- [ ] Add unit tests
- [ ] Add API documentation (Swagger)
- [ ] Setup CI/CD pipeline
- [ ] Setup monitoring

---

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Check if backend is running on `http://localhost:5000`
- Check CORS settings in `backend/.env`
- Check browser console for error messages

### MongoDB connection fails
- Verify MongoDB is running
- Check connection string in `.env`
- Check firewall settings for port 27017

### Login fails
- Verify backend is running
- Check user exists in database
- Check password is correct
- Check JWT_SECRET is set

### Token expired
- Clear localStorage and log in again
- Update JWT_EXPIRE in `.env`

---

## 📞 Support

For issues or questions, check:
- Backend README: `backend/README.md`
- Frontend logs in browser console
- Backend logs in terminal
- MongoDB logs

---

## 📄 License

ISC

---

**Happy Building! 🚀**
