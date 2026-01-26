import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAnnouncements = ({ token }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'info',
    expiryDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${API_URL}/announcements`);
      if (response.data.success) {
        setAnnouncements(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const data = {
        ...formData,
        expiryDate: formData.expiryDate || null
      };

      if (editingId) {
        // Update existing announcement
        await axios.put(`${API_URL}/announcements/${editingId}`, data, config);
        setMessage({ text: 'Announcement updated successfully!', type: 'success' });
      } else {
        // Create new announcement
        await axios.post(`${API_URL}/announcements`, data, config);
        setMessage({ text: 'Announcement created successfully!', type: 'success' });
      }

      // Reset form
      setFormData({ title: '', content: '', type: 'info', expiryDate: '' });
      setIsCreating(false);
      setEditingId(null);
      fetchAnnouncements();

      // Clear message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error saving announcement:', error);
      setMessage({
        text: error.response?.data?.error || 'Failed to save announcement',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      type: announcement.type,
      expiryDate: announcement.expiryDate ? announcement.expiryDate.split('T')[0] : ''
    });
    setEditingId(announcement._id);
    setIsCreating(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement?')) {
      return;
    }

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.delete(`${API_URL}/announcements/${id}`, config);
      setMessage({ text: 'Announcement deleted successfully!', type: 'success' });
      fetchAnnouncements();

      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error deleting announcement:', error);
      setMessage({
        text: error.response?.data?.error || 'Failed to delete announcement',
        type: 'error'
      });
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      await axios.put(
        `${API_URL}/announcements/${id}`,
        { isActive: !currentStatus },
        config
      );
      fetchAnnouncements();
    } catch (error) {
      console.error('Error toggling announcement status:', error);
    }
  };

  const cancelEdit = () => {
    setFormData({ title: '', content: '', type: 'info', expiryDate: '' });
    setIsCreating(false);
    setEditingId(null);
  };

  const getTypeColor = (type) => {
    const colors = {
      info: 'bg-blue-100 text-blue-800 border-blue-300',
      important: 'bg-orange-100 text-orange-800 border-orange-300',
      urgent: 'bg-red-100 text-red-800 border-red-300',
      event: 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[type] || colors.info;
  };

  const getTypeIcon = (type) => {
    const icons = {
      info: 'ℹ️',
      important: '⚠️',
      urgent: '🚨',
      event: '📅'
    };
    return icons[type] || icons.info;
  };

  return (
    <div className="admin-announcements">
      <div className="admin-announcements-header">
        <h2 className="text-2xl font-bold text-gray-900">📢 Manage Announcements</h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            + Create New Announcement
          </button>
        )}
      </div>

      {/* Success/Error Message */}
      {message.text && (
        <div className={`message-alert ${message.type === 'success' ? 'success' : 'error'}`}>
          {message.text}
        </div>
      )}

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="announcement-form-card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {editingId ? 'Edit Announcement' : 'Create New Announcement'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter announcement title"
                required
                maxLength="200"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.title.length}/200 characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter announcement content (details will be shown in modal)"
                required
                maxLength="2000"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.content.length}/2000 characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="info">ℹ️ Info</option>
                  <option value="important">⚠️ Important</option>
                  <option value="urgent">🚨 Urgent</option>
                  <option value="event">📅 Event</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (editingId ? 'Update Announcement' : 'Create Announcement')}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      <div className="announcements-list">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          All Announcements ({announcements.length})
        </h3>

        {announcements.length === 0 ? (
          <div className="empty-state">
            <p className="text-gray-500 text-center py-8">
              No announcements yet. Create your first announcement to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement._id} className="announcement-card">
                <div className="announcement-card-header">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTypeIcon(announcement.type)}</span>
                    <div>
                      <h4 className="font-bold text-gray-900">{announcement.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getTypeColor(announcement.type)}`}>
                          {announcement.type.toUpperCase()}
                        </span>
                        <span>👁️ {announcement.clickCount} views</span>
                        <span>📅 {new Date(announcement.createdAt).toLocaleDateString()}</span>
                        {announcement.expiryDate && (
                          <span className="text-orange-600">
                            ⏰ Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActive(announcement._id, announcement.isActive)}
                      className={`px-3 py-1 rounded text-xs font-semibold ${announcement.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                    >
                      {announcement.isActive ? '✓ Active' : '✗ Inactive'}
                    </button>
                  </div>
                </div>

                <p className="announcement-card-content">
                  {announcement.content.length > 150
                    ? `${announcement.content.substring(0, 150)}...`
                    : announcement.content}
                </p>

                <div className="announcement-card-actions">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-semibold text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-semibold text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
