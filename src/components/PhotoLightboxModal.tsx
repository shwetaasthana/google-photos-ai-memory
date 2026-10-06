import React, { useState } from 'react';
import {
  X,
  Heart,
  Share2,
  Trash2,
  Info,
  MapPin,
  Calendar,
  Camera,
  Download,
  ChevronLeft
} from 'lucide-react';
import { Photo } from '../types';

interface PhotoLightboxModalProps {
  photo: Photo;
  onClose: () => void;
  onToggleFavorite: (photoId: string) => void;
  onShare: (caption: string) => void;
  onDelete: (photoId: string) => void;
  isFavorite: boolean;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  photo,
  onClose,
  onToggleFavorite,
  onShare,
  onDelete,
  isFavorite,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="gp-lightbox-backdrop animate-fade-in">
      {/* Top Header Bar */}
      <div className="gp-lightbox-topbar">
        <button className="gp-lb-icon-btn" onClick={onClose} title="Back">
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>

        <div className="gp-lb-topbar-actions">
          <button
            className="gp-lb-icon-btn"
            onClick={() => onToggleFavorite(photo.id)}
            title="Favorite"
          >
            <Heart
              size={20}
              fill={isFavorite ? '#EA4335' : 'none'}
              color={isFavorite ? '#EA4335' : '#FFFFFF'}
            />
          </button>
          <button
            className="gp-lb-icon-btn"
            onClick={() => onShare(photo.caption)}
            title="Share"
          >
            <Share2 size={20} color="#FFFFFF" />
          </button>
          <button
            className="gp-lb-icon-btn"
            onClick={() => setShowInfo(!showInfo)}
            title="Info"
          >
            <Info size={20} color={showInfo ? '#AECBFA' : '#FFFFFF'} />
          </button>
          <button
            className="gp-lb-icon-btn"
            onClick={() => onDelete(photo.id)}
            title="Delete"
          >
            <Trash2 size={20} color="#FFFFFF" />
          </button>
        </div>
      </div>

      {/* Main Image Stage & Info Drawer */}
      <div className="gp-lightbox-stage-grid">
        <div className="gp-lb-image-container">
          <img src={photo.url} alt={photo.caption} className="gp-lb-image" />
          <div className="gp-lb-caption-overlay">{photo.caption}</div>
        </div>

        {/* Info EXIF Pane */}
        {showInfo && (
          <div className="gp-lb-info-pane animate-fade-in">
            <h3 className="gp-info-title">Details</h3>

            <div className="gp-info-item">
              <Calendar size={18} color="#AECBFA" />
              <div>
                <div className="gp-info-label">Date & Time</div>
                <div className="gp-info-val">{photo.dateStr || 'March 16, 2025 · 2:15 PM'}</div>
              </div>
            </div>

            <div className="gp-info-item">
              <MapPin size={18} color="#AECBFA" />
              <div>
                <div className="gp-info-label">Location</div>
                <div className="gp-info-val">{photo.location || 'Hyderabad, India'}</div>
              </div>
            </div>

            <div className="gp-info-item">
              <Camera size={18} color="#AECBFA" />
              <div>
                <div className="gp-info-label">Camera Details</div>
                <div className="gp-info-val">{photo.cameraInfo || 'iPhone 15 Pro · 24mm f/1.78'}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .gp-lightbox-backdrop {
          position: absolute;
          inset: 0;
          background: #000000;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          border-radius: inherit;
          overflow: hidden;
        }

        .gp-lightbox-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
          position: absolute;
          top: 0;
          inset-x: 0;
          z-index: 10;
        }

        .gp-lb-topbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .gp-lb-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.1);
        }

        .gp-lb-icon-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .gp-lightbox-stage-grid {
          flex: 1;
          display: flex;
          overflow: hidden;
          position: relative;
        }

        .gp-lb-image-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .gp-lb-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .gp-lb-caption-overlay {
          position: absolute;
          bottom: 24px;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(8px);
          color: white;
          padding: 8px 18px;
          border-radius: var(--gp-radius-pill);
          font-size: 14px;
        }

        .gp-lb-info-pane {
          width: 300px;
          background: #1F1F1F;
          color: white;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-left: 1px solid rgba(255,255,255,0.1);
        }

        .gp-info-title {
          font-size: 18px;
          font-weight: 600;
        }

        .gp-info-item {
          display: flex;
          gap: 12px;
        }

        .gp-info-label {
          font-size: 11px;
          color: #9AA0A6;
          text-transform: uppercase;
        }

        .gp-info-val {
          font-size: 13.5px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};
