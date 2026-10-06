import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="gp-toast-container animate-fade-in">
      <CheckCircle2 size={18} color="#34A853" />
      <span className="gp-toast-message">{message}</span>
      <button className="gp-toast-close" onClick={onClose}>
        <X size={14} />
      </button>

      <style>{`
        .gp-toast-container {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: #2E3134;
          color: #FFFFFF;
          padding: 12px 20px;
          border-radius: var(--gp-radius-pill);
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
          z-index: 2000;
          font-size: 14px;
          font-weight: 500;
        }

        .gp-toast-message {
          color: #F1F3F4;
        }

        .gp-toast-close {
          color: #9AA0A6;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-left: 6px;
        }

        .gp-toast-close:hover {
          color: #FFFFFF;
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
};
