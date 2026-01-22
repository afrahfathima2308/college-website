import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
    const [userType, setUserType] = useState('student'); // 'student', 'faculty', 'admin'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        branch: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [backendStatus, setBackendStatus] = useState({ online: false, checking: true, error: null });

    const { login, register } = useAuth();
    const navigate = useNavigate();

    // Check backend health on mount and every 5 seconds
    const checkStatus = async () => {
        setBackendStatus(prev => ({ ...prev, checking: true }));
        try {
            const apiBase = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';
            console.log('Checking health at:', `${apiBase}/health`);

            const res = await fetch(`${apiBase}/health`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                mode: 'cors',
                cache: 'no-cache'
            });

            if (res.ok) {
                setBackendStatus({ online: true, checking: false, error: null });
            } else {
                setBackendStatus({ online: false, checking: false, error: `Server returned ${res.status} ${res.statusText}` });
            }
        } catch (err) {
            console.error('Health Check Failed:', err);
            let msg = err.message;
            if (msg === 'Failed to fetch') {
                msg = 'Connection Refused (Is the backend running?)';
            }
            setBackendStatus({ online: false, checking: false, error: msg });
        }
    };

    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    // Handle role button click - sets user type and shows form
    const handleRoleSelection = (role) => {
        setUserType(role);
        setError('');
        setSuccess('');
        setActiveTab('login');

        // Set placeholder email based on role
        const emailPlaceholders = {
            student: 'student@srit.ac.in',
            faculty: 'faculty@srit.ac.in',
            admin: 'admin@srit.ac.in'
        };

        // Optionally set placeholder (but user must still enter credentials)
        // Email and password will be cleared so user must enter them
        setEmail('');
        setPassword('');
    };

    // Manual login handler
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!email.trim() || !password) {
            setError('Please enter both email and password.');
            setLoading(false);
            return;
        }

        try {
            console.log('Attempting login to:', import.meta.env.VITE_API_URL);
            const result = await login(email, password);
            if (result.success) {
                setSuccess('Login successful! Redirecting to dashboard...');
                const redirectPath = result.user?.role === 'admin' ? '/admin' : '/dashboard';
                setTimeout(() => {
                    navigate(redirectPath);
                }, 1000);
            } else {
                setError(result.message || 'Login failed. Please try again.');
                console.error('Login Result Error:', result);
            }
        } catch (err) {
            console.error('Detailed Login Error:', {
                message: err.message,
                code: err.code,
                config: err.config,
                response: err.response?.data
            });
            setError(`Connection Error: ${err.message}. Please ensure the backend server is running at ${import.meta.env.VITE_API_URL}`);
        } finally {
            setLoading(false);
        }
    };

    // Registration handler
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Validation
        if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        if (registerData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        try {
            const result = await register({
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
                role: registerData.role,
                branch: registerData.role === 'student' ? registerData.branch : undefined
            });

            if (result.success) {
                setSuccess('Registration successful! Please login with your credentials.');
                setTimeout(() => {
                    setActiveTab('login');
                    setEmail(registerData.email);
                    setRegisterData({ name: '', email: '', password: '', confirmPassword: '', role: 'student' });
                }, 2000);
            } else {
                setError(result.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 opacity-10 animate-pulse">
                    <div className="w-32 h-32 bg-orange-400 rounded-full flex items-center justify-center text-6xl">🎓</div>
                </div>
                <div className="absolute bottom-20 right-10 opacity-10 animate-pulse delay-200">
                    <div className="w-40 h-40 bg-orange-500 rounded-full flex items-center justify-center text-7xl">📚</div>
                </div>
            </div>

            {/* Back to Home Button */}
            <Link
                to="/"
                className="absolute top-4 left-4 z-10 flex items-center space-x-2 text-black hover:text-orange-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back to Home</span>
            </Link>

            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden relative z-10">
                <div className="grid md:grid-cols-2">
                    {/* Left Side - Branding */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-8 md:p-12 text-white relative overflow-hidden hidden md:flex flex-col justify-center items-center">
                        <div className="relative z-10 text-center space-y-6">
                            <div className="flex justify-center space-x-4 mb-8">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-6xl">🎓</div>
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-6xl">👨‍🎓</div>
                            </div>
                            <h2 className="text-4xl font-bold mb-4">College Portal</h2>
                            <p className="text-orange-100 text-lg mb-6">Book Halls & Classrooms</p>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">🎯</div>
                                    <div>
                                        <h3 className="font-semibold">Book Facilities</h3>
                                        <p className="text-sm text-orange-100">Reserve halls, classrooms & labs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login/Register Form */}
                    <div className="p-8 md:p-12 bg-white">
                        {/* Tab Switcher */}
                        <div className="flex space-x-4 mb-8 border-b">
                            <button
                                onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }}
                                className={`pb-3 px-4 font-semibold transition-colors ${activeTab === 'login'
                                    ? 'text-orange-600 border-b-2 border-orange-600'
                                    : 'text-gray-500 hover:text-orange-600'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { setActiveTab('register'); setError(''); setSuccess(''); }}
                                className={`pb-3 px-4 font-semibold transition-colors ${activeTab === 'register'
                                    ? 'text-orange-600 border-b-2 border-orange-600'
                                    : 'text-gray-500 hover:text-orange-600'
                                    }`}
                            >
                                Register
                            </button>
                        </div>

                        {/* Messages */}
                        {error && (
                            <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">{success}</span>
                            </div>
                        )}

                        {/* LOGIN TAB */}
                        {activeTab === 'login' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-3xl font-bold text-black">Login to Portal</h1>

                                    {/* Backend Status Indicator */}
                                    <div className="flex flex-col items-end space-y-2">
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1.5 ${backendStatus.checking ? 'bg-gray-100 text-gray-500' :
                                            backendStatus.online ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            <div className={`w-2 h-2 rounded-full ${backendStatus.checking ? 'bg-gray-400 animate-pulse' :
                                                backendStatus.online ? 'bg-green-500' : 'bg-red-500'
                                                }`} />
                                            <span>
                                                {backendStatus.checking ? 'Checking Connection...' :
                                                    backendStatus.online ? 'Backend: Online' : 'Backend: Offline'}
                                            </span>
                                        </div>
                                        {!backendStatus.online && !backendStatus.checking && (
                                            <button
                                                onClick={checkStatus}
                                                className="text-[10px] text-blue-600 hover:underline flex items-center space-x-1"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                <span>Retry Connection</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Connection Error Details */}
                                {!backendStatus.online && !backendStatus.checking && (
                                    <div className="mb-4 p-2 bg-red-50 text-red-600 text-xs border border-red-200 rounded">
                                        <p><strong>Connection Issue:</strong> {backendStatus.error}</p>
                                        <p className="mt-1">Please ensure your backend is running at {import.meta.env.VITE_API_URL}</p>
                                    </div>
                                )}

                                {/* Role Selection Buttons */}
                                <div className="mb-6">
                                    <p className="text-sm text-gray-600 mb-3">Select your role to login:</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button
                                            onClick={() => handleRoleSelection('student')}
                                            className={`py-3 rounded-lg font-semibold transition-colors flex flex-col items-center justify-center space-y-1 ${userType === 'student'
                                                ? 'bg-orange-600 text-white ring-2 ring-orange-300'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <span className="text-2xl">👨‍🎓</span>
                                            <span className="text-sm">Student</span>
                                        </button>
                                        <button
                                            onClick={() => handleRoleSelection('faculty')}
                                            className={`py-3 rounded-lg font-semibold transition-colors flex flex-col items-center justify-center space-y-1 ${userType === 'faculty'
                                                ? 'bg-orange-600 text-white ring-2 ring-orange-300'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <span className="text-2xl">👨‍🏫</span>
                                            <span className="text-sm">Faculty</span>
                                        </button>
                                        <button
                                            onClick={() => handleRoleSelection('admin')}
                                            className={`py-3 rounded-lg font-semibold transition-colors flex flex-col items-center justify-center space-y-1 ${userType === 'admin'
                                                ? 'bg-orange-600 text-white ring-2 ring-orange-300'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <span className="text-2xl">👨‍💼</span>
                                            <span className="text-sm">Admin</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Selected Role Info */}
                                {userType && (
                                    <div className="mb-4 p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                                        <p className="text-sm font-semibold text-orange-900">
                                            {userType === 'student' && '👨‍🎓 Student Login Selected'}
                                            {userType === 'faculty' && '👨‍🏫 Faculty Login Selected'}
                                            {userType === 'admin' && '👨‍💼 Admin Login Selected'}
                                        </p>
                                        <p className="text-xs text-orange-700 mt-1">
                                            Please enter your credentials below
                                        </p>
                                    </div>
                                )}

                                {/* Login Form */}
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Email Address <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                                            placeholder={
                                                userType === 'student' ? 'student@srit.ac.in' :
                                                    userType === 'faculty' ? 'faculty@srit.ac.in' :
                                                        userType === 'admin' ? 'admin@srit.ac.in' :
                                                            'your.email@srit.ac.in'
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Password <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading || !email || !password}
                                        className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* REGISTER TAB */}
                        {activeTab === 'register' && (
                            <div>
                                <h1 className="text-3xl font-bold text-black mb-6">Create Account</h1>
                                <p className="text-gray-600 mb-6">Register as Student or Faculty</p>

                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Full Name <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={registerData.name}
                                            onChange={handleRegisterInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Email Address <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={registerData.email}
                                            onChange={handleRegisterInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                                            placeholder="your.email@srit.ac.in"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Role <span className="text-orange-600">*</span>
                                        </label>
                                        <select
                                            name="role"
                                            value={registerData.role}
                                            onChange={handleRegisterInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                                        >
                                            <option value="student">Student</option>
                                            <option value="faculty">Faculty</option>
                                        </select>
                                    </div>

                                    {/* Branch Selection (Only for Students) */}
                                    {registerData.role === 'student' && (
                                        <div>
                                            <label className="block text-sm font-semibold text-black mb-2">
                                                Branch <span className="text-orange-600">*</span>
                                            </label>
                                            <select
                                                name="branch"
                                                value={registerData.branch || ''}
                                                onChange={handleRegisterInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                                                required
                                            >
                                                <option value="">Select Branch</option>
                                                <option value="CSE">CSE</option>
                                                <option value="ECE">ECE</option>
                                                <option value="EEE">EEE</option>
                                                <option value="Mechanical">Mechanical</option>
                                                <option value="Civil">Civil</option>
                                                <option value="CSM">CSM</option>
                                                <option value="CSD">CSD</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Password <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={registerData.password}
                                            onChange={handleRegisterInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                                            placeholder="Minimum 6 characters"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Confirm Password <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={registerData.confirmPassword}
                                            onChange={handleRegisterInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                                            placeholder="Re-enter your password"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Registering...' : 'Register'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
