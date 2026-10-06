import React, { useState } from 'react';
import {
  X,
  Heart,
  Share2,
  FolderPlus,
  CheckCircle2,
  XCircle,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { MemoryCluster } from '../types';

interface MemoryPreviewModalProps {
  cluster: MemoryCluster;
  onClose: () => void;
  onConfirmSuccess: () => void;
  onRejectNotThisOne: () => void;
  onToggleFavorite: (clusterId: string) => void;
  onShare: (clusterTitle: string) => void;
  onAddToAlbum: (clusterTitle: string) => void;
  isFavorited: boolean;
}

export const MemoryPreviewModal: React.FC<MemoryPreviewModalProps> = ({
  cluster,
  onClose,
  onConfirmSuccess,
  onRejectNotThisOne,
  onToggleFavorite,
  onShare,
  onAddToAlbum,
  isFavorited,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const currentPhoto = cluster.photos[selectedPhotoIndex] || cluster.photos[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : cluster.photos.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev < cluster.photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="gp-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="gp-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Bar */}
        <div className="gp-modal-header">
          <div className="gp-modal-title-area">
            <span className="gp-modal-ai-tag">
              <Sparkles size={14} /> AI Candidate Preview
            </span>
            <h2 className="gp-modal-title">{cluster.title}</h2>
          </div>

          <div className="gp-modal-header-actions">
            <button
              className={`gp-icon-btn ${isFavorited ? 'favorited' : ''}`}
              onClick={() => onToggleFavorite(cluster.id)}
              title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <Heart size={20} fill={isFavorited ? '#D93025' : 'none'} color={isFavorited ? '#D93025' : '#5F6368'} />
            </button>
            <button
              className="gp-icon-btn"
              onClick={() => onShare(cluster.title)}
              title="Share Memory"
            >
              <Share2 size={20} color="#5F6368" />
            </button>
            <button
              className="gp-icon-btn"
              onClick={() => onAddToAlbum(cluster.title)}
              title="Add to Album"
            >
              <FolderPlus size={20} color="#5F6368" />
            </button>
            <button className="gp-icon-btn close-btn" onClick={onClose} title="Close preview">
              <X size={22} color="#5F6368" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="gp-modal-body">
          {/* Main Photo Carousel Viewer */}
          <div className="gp-main-photo-stage">
            <img
              src={currentPhoto.url}
              alt={currentPhoto.caption}
              className="gp-stage-image"
            />

            {/* Navigation Arrows */}
            {cluster.photos.length > 1 && (
              <>
                <button className="gp-stage-nav prev" onClick={handlePrev}>
                  <ChevronLeft size={24} />
                </button>
                <button className="gp-stage-nav next" onClick={handleNext}>
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div className="gp-photo-caption-bar">
              <span>{currentPhoto.caption}</span>
              <span className="gp-photo-counter">
                {selectedPhotoIndex + 1} / {cluster.photos.length}
              </span>
            </div>
          </div>

          {/* Side Inspector / Meta Details */}
          <div className="gp-modal-inspector">
            <div className="gp-inspector-section">
              <h4 className="gp-inspector-heading">Memory Context</h4>
              <p className="gp-inspector-subtitle">{cluster.subtitle}</p>
            </div>

            <div className="gp-meta-details-list">
              <div className="gp-detail-row">
                <MapPin size={18} className="gp-detail-icon" />
                <div>
                  <div className="gp-detail-label">Location</div>
                  <div className="gp-detail-value">{cluster.location}</div>
                </div>
              </div>

              <div className="gp-detail-row">
                <Calendar size={18} className="gp-detail-icon" />
                <div>
                  <div className="gp-detail-label">Date</div>
                  <div className="gp-detail-value">{cluster.dateStr}</div>
                </div>
              </div>
            </div>

            {/* Tagged People */}
            <div className="gp-inspector-section">
              <h4 className="gp-inspector-heading">People in this memory</h4>
              <div className="gp-inspector-people-list">
                {cluster.people.map((person) => (
                  <div key={person.id} className="gp-inspector-person-chip">
                    <img src={person.avatar} alt={person.name} />
                    <span>{person.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="gp-inspector-section">
              <h4 className="gp-inspector-heading">All Photos ({cluster.photoCount})</h4>
              <div className="gp-thumbnails-grid">
                {cluster.photos.map((p, idx) => (
                  <div
                    key={p.id}
                    className={`gp-thumb-item ${selectedPhotoIndex === idx ? 'selected' : ''}`}
                    onClick={() => setSelectedPhotoIndex(idx)}
                  >
                    <img src={p.url} alt={p.caption} />
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Bar: That's it vs Not this one */}
            <div className="gp-decision-box">
              <h4 className="gp-decision-title">Is this the memory you remember?</h4>

              <div className="gp-decision-buttons">
                <button className="gp-btn-that-sit" onClick={onConfirmSuccess}>
                  <CheckCircle2 size={18} />
                  <span>That's it!</span>
                </button>

                <button className="gp-btn-not-this-one" onClick={onRejectNotThisOne}>
                  <XCircle size={18} />
                  <span>Not this one</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .gp-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          border-radius: inherit;
          overflow: hidden;
        }

        .gp-modal-container {
          background: #FFFFFF;
          border-radius: var(--gp-radius-lg);
          width: 100%;
          height: 94%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: var(--gp-shadow-lg);
        }

        .gp-modal-header {
          padding: 16px 24px;
          border-bottom: 1px solid var(--gp-border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FFFFFF;
        }

        .gp-modal-ai-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--gp-blue-primary);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .gp-modal-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--gp-text-primary);
        }

        .gp-modal-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .gp-modal-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 360px;
          overflow: hidden;
        }

        /* Stage Photo Display */
        .gp-main-photo-stage {
          background: #000000;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .gp-stage-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .gp-stage-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }

        .gp-stage-nav:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        .gp-stage-nav.prev { left: 16px; }
        .gp-stage-nav.next { right: 16px; }

        .gp-photo-caption-bar {
          position: absolute;
          bottom: 0;
          inset-x: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }

        .gp-photo-counter {
          opacity: 0.8;
          font-size: 13px;
        }

        /* Inspector Details Side */
        .gp-modal-inspector {
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: #F8F9FA;
          border-left: 1px solid var(--gp-border-subtle);
        }

        .gp-inspector-heading {
          font-size: 13px;
          font-weight: 600;
          color: var(--gp-text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .gp-inspector-subtitle {
          font-size: 14px;
          color: var(--gp-text-secondary);
        }

        .gp-meta-details-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .gp-detail-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .gp-detail-icon {
          color: var(--gp-blue-primary);
          margin-top: 2px;
        }

        .gp-detail-label {
          font-size: 11px;
          color: var(--gp-text-tertiary);
          text-transform: uppercase;
        }

        .gp-detail-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--gp-text-primary);
        }

        .gp-inspector-people-list {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .gp-inspector-person-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid #DADCE0;
          padding: 6px 12px;
          border-radius: var(--gp-radius-pill);
          font-size: 13px;
          font-weight: 500;
        }

        .gp-inspector-person-chip img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
        }

        .gp-thumbnails-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        .gp-thumb-item {
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.15s ease;
        }

        .gp-thumb-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gp-thumb-item.selected {
          border-color: var(--gp-blue-primary);
          box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.3);
        }

        /* Decision Bar */
        .gp-decision-box {
          margin-top: auto;
          background: #FFFFFF;
          border: 1px solid var(--gp-border);
          border-radius: var(--gp-radius-md);
          padding: 16px;
        }

        .gp-decision-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--gp-text-primary);
          text-align: center;
          margin-bottom: 12px;
        }

        .gp-decision-buttons {
          display: flex;
          gap: 10px;
        }

        .gp-btn-that-sit {
          flex: 1;
          background: var(--gp-blue-primary);
          color: white;
          padding: 12px;
          border-radius: var(--gp-radius-pill);
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s ease;
        }

        .gp-btn-that-sit:hover {
          background: #1557B0;
        }

        .gp-btn-not-this-one {
          flex: 1;
          background: #F1F3F4;
          color: #3C4043;
          padding: 12px;
          border-radius: var(--gp-radius-pill);
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s ease;
        }

        .gp-btn-not-this-one:hover {
          background: #E8EAED;
          color: #D93025;
        }

        @media (max-width: 850px) {
          .gp-modal-body {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};
