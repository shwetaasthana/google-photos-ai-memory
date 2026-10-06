import React from 'react';
import { X, Cloud, Settings, HardDrive, ShieldCheck, Check } from 'lucide-react';

interface AccountModalProps {
  onClose: () => void;
  onManageStorage: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ onClose, onManageStorage }) => {
  return (
    <div className="gp-account-backdrop animate-fade-in" onClick={onClose}>
      <div className="gp-account-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="gp-sheet-header">
          <button className="gp-sheet-close" onClick={onClose}>
            <X size={20} />
          </button>
          <span className="gp-google-logo-text">Google Account</span>
        </div>

        {/* User Card */}
        <div className="gp-user-profile-card">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Alex Chen"
            className="gp-sheet-avatar"
          />
          <div className="gp-user-details">
            <h3 className="gp-user-name">Alex Chen</h3>
            <p className="gp-user-email">alex.chen@gmail.com</p>
          </div>
          <button className="gp-manage-acct-btn">Manage your Google Account</button>
        </div>

        {/* Backup Status Card */}
        <div className="gp-backup-card">
          <div className="gp-backup-row">
            <Cloud size={20} color="#1A73E8" />
            <div>
              <h4 className="gp-backup-title">Backup is complete</h4>
              <p className="gp-backup-desc">All photos & videos saved to cloud</p>
            </div>
            <ShieldCheck size={20} color="#34A853" className="gp-backup-check" />
          </div>
        </div>

        {/* Storage Bar Card */}
        <div className="gp-storage-card">
          <div className="gp-storage-header-row">
            <HardDrive size={18} color="#5F6368" />
            <span className="gp-storage-text">
              Account storage: <strong>13.8 GB of 15 GB (92% used)</strong>
            </span>
          </div>

          <div className="gp-progress-track">
            <div className="gp-progress-fill" style={{ width: '92%' }}></div>
          </div>

          <button className="gp-storage-action-btn" onClick={onManageStorage}>
            Clean up storage & get 100 GB
          </button>
        </div>

        {/* Options List */}
        <div className="gp-sheet-options-list">
          <button className="gp-option-row">
            <Settings size={20} color="#5F6368" />
            <span>Photos settings</span>
          </button>
        </div>
      </div>

      <style>{`
        .gp-account-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          border-radius: inherit;
          overflow: hidden;
        }

        .gp-account-sheet {
          background: #FFFFFF;
          width: 100%;
          max-width: 480px;
          border-radius: 28px 28px 0 0;
          padding: 20px 20px 32px;
          box-shadow: var(--gp-shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .gp-sheet-header {
          display: flex;
          align-items: center;
          position: relative;
        }

        .gp-sheet-close {
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gp-google-logo-text {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 15px;
          font-weight: 500;
          color: #5F6368;
        }

        .gp-user-profile-card {
          background: #F8F9FA;
          border-radius: var(--gp-radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .gp-sheet-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 8px;
        }

        .gp-user-name {
          font-size: 17px;
          font-weight: 600;
          color: var(--gp-text-primary);
        }

        .gp-user-email {
          font-size: 13px;
          color: var(--gp-text-secondary);
          margin-bottom: 12px;
        }

        .gp-manage-acct-btn {
          border: 1px solid #DADCE0;
          background: white;
          padding: 8px 16px;
          border-radius: var(--gp-radius-pill);
          font-size: 13px;
          font-weight: 500;
          color: var(--gp-text-primary);
        }

        .gp-backup-card, .gp-storage-card {
          background: #F8F9FA;
          border-radius: var(--gp-radius-md);
          padding: 14px 16px;
        }

        .gp-backup-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .gp-backup-title {
          font-size: 14px;
          font-weight: 600;
        }

        .gp-backup-desc {
          font-size: 12px;
          color: var(--gp-text-secondary);
        }

        .gp-backup-check {
          margin-left: auto;
        }

        .gp-storage-header-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .gp-storage-text {
          font-size: 13px;
          color: var(--gp-text-primary);
        }

        .gp-progress-track {
          width: 100%;
          height: 8px;
          background: #E8EAED;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .gp-progress-fill {
          height: 100%;
          background: #D93025;
          border-radius: 4px;
        }

        .gp-storage-action-btn {
          width: 100%;
          background: #C2E7FF;
          color: #001D35;
          font-weight: 600;
          font-size: 13px;
          padding: 10px;
          border-radius: var(--gp-radius-pill);
          text-align: center;
        }

        .gp-sheet-options-list {
          display: flex;
          flex-direction: column;
        }

        .gp-option-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: var(--gp-text-primary);
        }

        .gp-option-row:hover {
          background: #F1F3F4;
        }
      `}</style>
    </div>
  );
};
