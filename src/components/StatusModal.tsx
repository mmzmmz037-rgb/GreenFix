import './StatusModal.css';
type SubmitStatus = 'idle' | 'success' | 'error';

interface StatusModalProps {
  status: SubmitStatus;
  onClose: () => void;
}

const StatusModal = ({ status, onClose }: StatusModalProps) => {
  if (status === 'idle') return null;

  return (
    <div className="status-modal-overlay" onClick={onClose}>
      <div
        className={`status-modal ${status}`}
        role="alert"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="status-modal-close"
          onClick={onClose}
          aria-label="סגירה"
        >
          ✕
        </button>
        {status === 'success' ? (
          <>
            <h3>הבקשה נשלחה בהצלחה!</h3>
            <p>נחזור אליכם בהקדם לתיאום בעל מקצוע.</p>
          </>
        ) : (
          <>
            <h3>לא הצלחנו לשלוח</h3>
            <p>בדקו את החיבור ונסו שוב, או התקשרו אלינו ישירות.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusModal;