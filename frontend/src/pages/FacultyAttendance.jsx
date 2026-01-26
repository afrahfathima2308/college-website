import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FacultyAttendance = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});

    const branches = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'CSM', 'CSD', 'Other'];
    const periods = [1, 2, 3, 4, 5, 6];

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
    }, []);

    const fetchStudents = async () => {
        if (!selectedBranch) return;

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/marks/branch/${selectedBranch}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setStudents(response.data.data);

            // Initialize attendance data
            const initialData = {};
            response.data.data.forEach(student => {
                initialData[student._id] = 'Present';
            });
            setAttendanceData(initialData);
        } catch (err) {
            setError('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    const fetchExistingAttendance = async () => {
        if (!selectedBranch || !selectedDate || !selectedPeriod) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/attendance/branch/${selectedBranch}?date=${selectedDate}&period=${selectedPeriod}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.data.length > 0) {
                const existingData = {};
                response.data.data.forEach(record => {
                    existingData[record.student._id || record.student] = record.status;
                });
                setAttendanceData(prev => ({ ...prev, ...existingData }));
            }
        } catch (err) {
            console.error('Failed to fetch existing attendance');
        }
    };

    useEffect(() => {
        if (selectedBranch) {
            fetchStudents();
        }
    }, [selectedBranch]);

    useEffect(() => {
        if (selectedBranch && selectedDate && selectedPeriod && students.length > 0) {
            fetchExistingAttendance();
        }
    }, [selectedBranch, selectedDate, selectedPeriod, students.length]);

    const toggleAttendance = (studentId) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present'
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!selectedBranch || !selectedDate || !selectedPeriod) {
            setError('Please select branch, date, and period');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const payload = {
                date: selectedDate,
                period: parseInt(selectedPeriod),
                branch: selectedBranch,
                attendanceData: students.map(student => ({
                    studentId: student._id,
                    status: attendanceData[student._id] || 'Present'
                }))
            };

            await axios.post(`${API_URL}/attendance/mark`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSuccess('Attendance marked successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to mark attendance');
        } finally {
            setLoading(false);
        }
    };

    if (user?.role !== 'faculty' && user?.role !== 'admin') {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-red-600">Access Denied. Faculty access required.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>

            {/* Selection Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                        <select
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Select Branch</option>
                            {branches.map(branch => (
                                <option key={branch} value={branch}>{branch}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Select Period</option>
                            {periods.map(period => (
                                <option key={period} value={period}>Period {period}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {success && <div className="mb-4 bg-green-50 text-green-700 p-3 rounded">{success}</div>}
                {error && <div className="mb-4 bg-red-50 text-red-700 p-3 rounded">{error}</div>}

                {/* Student List */}
                {students.length > 0 && selectedPeriod && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Students - {selectedBranch} (Period {selectedPeriod})
                                </h3>
                                <div className="text-sm text-gray-500">
                                    Present: {Object.values(attendanceData).filter(s => s === 'Present').length} / {students.length}
                                </div>
                            </div>

                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {students.map((student) => (
                                    <div
                                        key={student._id}
                                        onClick={() => toggleAttendance(student._id)}
                                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${attendanceData[student._id] === 'Present'
                                                ? 'bg-green-50 border-green-300'
                                                : 'bg-red-50 border-red-300'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${attendanceData[student._id] === 'Present'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                                }`}>
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{student.name}</div>
                                                <div className="text-xs text-gray-500">{student.email}</div>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${attendanceData[student._id] === 'Present'
                                                ? 'bg-green-200 text-green-800'
                                                : 'bg-red-200 text-red-800'
                                            }`}>
                                            {attendanceData[student._id] || 'Present'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:bg-gray-400"
                        >
                            {loading ? 'Saving...' : 'Save Attendance'}
                        </button>
                    </form>
                )}

                {loading && students.length === 0 && (
                    <div className="text-center text-gray-600 py-8">Loading students...</div>
                )}

                {!selectedBranch && (
                    <div className="text-center text-gray-500 py-8">
                        Please select a branch to begin
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacultyAttendance;
