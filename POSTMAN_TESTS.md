# Postman Testing Guide

## Setup

1. Open Postman
2. Create a new Collection called "College Website API"
3. Set base URL as variable: `{{baseUrl}}` = `http://localhost:5000/api`

## Test Sequence

### 1️⃣ Health Check (Public)

**Request:**
```
GET {{baseUrl}}/health
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-16T17:00:00.000Z",
  "environment": "development"
}
```

---

### 2️⃣ Register First Admin (Public - One Time Only)

**Request:**
```
POST {{baseUrl}}/auth/register
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Admin User",
  "email": "admin@college.edu",
  "password": "admin123",
  "role": "admin"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65abc123...",
      "name": "Admin User",
      "email": "admin@college.edu",
      "role": "admin"
    }
  }
}
```

**⚠️ IMPORTANT:**
- Email MUST match `FIRST_ADMIN_EMAIL` in backend `.env`
- This only works if NO admin exists yet
- If admin already exists, you'll get 403 Forbidden

---

### 3️⃣ Login Admin

**Request:**
```
POST {{baseUrl}}/auth/login
Content-Type: application/json
```

**Body:**
```json
{
  "email": "admin@college.edu",
  "password": "admin123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65abc123...",
      "name": "Admin User",
      "email": "admin@college.edu",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**📝 Action Required:**
- Copy the `token` value
- In Postman, set variable: `{{adminToken}}` = `<paste token here>`
- OR use Authorization tab → Type: Bearer Token → Token: `<paste here>`

---

### 4️⃣ Get Current User Info (Protected)

**Request:**
```
GET {{baseUrl}}/auth/me
Authorization: Bearer {{adminToken}}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "65abc123...",
      "name": "Admin User",
      "email": "admin@college.edu",
      "role": "admin",
      "createdAt": "2026-01-16T17:00:00.000Z",
      "updatedAt": "2026-01-16T17:00:00.000Z"
    }
  }
}
```

**Error Cases:**
- **No token:** 401 "Access denied. No token provided."
- **Invalid token:** 401 "Invalid or expired token"

---

### 5️⃣ Register Student (Admin Only)

**Request:**
```
POST {{baseUrl}}/auth/register
Authorization: Bearer {{adminToken}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "John Student",
  "email": "john.student@college.edu",
  "password": "student123",
  "role": "student"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65def456...",
      "name": "John Student",
      "email": "john.student@college.edu",
      "role": "student"
    }
  }
}
```

---

### 6️⃣ Register Faculty (Admin Only)

**Request:**
```
POST {{baseUrl}}/auth/register
Authorization: Bearer {{adminToken}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Dr. Faculty Member",
  "email": "faculty@college.edu",
  "password": "faculty123",
  "role": "faculty"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65ghi789...",
      "name": "Dr. Faculty Member",
      "email": "faculty@college.edu",
      "role": "faculty"
    }
  }
}
```

---

### 7️⃣ Login as Student

**Request:**
```
POST {{baseUrl}}/auth/login
Content-Type: application/json
```

**Body:**
```json
{
  "email": "john.student@college.edu",
  "password": "student123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65def456...",
      "name": "John Student",
      "email": "john.student@college.edu",
      "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**📝 Action:** Save this token as `{{studentToken}}`

---

### 8️⃣ Try Creating Admin as Student (Should Fail)

**Request:**
```
POST {{baseUrl}}/auth/register
Authorization: Bearer {{studentToken}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Fake Admin",
  "email": "fakeadmin@college.edu",
  "password": "fake123",
  "role": "admin"
}
```

**Expected Response (403):**
```json
{
  "success": false,
  "message": "Only admins can create admin accounts"
}
```

---

## Error Testing

### ❌ Invalid Credentials
```
POST {{baseUrl}}/auth/login

{
  "email": "admin@college.edu",
  "password": "wrongpassword"
}
```
**Expected:** 401 "Invalid credentials"

---

### ❌ Missing Fields
```
POST {{baseUrl}}/auth/login

{
  "email": "admin@college.edu"
}
```
**Expected:** 400 "Please provide email and password"

---

### ❌ Duplicate Email
```
POST {{baseUrl}}/auth/register
Authorization: Bearer {{adminToken}}

{
  "name": "Another John",
  "email": "john.student@college.edu",
  "password": "test123"
}
```
**Expected:** 400 "email already exists"

---

### ❌ Invalid Email Format
```
POST {{baseUrl}}/auth/register
Authorization: Bearer {{adminToken}}

{
  "name": "Test User",
  "email": "notanemail",
  "password": "test123"
}
```
**Expected:** 400 Validation error for email

---

## Postman Collection Variables

Set these in your collection:

| Variable | Value |
|----------|-------|
| `baseUrl` | `http://localhost:5000/api` |
| `adminToken` | `<paste admin JWT here>` |
| `studentToken` | `<paste student JWT here>` |
| `facultyToken` | `<paste faculty JWT here>` |

---

## Security Checklist

✅ Admin can only be created with correct `FIRST_ADMIN_EMAIL`  
✅ Passwords are NOT returned in any response  
✅ Invalid tokens return 401  
✅ Non-admin users cannot create admin accounts  
✅ All protected routes require Bearer token  
✅ Tokens expire after 7 days  

---

## Next Steps

After testing authentication, you can build:
- **User Management API** (admin: list, update, delete users)
- **Department API** (CRUD operations)
- **Course API** (enrollment, schedules)
- **Attendance API** (faculty marks, students view)
