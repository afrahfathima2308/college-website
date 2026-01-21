# MongoDB Setup Guide

## ❌ Current Issue
Backend is crashing because MongoDB is not running locally.

## ✅ Solution Options

### Option 1: Use MongoDB Atlas (FREE Cloud Database) - RECOMMENDED

**Advantages:**
- ✅ No installation needed
- ✅ Free tier available
- ✅ Always accessible
- ✅ Automatic backups
- ✅ Works from anywhere

**Steps:**

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with email or Google

2. **Create Free Cluster**
   - Choose "FREE" tier (M0)
   - Select your region (closest to you)
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Username: `admin`
   - Password: `admin123` (or your choice)
   - User Privileges: "Atlas Admin"
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database" (Clusters)
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/`

6. **Update `.env` File**
   - Open `backend/.env`
   - Replace line 7 with your connection string
   - **IMPORTANT:** Replace `<password>` with your actual password
   - Add database name at the end: `/college_website`
   
   Example:
   ```
   MONGODB_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/college_website
   ```

7. **Restart Backend**
   ```bash
   cd backend
   npm run dev
   ```

---

### Option 2: Install MongoDB Locally

**If you prefer local installation:**

**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Complete" installation
4. Check "Install MongoDB as a Service"
5. After installation, MongoDB starts automatically

**Verify it's running:**
- Open Services (Win + R → type `services.msc`)
- Look for "MongoDB Server"
- Status should be "Running"

**Then restart backend:**
```bash
cd backend
npm run dev
```

---

## 🧪 Test Backend is Working

Once MongoDB is connected, test:

```bash
# Open browser or use curl
http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "...",
  "environment": "development"
}
```

---

## 🆘 Troubleshooting

### Error: "MongooseError: Operation buffering timed out"
- MongoDB not running / Wrong connection string
- Check MONGODB_URI in `.env`

### Error: "Authentication failed"
- Wrong username/password in connection string
- Update password in Atlas connection string

### Error: "IP not whitelisted"
- Add your IP in Atlas Network Access
- Or enable "Allow Access from Anywhere"

---

## ✨ Next Steps After MongoDB is Connected

1. **Create first admin user** (via Postman):
   ```
   POST http://localhost:5000/api/auth/register
   Body: {
     "name": "Admin User",
     "email": "admin@college.edu",
     "password": "admin123",
     "role": "admin"
   }
   ```

2. **Login on frontend**:
   - Open http://localhost:5173
   - Use email: `admin@college.edu`
   - Password: `admin123`

3. **Start building features!** 🚀
