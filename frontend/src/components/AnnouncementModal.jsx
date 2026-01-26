import { useEffect } from 'react';

const AnnouncementModal = ({ announcement, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const getTypeColor = (type) => {
    const colors = {
      info: '#3b82f6',
      important: '#f97316',
      urgent: '#ef4444',
      event: '#10b981'
    };
    return colors[type] || colors.info;
  };

  const getTypeLabel = (type) => {
    const labels = {
      info: 'Information',
      important: 'Important',
      urgent: 'Urgent',
      event: 'Event'
    };
    return labels[type] || labels.info;
  };

  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="announcement-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal header */}
        <div className="modal-header">
          <div
            className="modal-type-badge"
            style={{ backgroundColor: getTypeColor(announcement.type) }}
          >
            {getTypeLabel(announcement.type)}
          </div>
          <h2 className="modal-title">{announcement.title}</h2>
          <div className="modal-meta">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>{formatFullDate(announcement.createdAt)}</span>
          </div>
        </div>

        {/* Modal content */}
        <div className="modal-content">
          <p className="modal-text">{announcement.content}</p>

          {announcement.postedBy && (
            <div className="modal-footer">
              <div className="posted-by">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Posted by: <strong>{announcement.postedBy.name}</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;
