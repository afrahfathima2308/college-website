import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { marksAPI } from '../services/api';

const MarksDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Faculty States
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentMarks, setStudentMarks] = useState([]);
    const [marksForm, setMarksForm] = useState({
        subject: '',
        marksObtained: '',
        totalMarks: '100',
        semester: '1-1',
        examType: 'Semester'
    });

    // Student States
    const [myMarks, setMyMarks] = useState([]);

    const branches = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'CSM', 'CSD', 'Other'];
    const semesters = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'];
    const examTypes = ['Mid-1', 'Mid-2', 'Semester', 'Assignment', 'Lab'];

    useEffect(() => {
        if (user?.role === 'student') {
            fetchMyMarks();
        }
    }, [user]);

    // Student: Fetch My Marks
    const fetchMyMarks = async () => {
        try {
            setLoading(true);
            const response = await marksAPI.getMyMarks();
            setMyMarks(response.data);
        } catch (err) {
            setError('Failed to fetch marks');
        } finally {
            setLoading(false);
        }
    };

    // Faculty: Select Branch
    const handleBranchSelect = async (branch) => {
        setSelectedBranch(branch);
        setSelectedStudent(null);
        setStudentMarks([]);
        try {
            setLoading(true);
            const response = await marksAPI.getStudentsByBranch(branch);
            setStudents(response.data);
        } catch (err) {
            setError('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    // Faculty: Select Student
    const handleStudentSelect = async (student) => {
        setSelectedStudent(student);
        try {
            const response = await marksAPI.getStudentMarks(student._id);
            setStudentMarks(response.data);
        } catch (err) {
            console.error('Failed to fetch student marks');
        }
    };

    // Faculty: Add Mark
    const handleAddMark = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await marksAPI.addMark({
                ...marksForm,
                studentId: selectedStudent._id
            });
            setSuccess('Marks added successfully');
            // Refresh marks
            const response = await marksAPI.getStudentMarks(selectedStudent._id);
            setStudentMarks(response.data);
            // Reset form partly
            setMarksForm(prev => ({ ...prev, subject: '', marksObtained: '' }));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add marks');
        }
    };

    if (user?.role === 'student') {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Academic Performance</h2>
                {loading ? (
                    <div className="text-gray-600">Loading result...</div>
                ) : myMarks.length === 0 ? (
                    <div className="text-gray-500 italic">No marks uploaded yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {myMarks.map((mark) => (
                                    <tr key={mark._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{mark.semester}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mark.subject}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mark.examType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                                            {mark.marksObtained} / {mark.totalMarks}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${(mark.marksObtained / mark.totalMarks) >= 0.4 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {((mark.marksObtained / mark.totalMarks) * 100).toFixed(1)}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }

    // Role: Faculty/Admin
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Marks Management</h1>

            {/* Branch Selection */}
            {!selectedBranch && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {branches.map(branch => (
                        <button
                            key={branch}
                            onClick={() => handleBranchSelect(branch)}
                            className="p-6 bg-white border rounded-xl hover:shadow-lg hover:border-orange-500 transition-all text-center"
                        >
                            <div className="text-2xl font-bold text-gray-800">{branch}</div>
                            <div className="text-sm text-gray-500">View Students</div>
                        </button>
                    ))}
                </div>
            )}

            {/* Student List & Back Button */}
            {selectedBranch && !selectedStudent && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Students in {selectedBranch}</h2>
                        <button
                            onClick={() => setSelectedBranch(null)}
                            className="text-orange-600 hover:text-orange-800 font-medium"
                        >
                            ← Back to Branches
                        </button>
                    </div>

                    {loading ? (
                        <div>Loading students...</div>
                    ) : students.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">No students found in this branch.</div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {students.map(student => (
                                <button
                                    key={student._id}
                                    onClick={() => handleStudentSelect(student)}
                                    className="p-4 border rounded-lg hover:bg-orange-50 text-left transition-colors flex items-center space-x-3"
                                >
                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                                        {student.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{student.name}</div>
                                        <div className="text-xs text-gray-500">{student.email}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Add Marks Interface */}
            {selectedStudent && (
                <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                        <button onClick={() => setSelectedBranch(null)} className="hover:text-orange-600">Branches</button>
                        <span>&gt;</span>
                        <button onClick={() => setSelectedStudent(null)} className="hover:text-orange-600">{selectedBranch}</button>
                        <span>&gt;</span>
                        <span className="font-semibold text-gray-900">{selectedStudent.name}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Add Marks Form */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Add Marks</h3>
                            {success && <div className="mb-4 bg-green-50 text-green-700 p-3 rounded">{success}</div>}
                            {error && <div className="mb-4 bg-red-50 text-red-700 p-3 rounded">{error}</div>}

                            <form onSubmit={handleAddMark} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                                        <select
                                            value={marksForm.semester}
                                            onChange={(e) => setMarksForm({ ...marksForm, semester: e.target.value })}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                                        >
                                            {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
                                        <select
                                            value={marksForm.examType}
                                            onChange={(e) => setMarksForm({ ...marksForm, examType: e.target.value })}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                                        >
                                            {examTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        value={marksForm.subject}
                                        onChange={(e) => setMarksForm({ ...marksForm, subject: e.target.value })}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                                        required
                                        placeholder="e.g. Data Structures"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Obtained</label>
                                        <input
                                            type="number"
                                            value={marksForm.marksObtained}
                                            onChange={(e) => setMarksForm({ ...marksForm, marksObtained: e.target.value })}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                                            required
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                                        <input
                                            type="number"
                                            value={marksForm.totalMarks}
                                            onChange={(e) => setMarksForm({ ...marksForm, totalMarks: e.target.value })}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                                            required
                                            min="1"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors font-semibold"
                                >
                                    Save Marks
                                </button>
                            </form>
                        </div>

                        {/* Existing Marks View */}
                        <div className="bg-gray-50 rounded-xl p-6 overflow-y-auto max-h-[500px]">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Academic History</h3>
                            {studentMarks.length === 0 ? (
                                <p className="text-gray-500 text-sm">No records found.</p>
                            ) : (
                                <div className="space-y-3">
                                    {studentMarks.map(mark => (
                                        <div key={mark._id} className="bg-white p-3 rounded shadow-sm border border-gray-100">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-semibold text-gray-800">{mark.subject}</div>
                                                    <div className="text-xs text-gray-500">{mark.semester} • {mark.examType}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-orange-600">{mark.marksObtained}/{mark.totalMarks}</div>
                                                    <div className="text-xs text-gray-400">
                                                        {((mark.marksObtained / mark.totalMarks) * 100).toFixed(0)}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarksDashboard;
