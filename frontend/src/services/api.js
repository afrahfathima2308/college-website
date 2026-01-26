import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid - clear local storage and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ======================
// AUTH API CALLS
// ======================

export const authAPI = {
    // Login user
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    // Register user (admin only for admin/faculty creation)
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    // Get current user
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};

// ======================
// BOOKING API CALLS
// ======================

export const bookingAPI = {
    // Create new booking
    createBooking: async (bookingData) => {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    },

    // Get all bookings (filtered by role on backend)
    getAllBookings: async () => {
        const response = await api.get('/bookings');
        return response.data;
    },

    // Get pending bookings (admin only)
    getPendingBookings: async () => {
        const response = await api.get('/bookings/pending');
        return response.data;
    },

    // Get single booking
    getBooking: async (id) => {
        const response = await api.get(`/bookings/${id}`);
        return response.data;
    },

    // Approve booking (admin only)
    approveBooking: async (id) => {
        const response = await api.put(`/bookings/${id}/approve`);
        return response.data;
    },

    // Reject booking (admin only)
    rejectBooking: async (id, reason) => {
        const response = await api.put(`/bookings/${id}/reject`, { reason });
        return response.data;
    },

    // Delete booking
    deleteBooking: async (id) => {
        const response = await api.delete(`/bookings/${id}`);
        return response.data;
    },

    // Check availability
    checkAvailability: async (hallName, date) => {
        const response = await api.get(`/bookings/availability/${hallName}?date=${date}`);
        return response.data;
    }
};

// ======================
// MARKS API CALLS
// ======================

export const marksAPI = {
    // Add mark (Faculty only)
    addMark: async (markData) => {
        const response = await api.post('/marks', markData);
        return response.data;
    },

    // Get students by branch (Faculty only)
    getStudentsByBranch: async (branch) => {
        const response = await api.get(`/marks/branch/${branch}`);
        return response.data;
    },

    // Get marks for a specific student (Faculty only)
    getStudentMarks: async (studentId) => {
        const response = await api.get(`/marks/student/${studentId}`);
        return response.data;
    },

    // Get my marks (Student only)
    getMyMarks: async () => {
        const response = await api.get('/marks/my-marks');
        return response.data;
    }
};

// ======================
// ATTENDANCE API CALLS
// ======================

export const attendanceAPI = {
    // Mark attendance (Faculty only)
    markAttendance: async (attendanceData) => {
        const response = await api.post('/attendance/mark', attendanceData);
        return response.data;
    },

    // Update attendance (Faculty only)
    updateAttendance: async (id, updateData) => {
        const response = await api.put(`/attendance/update/${id}`, updateData);
        return response.data;
    },

    // Get my attendance (Student only)
    getMyAttendance: async () => {
        const response = await api.get('/attendance/my');
        return response.data;
    },

    // Get attendance by branch (Faculty only)
    getAttendanceByBranch: async (branch, date, period) => {
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        if (period) params.append('period', period);
        const response = await api.get(`/attendance/branch/${branch}?${params.toString()}`);
        return response.data;
    }
};

export default api;
