import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BookingDashboard from './BookingDashboard';
import MarksDashboard from './MarksDashboard';
import FacultyAttendance from './FacultyAttendance';
import StudentAttendance from './StudentAttendance';
import AdminAnnouncements from '../components/AdminAnnouncements';
import { useState } from 'react';

const DashboardPage = () => {
    const { user, logout } = useAuth();

    const [activeTab, setActiveTab] = useState(user?.role === 'admin' ? 'announcements' : 'bookings');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo & Title */}
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">C</span>
                                </div>
                                <span className="font-bold text-gray-800 text-lg">College Portal</span>
                            </Link>
                        </div>

                        {/* Navigation Tabs (Centers) */}
                        <div className="hidden md:flex space-x-4">
                            {user?.role === 'admin' && (
                                <button
                                    onClick={() => setActiveTab('announcements')}
                                    className={`px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === 'announcements'
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'text-gray-600 hover:text-orange-600'
                                        }`}
                                >
                                    📢 Announcements
                                </button>
                            )}
                            <button
                                onClick={() => setActiveTab('bookings')}
                                className={`px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === 'bookings'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'text-gray-600 hover:text-orange-600'
                                    }`}
                            >
                                📅 Bookings
                            </button>
                            <button
                                onClick={() => setActiveTab('marks')}
                                className={`px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === 'marks'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'text-gray-600 hover:text-orange-600'
                                    }`}
                            >
                                📊 Marks
                            </button>
                            <button
                                onClick={() => setActiveTab('attendance')}
                                className={`px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === 'attendance'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'text-gray-600 hover:text-orange-600'
                                    }`}
                            >
                                ✅ Attendance
                            </button>
                        </div>

                        {/* User Info & Actions */}
                        <div className="flex items-center space-x-6">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-600">{user?.email}</p>
                                <p className="text-xs mt-1">
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${user?.role === 'admin' ? 'bg-orange-100 text-orange-800' :
                                        user?.role === 'faculty' ? 'bg-orange-100 text-orange-800' :
                                            'bg-orange-100 text-orange-800'
                                        }`}>
                                        {user?.role?.toUpperCase()}
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Link
                                    to="/"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors text-center border border-gray-300 rounded-lg hover:border-orange-600"
                                >
                                    🏠 Home
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Tab Helper */}
            <div className="md:hidden bg-white border-t p-2 flex justify-center space-x-2">
                {user?.role === 'admin' && (
                    <button
                        onClick={() => setActiveTab('announcements')}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg ${activeTab === 'announcements' ? 'bg-orange-100 text-orange-700' : 'text-gray-600'}`}
                    >
                        📢
                    </button>
                )}
                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg ${activeTab === 'bookings' ? 'bg-orange-100 text-orange-700' : 'text-gray-600'}`}
                >
                    📅
                </button>
                <button
                    onClick={() => setActiveTab('marks')}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg ${activeTab === 'marks' ? 'bg-orange-100 text-orange-700' : 'text-gray-600'}`}
                >
                    📊
                </button>
                <button
                    onClick={() => setActiveTab('attendance')}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg ${activeTab === 'attendance' ? 'bg-orange-100 text-orange-700' : 'text-gray-600'}`}
                >
                    ✅
                </button>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'announcements' && user?.role === 'admin' ? (
                    <AdminAnnouncements token={localStorage.getItem('token')} />
                ) : activeTab === 'bookings' ? (
                    <BookingDashboard />
                ) : activeTab === 'marks' ? (
                    <MarksDashboard />
                ) : (
                    user?.role === 'student' ? <StudentAttendance /> : <FacultyAttendance />
                )}
            </main>
        </div>
    );
};

export default DashboardPage;
