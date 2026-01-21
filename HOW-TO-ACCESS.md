# 🌐 How to Access the Classroom Booking System

## 📍 Where to View the Website

### **Main Website URL:**
```
http://localhost:5173
```

This is your main college website with the booking system!

---

## 🚀 Step-by-Step Guide

### **Step 1: Make Sure Servers Are Running**

If servers are NOT running, use one of these methods:

#### **Option A: Use the Batch File (Easiest)**
1. Go to: `C:\Users\Administrator\Downloads\college website`
2. Double-click: `START-WEBSITE.bat`
3. Wait 30-60 seconds for servers to start
4. Two terminal windows will open - **keep them open!**

#### **Option B: Start Manually**
1. **Terminal 1 - Backend:**
   ```powershell
   cd "C:\Users\Administrator\Downloads\college website\college website\backend"
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```powershell
   cd "C:\Users\Administrator\Downloads\college website\college website\frontend"
   npm run dev
   ```

---

### **Step 2: Open the Website**

1. **Open your web browser** (Chrome, Firefox, Edge, etc.)

2. **Type in the address bar:**
   ```
   http://localhost:5173
   ```

3. **Press Enter**

You should see the **College Website Homepage**!

---

### **Step 3: Navigate to Booking System**

#### **Method 1: Login First (Recommended)**
1. Click **"Login"** button (top right corner)
2. Use demo credentials:
   - **Student:** `student@srit.ac.in` / `srit1234`
   - **Faculty:** `faculty@srit.ac.in` / `srit1234`
   - **Admin:** `admin@srit.ac.in` / `srit1234`
3. After login, you'll be redirected to the **Dashboard**
4. The Dashboard shows the **"Hall & Classroom Booking System"**

#### **Method 2: Direct Access (After Login)**
- Once logged in, go to: `http://localhost:5173/dashboard`
- Or click **"Dashboard"** in the navbar

---

## 📋 What You'll See

### **For Students & Faculty:**
- ✅ Title: **"Hall & Classroom Booking System"**
- ✅ **"+ New Booking"** button
- ✅ **"My Bookings"** section showing your bookings
- ✅ Form to book venues including:
  - Seminar Halls
  - Classrooms (101-403)
  - Computer Labs (1-3)

### **For Admin:**
- ✅ Title: **"Hall & Classroom Booking System"**
- ✅ **"Pending Approvals"** section (if any pending bookings)
- ✅ **"All Bookings"** section
- ✅ **Approve** and **Reject** buttons for each pending booking

---

## 🎯 Quick Test

### **Test as Student:**
1. Login as: `student@srit.ac.in` / `srit1234`
2. Click **"+ New Booking"**
3. Select a **Classroom** (e.g., "Classroom 101")
4. Fill in details and submit
5. See your booking in "My Bookings" with status "PENDING"

### **Test as Admin:**
1. Login as: `admin@srit.ac.in` / `srit1234`
2. See the booking you just created in **"Pending Approvals"**
3. Click **"Approve"** or **"Reject"** button
4. See the status change

---

## 🖼️ Visual Locations

```
Website Structure:
┌─────────────────────────────────────┐
│  Navbar: [Logo] [Home] [About]...  │
│                    [Login Button]   │
├─────────────────────────────────────┤
│                                     │
│   📄 Homepage Content               │
│                                     │
│   → Click "Login" to access         │
│     booking system                  │
│                                     │
└─────────────────────────────────────┘

After Login:
┌─────────────────────────────────────┐
│  Dashboard Header                   │
│  [Logo] [Home] [User Info] [Logout] │
├─────────────────────────────────────┤
│                                     │
│   🎯 Hall & Classroom Booking       │
│      System                         │
│                                     │
│   [+ New Booking] Button            │
│                                     │
│   📋 Pending Approvals (Admin)      │
│   📋 My Bookings / All Bookings     │
│                                     │
└─────────────────────────────────────┘
```

---

## ⚠️ Troubleshooting

### **"Cannot connect" or "Site can't be reached"**
- **Check if servers are running:** Look for terminal windows with `npm run dev`
- **Wait longer:** Servers take 30-60 seconds to fully start
- **Check ports:** Backend should be on 5000, Frontend on 5173

### **Page is blank or showing errors**
- **Clear browser cache:** Press `Ctrl + Shift + Delete`
- **Hard refresh:** Press `Ctrl + F5`
- **Check browser console:** Press `F12` to see errors

### **Login not working**
- **Verify credentials:** Use exact email and password (case-sensitive)
- **Check backend:** Backend must be running on port 5000
- **Check MongoDB:** MongoDB service must be running

---

## 📞 Quick Reference

| Item | Location |
|------|----------|
| **Website URL** | http://localhost:5173 |
| **Backend API** | http://localhost:5000/api |
| **Health Check** | http://localhost:5000/api/health |
| **Login Page** | http://localhost:5173/login |
| **Dashboard** | http://localhost:5173/dashboard (after login) |

---

**That's it! Open `http://localhost:5173` in your browser to get started! 🚀**
