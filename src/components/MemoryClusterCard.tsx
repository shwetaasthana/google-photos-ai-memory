import React from 'react';
import { MapPin, Calendar, Image as ImageIcon, Sparkles, ChevronRight } from 'lucide-react';
import { MemoryCluster } from '../types';

interface MemoryClusterCardProps {
  cluster: MemoryCluster;
  onClick: () => void;
  isHighConfidence?: boolean;
}

export const MemoryClusterCard: React.FC<MemoryClusterCardProps> = ({
  cluster,
  onClick,
  isHighConfidence = false,
}) => {
  const heroPhoto = cluster.photos[0];
  const sidePhotos = cluster.photos.slice(1, 4);
  const remainingCount = cluster.photoCount > 4 ? cluster.photoCount - 4 : 0;

  return (
    <div
      className={`gp-cluster-card animate-fade-in ${isHighConfidence ? 'high-confidence' : ''}`}
      onClick={onClick}
    >
      {/* Header Info */}
      <div className="gp-cluster-header">
        <div className="gp-cluster-title-group">
          <div className="gp-cluster-badge-row">
            <span className="gp-candidate-tag">Candidate Memory</span>
            {isHighConfidence && (
              <span className="gp-confidence-tag">
                <Sparkles size={12} /> High Match
              </span>
            )}
          </div>
          <h3 className="gp-cluster-title">{cluster.title}</h3>
          <p className="gp-cluster-subtitle">{cluster.subtitle}</p>
        </div>
        <button
          className="gp-cluster-arrow"
          title="View memory preview"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <ChevronRight size={20} color="#5F6368" />
        </button>
      </div>

      {/* Photo Collage Grid */}
      <div className="gp-collage-grid">
        <div className="gp-hero-photo">
          <img src={heroPhoto.url} alt={heroPhoto.caption} loading="lazy" />
        </div>

        <div className="gp-side-photos">
          {sidePhotos.map((photo, idx) => {
            const isLast = idx === sidePhotos.length - 1 && remainingCount > 0;

            return (
              <div key={photo.id} className="gp-side-photo-item">
                <img src={photo.url} alt={photo.caption} loading="lazy" />
                {isLast && (
                  <div className="gp-more-photos-overlay">
                    <span>+{remainingCount}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Footer: Metadata & Tagged People */}
      <div className="gp-cluster-footer">
        <div className="gp-cluster-meta">
          <span className="gp-meta-item">
            <MapPin size={14} />
            {cluster.location}
          </span>
          <span className="gp-meta-item">
            <Calendar size={14} />
            {cluster.dateStr}
          </span>
          <span className="gp-meta-item">
            <ImageIcon size={14} />
            {cluster.photoCount} photos
          </span>
        </div>

        <div className="gp-cluster-people">
          {cluster.people.map((person) => (
            <img
              key={person.id}
              src={person.avatar}
              alt={person.name}
              title={person.name}
              className="gp-people-avatar"
            />
          ))}
        </div>
      </div>

      <style>{`
        .gp-cluster-card {
          background: #FFFFFF;
          border: 1px solid var(--gp-border);
          border-radius: var(--gp-radius-lg);
          padding: 20px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.2, 0, 0, 1);
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }

        .gp-cluster-card:hover {
          border-color: #BDC1C6;
          box-shadow: var(--gp-shadow-md);
          transform: translateY(-2px);
        }

        .gp-cluster-card.high-confidence {
          border: 2px solid var(--gp-blue-primary);
          background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%);
        }

        .gp-cluster-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .gp-cluster-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .gp-candidate-tag {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--gp-text-tertiary);
          background: var(--gp-surface-variant);
          padding: 3px 10px;
          border-radius: 12px;
        }

        .gp-confidence-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          color: var(--gp-blue-primary);
          background: #EDF4FC;
          padding: 3px 10px;
          border-radius: 12px;
        }

        .gp-cluster-title {
          font-size: 19px;
          font-weight: 600;
          color: var(--gp-text-primary);
          line-height: 1.3;
        }

        .gp-cluster-subtitle {
          font-size: 14px;
          color: var(--gp-text-secondary);
          margin-top: 2px;
        }

        .gp-cluster-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gp-surface-variant);
          transition: background 0.15s ease;
        }

        .gp-cluster-card:hover .gp-cluster-arrow {
          background: var(--gp-blue-light);
        }

        /* Collage Grid Layout */
        .gp-collage-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 6px;
          border-radius: var(--gp-radius-md);
          overflow: hidden;
          height: 220px;
          margin-bottom: 16px;
          background: #E8EAED;
        }

        .gp-hero-photo {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .gp-hero-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .gp-cluster-card:hover .gp-hero-photo img {
          transform: scale(1.03);
        }

        .gp-side-photos {
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          gap: 6px;
          height: 100%;
        }

        .gp-side-photo-item {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        .gp-side-photo-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gp-more-photos-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          font-weight: 700;
        }

        .gp-cluster-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid var(--gp-border-subtle);
          gap: 12px;
          flex-wrap: wrap;
        }

        .gp-cluster-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .gp-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--gp-text-secondary);
        }

        .gp-cluster-people {
          display: flex;
          align-items: center;
          margin-left: auto;
        }

        .gp-people-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid white;
          margin-left: -8px;
        }

        .gp-people-avatar:first-child {
          margin-left: 0;
        }
      `}</style>
    </div>
  );
};
