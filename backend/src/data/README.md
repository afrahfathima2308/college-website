# College Website - Full Stack Foundation

A modern, secure full-stack college website built with **React**, **Node.js/Express**, and **MongoDB**.

## 🏗️ Project Structure

```
college-website/
├── backend/                 # Node.js + Express Backend
│   ├── src/
│   │   ├── config/         # Configuration files (env, database)
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware (auth, error handler)
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions (JWT)
│   ├── .env                # Environment variables
│   ├── .env.example        # Environment template
│   ├── server.js           # Express server entry point
│   └── package.json
│
└── frontend/               # React Frontend
    ├── src/
    │   ├── components/     # Reusable components (ProtectedRoute)
    │   ├── contexts/       # React contexts (AuthContext)
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── App.jsx         # Main App component
    │   └── index.css       # Tailwind CSS styles
    ├── .env                # Frontend environment variables
    └── package.json
```

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcrypt
- **Security:** CORS enabled, centralized error handling

### Frontend
- **Framework:** React 18 (via Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios with interceptors
- **State Management:** React Context API

### Why Vite over Next.js?
✅ **Faster Development:** Vite's HMR is instant, making development much faster  
✅ **Simpler Setup:** Perfect for college websites that don't need SSR  
✅ **Smaller Bundle:** Lightweight and optimized for client-side apps  
✅ **Better for Learning:** Easier to understand and debug for students  

*Note: Use Next.js only if you need SEO-heavy pages or server-side rendering*

## 🔐 Security Features

### Admin Account Creation
- **First Admin:** Can only be created if email matches `FIRST_ADMIN_EMAIL` in `.env`
- **Subsequent Admins:** Can only be created by existing admin users
- **Public Registration:** Only allows student/faculty roles (not admin)

### Authentication Flow
1. Passwords hashed with bcrypt (salt rounds: 10)
2. JWT tokens with 7-day expiration
3. Token stored in localStorage
4. Auto-included in API requests via Axios interceptors
5. Auto-logout on token expiration (401 errors)

### Role-Based Access Control
- **Student:** Basic access
- **Faculty:** Enhanced access
- **Admin:** Full access (protected routes)

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB installed and running locally (or MongoDB Atlas connection string)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example` and update values):
```bash
# Already created, but verify these values:
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/college_website
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
FIRST_ADMIN_EMAIL=admin@college.edu
FRONTEND_URL=http://localhost:5173
```

4. Start MongoDB (if running locally):
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

5. Start backend server:
```bash
npm run dev
```

Backend should now be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Verify `.env` file exists with:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start frontend dev server:
```bash
npm run dev
```

Frontend should now be running on `http://localhost:5173`

## 🧪 Testing with Postman

### 1. Health Check
```
GET http://localhost:5000/api/health
```
Expected: `{ "success": true, "message": "Server is running" }`

### 2. Register First Admin
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@college.edu",
  "password": "admin123",
  "role": "admin"
}
```
**Important:** Email MUST match `FIRST_ADMIN_EMAIL` in `.env`

### 3. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@college.edu",
  "password": "admin123"
}
```
Response includes `token` - **COPY THIS TOKEN**

### 4. Get Current User (Protected Route)
```
GET http://localhost:5000/api/auth/me
Authorization: Bearer <YOUR_TOKEN_HERE>
```

### 5. Register Student/Faculty (as Admin)
```
POST http://localhost:5000/api/auth/register
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{
  "name": "Student Name",
  "email": "student@college.edu",
  "password": "student123",
  "role": "student"
}
```

## 📁 Key Files Explained

### Backend

**`server.js`**
- Express server initialization
- Middleware setup (CORS, JSON parser)
- Route mounting
- Centralized error handling

**`src/models/User.js`**
- Mongoose schema with validations
- Password hashing pre-save hook
- Password comparison method
- Role-based enum (admin, faculty, student)

**`src/middleware/auth.js`**
- `verifyToken`: Checks JWT validity, attaches user to request
- `isAdmin`: Ensures user has admin role

**`src/controllers/authController.js`**
- `login`: Authenticates user, returns JWT
- `register`: Creates new user (with admin protection logic)
- `getMe`: Returns current user info

**`src/middleware/errorHandler.js`**
- Catches all errors (Mongoose, JWT, validation)
- Returns consistent error responses
- Shows stack trace only in development

### Frontend

**`src/services/api.js`**
- Axios instance with base URL
- Request interceptor: Auto-adds JWT token
- Response interceptor: Handles 401 errors

**`src/contexts/AuthContext.jsx`**
- Auth state management
- Login/logout functions
- Token persistence
- Role checking helpers

**`src/components/ProtectedRoute.jsx`**
- Wrapper for protected pages
- Redirects to login if not authenticated
- Supports role-based access control

**`src/pages/LoginPage.jsx`**
- Login form with validation
- Error handling
- Role-based navigation after login

## 🎯 Next Steps

This foundation provides:
✅ Secure authentication system  
✅ Role-based access control  
✅ Protected API routes  
✅ React routing with protected pages  
✅ Tailwind CSS styling foundation  

### Recommended Next Features:
1. **College Pages:** Home, About, Departments, Faculty
2. **Student Portal:** Course enrollment, grades, attendance
3. **Admin Dashboard:** User management, analytics
4. **Faculty Portal:** Course management, student grading
5. **File Uploads:** Profile pictures, documents (using multer)
6. **Email Notifications:** Using nodemailer
7. **Search & Pagination:** For large datasets

## 🔧 Troubleshooting

**MongoDB connection failed:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, ensure IP is whitelisted

**CORS errors:**
- Verify `FRONTEND_URL` in backend `.env`
- Check that frontend is running on port 5173

**JWT errors:**
- Delete token from localStorage and login again
- Ensure `JWT_SECRET` is set in `.env`

**Build errors:**
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📝 License

ISC

## 👨‍💻 Development

Built by a senior full-stack developer as a foundation for college website projects.
