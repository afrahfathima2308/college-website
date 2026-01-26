import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AnnouncementModal from './AnnouncementModal';

const NoticeBoard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch announcements
  useEffect(() => {
    fetchAnnouncements();
    // Refresh announcements every 5 minutes
    const interval = setInterval(fetchAnnouncements, 300000);
    return () => clearInterval(interval);
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

  const handleAnnouncementClick = async (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);

    // Track click count
    try {
      await axios.post(`${API_URL}/announcements/${announcement._id}/click`);
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      info: 'notice-type-info',
      important: 'notice-type-important',
      urgent: 'notice-type-urgent',
      event: 'notice-type-event'
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  if (announcements.length === 0) {
    return null; // Don't show widget if no announcements
  }

  return (
    <>
      <div className="notice-board-container">
        <div className="notice-board-header">
          <div className="notice-board-title">
            <span className="notice-icon">📢</span>
            <h3>Latest Updates</h3>
          </div>
          <span className="notice-badge">{announcements.length}</span>
        </div>

        <div
          className="notice-board-scroll-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={scrollContainerRef}
            className={`notice-board-scroll ${isHovered ? 'paused' : ''}`}
          >
            {/* Only duplicate for infinite scroll if we have 3+ announcements */}
            {/* With fewer announcements, just show them once to avoid obvious duplicates */}
            {(announcements.length >= 3
              ? [...announcements, ...announcements]
              : announcements
            ).map((announcement, index) => (
              <div
                key={`${announcement._id}-${index}`}
                className={`notice-item ${getTypeColor(announcement.type)}`}
                onClick={() => handleAnnouncementClick(announcement)}
              >
                <div className="notice-type-icon">
                  {getTypeIcon(announcement.type)}
                </div>
                <div className="notice-content">
                  <h4 className="notice-title">{announcement.title}</h4>
                  <p className="notice-preview">
                    {announcement.content.length > 80
                      ? `${announcement.content.substring(0, 80)}...`
                      : announcement.content}
                  </p>
                  <div className="notice-meta">
                    <span className="notice-date">
                      {formatDate(announcement.createdAt)}
                    </span>
                    <span className="notice-read-more">Click to read →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="notice-board-footer">
          <button
            className="notice-view-all"
            onClick={() => {/* Can add view all page later */ }}
          >
            View All Updates
          </button>
        </div>
      </div>

      {/* Announcement Modal */}
      {isModalOpen && selectedAnnouncement && (
        <AnnouncementModal
          announcement={selectedAnnouncement}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAnnouncement(null);
          }}
        />
      )}
    </>
  );
};

export default NoticeBoard;
