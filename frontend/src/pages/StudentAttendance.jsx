import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentAttendance = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [stats, setStats] = useState({
        totalClasses: 0,
        presentCount: 0,
        percentage: 0
    });

    useEffect(() => {
        if (user?.role === 'student') {
            fetchMyAttendance();
        }
    }, [user]);

    const fetchMyAttendance = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/attendance/my`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setAttendanceRecords(response.data.data);
            setStats(response.data.stats);
        } catch (err) {
            setError('Failed to fetch attendance records');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    if (user?.role !== 'student') {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-red-600">Access Denied. Student access required.</p>
            </div>
        );
    }

    const attendancePercentage = parseFloat(stats.percentage);
    const belowThreshold = attendancePercentage < 75;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>

            {/* Attendance Warning */}
            {belowThreshold && attendanceRecords.length > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-800 font-semibold">
                                ⚠️ Warning: Your attendance is below 75%
                            </p>
                            <p className="text-xs text-red-700 mt-1">
                                Current attendance: {attendancePercentage.toFixed(2)}%. You need to maintain at least 75% attendance.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="text-sm text-gray-500 font-medium mb-1">Total Classes</div>
                    <div className="text-3xl font-bold text-gray-900">{stats.totalClasses}</div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="text-sm text-gray-500 font-medium mb-1">Classes Attended</div>
                    <div className="text-3xl font-bold text-green-600">{stats.presentCount}</div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="text-sm text-gray-500 font-medium mb-1">Attendance Percentage</div>
                    <div className={`text-3xl font-bold ${belowThreshold ? 'text-red-600' : 'text-green-600'}`}>
                        {attendancePercentage.toFixed(2)}%
                    </div>
                </div>
            </div>

            {/* Attendance Records Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Attendance Records</h2>

                {loading ? (
                    <div className="text-center text-gray-600 py-8">Loading attendance...</div>
                ) : error ? (
                    <div className="text-center text-red-600 py-8">{error}</div>
                ) : attendanceRecords.length === 0 ? (
                    <div className="text-center text-gray-500 py-8 italic">No attendance records found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Period
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {attendanceRecords.map((record) => (
                                    <tr key={record._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatDate(record.date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            Period {record.period}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${record.status === 'Present'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentAttendance;
