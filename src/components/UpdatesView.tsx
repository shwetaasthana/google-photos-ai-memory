import React from 'react';
import { ArrowLeft, MoreHorizontal, AlertCircle, Sparkles } from 'lucide-react';

interface UpdatesViewProps {
  onBack: () => void;
  onManageStorage: () => void;
  onViewEdits: () => void;
}

export const UpdatesView: React.FC<UpdatesViewProps> = ({
  onBack,
  onManageStorage,
  onViewEdits,
}) => {
  return (
    <div className="gp-updates-view animate-fade-in">
      {/* Top Bar */}
      <div className="gp-updates-topbar">
        <button className="gp-back-link" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h2 className="gp-updates-title">Updates</h2>
        <button className="gp-icon-btn">
          <MoreHorizontal size={20} color="#5F6368" />
        </button>
      </div>

      <div className="gp-updates-content">
        {/* For Your Review */}
        <section className="gp-update-section">
          <h4 className="gp-section-subhead">For your review</h4>

          <div className="gp-storage-alert-card">
            <div className="gp-alert-icon-circle">
              <AlertCircle size={24} color="#D93025" />
            </div>
            <div className="gp-alert-info">
              <h4 className="gp-alert-title">You're out of storage</h4>
              <p className="gp-alert-desc">Photos aren't backing up</p>

              <div className="gp-alert-actions">
                <button className="gp-alert-btn" onClick={onManageStorage}>
                  Manage storage
                </button>
                <button className="gp-alert-btn" onClick={onManageStorage}>
                  Get storage
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Last Week Edits */}
        <section className="gp-update-section">
          <h4 className="gp-section-subhead">Last week</h4>

          <div className="gp-favorite-edit-card">
            <div className="gp-edit-card-header">
              <div className="gp-edit-sparkle-icon">
                <Sparkles size={20} color="#00639B" />
              </div>
              <div>
                <h4 className="gp-edit-card-title">Choose your favorite edit</h4>
                <p className="gp-edit-card-desc">
                  Easily save edits made for you from better lighting to more creative edits
                </p>
              </div>
            </div>

            {/* Collage Grid */}
            <div className="gp-edits-collage-grid" onClick={onViewEdits}>
              <div className="gp-edit-item">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                  alt="Mountain"
                />
              </div>
              <div className="gp-edit-item">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80"
                  alt="Puppy"
                />
              </div>
              <div className="gp-edit-item">
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80"
                  alt="MacBook Desk"
                />
              </div>
              <div className="gp-edit-item relative">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
                  alt="Interior"
                />
                <div className="gp-overlay-plus">+2</div>
              </div>
            </div>

            <button className="gp-view-edits-link" onClick={onViewEdits}>
              View edits
            </button>
          </div>
        </section>

        {/* Last Month Edits */}
        <section className="gp-update-section">
          <h4 className="gp-section-subhead">Last month</h4>

          <div className="gp-favorite-edit-card">
            <div className="gp-edit-card-header">
              <div className="gp-edit-sparkle-icon">
                <Sparkles size={20} color="#00639B" />
              </div>
              <div>
                <h4 className="gp-edit-card-title">Choose your favorite edit</h4>
                <p className="gp-edit-card-desc">
                  Easily save edits made for you from better lighting to more creative edits
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .gp-updates-view {
          min-height: 100vh;
          background: #FFFFFF;
          padding-bottom: 90px;
        }

        .gp-updates-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid var(--gp-border-subtle);
          position: sticky;
          top: 0;
          background: white;
          z-index: 50;
        }

        .gp-back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          color: var(--gp-text-primary);
          font-weight: 500;
        }

        .gp-updates-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--gp-text-primary);
        }

        .gp-updates-content {
          padding: 16px;
        }

        .gp-update-section {
          margin-bottom: 24px;
        }

        .gp-section-subhead {
          font-size: 13px;
          font-weight: 500;
          color: var(--gp-text-secondary);
          margin-bottom: 12px;
        }

        /* Storage Card */
        .gp-storage-alert-card {
          display: flex;
          gap: 16px;
          background: #FCE8E6;
          border-radius: var(--gp-radius-md);
          padding: 16px;
        }

        .gp-alert-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FAD2CF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .gp-alert-title {
          font-size: 15px;
          font-weight: 600;
          color: #202124;
        }

        .gp-alert-desc {
          font-size: 13px;
          color: #5F6368;
          margin-bottom: 10px;
        }

        .gp-alert-actions {
          display: flex;
          gap: 16px;
        }

        .gp-alert-btn {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--gp-blue-primary);
        }

        /* Edit Card */
        .gp-favorite-edit-card {
          background: #FFFFFF;
          border: 1px solid var(--gp-border-subtle);
          border-radius: var(--gp-radius-md);
          padding: 16px;
        }

        .gp-edit-card-header {
          display: flex;
          gap: 12px;
          margin-bottom: 14px;
        }

        .gp-edit-sparkle-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #C2E7FF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .gp-edit-card-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--gp-text-primary);
        }

        .gp-edit-card-desc {
          font-size: 13px;
          color: var(--gp-text-secondary);
        }

        .gp-edits-collage-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px;
          border-radius: var(--gp-radius-md);
          overflow: hidden;
          margin-bottom: 12px;
          cursor: pointer;
        }

        .gp-edit-item {
          height: 120px;
        }

        .gp-edit-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gp-overlay-plus {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          color: white;
          font-size: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gp-view-edits-link {
          font-size: 14px;
          font-weight: 600;
          color: var(--gp-blue-primary);
        }
      `}</style>
    </div>
  );
};
