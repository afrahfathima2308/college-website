import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                try {
                    // Verify token is still valid
                    const response = await authAPI.getMe();
                    setUser(response.data.user);
                } catch (error) {
                    // Token invalid - clear storage
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await authAPI.login(email, password);
            // Backend returns: { success: true, message: '...', data: { user, token } }
            // authAPI.login returns response.data which is the entire backend response
            const user = response.data?.user || response.user;
            const token = response.data?.token || response.token;

            if (!user || !token) {
                throw new Error('Invalid response from server');
            }

            // Save to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setUser(user);
            return { success: true, user };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Login failed'
            };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    // Register function (for admin creating users)
    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isFaculty: user?.role === 'faculty',
        isStudent: user?.role === 'student'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
