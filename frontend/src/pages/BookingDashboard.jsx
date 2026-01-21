import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { bookingAPI } from '../services/api';

const BookingDashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        hallName: '',
        eventName: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        department: '',
        contactNumber: '',
        expectedAttendees: '',
        equipmentNeeded: []
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Venues: Seminar Halls and Classrooms
    const halls = [
        // Seminar Halls
        'Main Seminar Hall', 'Conference Room A', 'Conference Room B', 'Auditorium', 'Mini Hall',
        // Classrooms
        'Classroom 101', 'Classroom 102', 'Classroom 103', 
        'Classroom 201', 'Classroom 202', 'Classroom 203',
        'Classroom 301', 'Classroom 302', 'Classroom 303',
        'Classroom 401', 'Classroom 402', 'Classroom 403',
        // Computer Labs
        'Computer Lab 1', 'Computer Lab 2', 'Computer Lab 3'
    ];
    const departments = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'];
    const equipment = ['Projector', 'Microphone', 'Speakers', 'Whiteboard', 'Video Conference', 'None'];

    useEffect(() => {
        fetchBookings();
    }, [user]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await bookingAPI.getAllBookings();
            setBookings(response.data.bookings);

            // Fetch pending bookings if admin
            if (user?.role === 'admin') {
                const pendingResponse = await bookingAPI.getPendingBookings();
                setPendingBookings(pendingResponse.data.bookings);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEquipmentChange = (item) => {
        setFormData(prev => ({
            ...prev,
            equipmentNeeded: prev.equipmentNeeded.includes(item)
                ? prev.equipmentNeeded.filter(e => e !== item)
                : [...prev.equipmentNeeded, item]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await bookingAPI.createBooking(formData);
            setSuccess('Booking created successfully! Awaiting admin approval.');
            setShowForm(false);
            setFormData({
                hallName: '',
                eventName: '',
                description: '',
                date: '',
                startTime: '',
                endTime: '',
                department: '',
                contactNumber: '',
                expectedAttendees: '',
                equipmentNeeded: []
            });
            fetchBookings();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create booking');
        }
    };

    const handleApprove = async (id) => {
        try {
            await bookingAPI.approveBooking(id);
            setSuccess('Booking approved successfully!');
            fetchBookings();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to approve booking');
        }
    };

    const handleReject = async (id) => {
        const reason = prompt('Please provide a reason for rejection:');
        if (!reason) return;

        try {
            await bookingAPI.rejectBooking(id, reason);
            setSuccess('Booking rejected successfully!');
            fetchBookings();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reject booking');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;

        try {
            await bookingAPI.deleteBooking(id);
            setSuccess('Booking deleted successfully!');
            fetchBookings();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete booking');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
                {status.toUpperCase()}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Hall & Classroom Booking System
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {user?.role === 'admin' && 'Manage all venue bookings (halls and classrooms)'}
                        {user?.role === 'faculty' && 'Book and view your venue reservations'}
                        {user?.role === 'student' && 'Book halls and classrooms for your events'}
                    </p>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                        {success}
                    </div>
                )}

                {/* New Booking Button */}
                {(user?.role === 'student' || user?.role === 'faculty') && (
                    <div className="mb-6">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                        >
                            {showForm ? 'Cancel' : '+ New Booking'}
                        </button>
                    </div>
                )}

                {/* Booking Form */}
                {showForm && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Booking</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Venue Name (Hall or Classroom) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Venue (Hall/Classroom) *
                                    </label>
                                    <select
                                        name="hallName"
                                        value={formData.hallName}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">Select Venue</option>
                                        <optgroup label="Seminar Halls">
                                            {halls.slice(0, 5).map(hall => (
                                                <option key={hall} value={hall}>{hall}</option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="Classrooms">
                                            {halls.slice(5, 14).map(hall => (
                                                <option key={hall} value={hall}>{hall}</option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="Computer Labs">
                                            {halls.slice(14).map(hall => (
                                                <option key={hall} value={hall}>{hall}</option>
                                            ))}
                                        </optgroup>
                                    </select>
                                </div>

                                {/* Event Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Event Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="eventName"
                                        value={formData.eventName}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                        placeholder="Tech Talk, Workshop, etc."
                                    />
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        className="input-field"
                                    />
                                </div>

                                {/* Start Time */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Start Time *
                                    </label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    />
                                </div>

                                {/* End Time */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        End Time *
                                    </label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    />
                                </div>

                                {/* Department */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Department *
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Contact Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Contact Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                        placeholder="+91 1234567890"
                                    />
                                </div>

                                {/* Expected Attendees */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Expected Attendees *
                                    </label>
                                    <input
                                        type="number"
                                        name="expectedAttendees"
                                        value={formData.expectedAttendees}
                                        onChange={handleInputChange}
                                        required
                                        min="1"
                                        className="input-field"
                                        placeholder="50"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    className="input-field resize-none"
                                    placeholder="Describe your event..."
                                />
                            </div>

                            {/* Equipment Needed */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Equipment Needed
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {equipment.map(item => (
                                        <label key={item} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.equipmentNeeded.includes(item)}
                                                onChange={() => handleEquipmentChange(item)}
                                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                            />
                                            <span className="text-sm text-gray-700">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                                >
                                    Submit Booking
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Admin: Pending Bookings */}
                {user?.role === 'admin' && pendingBookings.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Pending Approvals ({pendingBookings.length})
                        </h2>
                        <div className="space-y-4">
                            {pendingBookings.map(booking => (
                                <div key={booking._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{booking.eventName}</h3>
                                            <p className="text-sm text-gray-600">
                                                Requested by: {booking.bookedBy?.name} ({booking.bookedBy?.email})
                                            </p>
                                        </div>
                                        {getStatusBadge(booking.status)}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                                        <div><strong>Venue:</strong> {booking.hallName}</div>
                                        <div><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</div>
                                        <div><strong>Time:</strong> {booking.startTime} - {booking.endTime}</div>
                                        <div><strong>Department:</strong> {booking.department}</div>
                                        <div><strong>Attendees:</strong> {booking.expectedAttendees}</div>
                                        <div><strong>Contact:</strong> {booking.contactNumber}</div>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-4"><strong>Description:</strong> {booking.description}</p>
                                    {booking.equipmentNeeded?.length > 0 && (
                                        <p className="text-sm text-gray-700 mb-4">
                                            <strong>Equipment:</strong> {booking.equipmentNeeded.join(', ')}
                                        </p>
                                    )}
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleApprove(booking._id)}
                                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-semibold"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(booking._id)}
                                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Bookings */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {user?.role === 'admin' ? 'All Bookings' : 'My Bookings'} ({bookings.length})
                    </h2>
                    {bookings.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">No bookings found</p>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map(booking => (
                                <div key={booking._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{booking.eventName}</h3>
                                            {user?.role === 'admin' && (
                                                <p className="text-sm text-gray-600">
                                                    By: {booking.bookedBy?.name} ({booking.bookedBy?.role})
                                                </p>
                                            )}
                                        </div>
                                        {getStatusBadge(booking.status)}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                                        <div><strong>Venue:</strong> {booking.hallName}</div>
                                        <div><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</div>
                                        <div><strong>Time:</strong> {booking.startTime} - {booking.endTime}</div>
                                        <div><strong>Department:</strong> {booking.department}</div>
                                    </div>
                                    {booking.status === 'rejected' && booking.rejectionReason && (
                                        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                                            <p className="text-sm text-red-700">
                                                <strong>Rejection Reason:</strong> {booking.rejectionReason}
                                            </p>
                                        </div>
                                    )}
                                    {booking.status === 'pending' && user?.role !== 'admin' && (
                                        <button
                                            onClick={() => handleDelete(booking._id)}
                                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold"
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingDashboard;
