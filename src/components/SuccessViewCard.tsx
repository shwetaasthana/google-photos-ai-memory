import React from 'react';
import {
  CheckCircle2,
  Sparkles,
  Heart,
  Share2,
  FolderPlus,
  RotateCcw,
  Images,
  MapPin,
  Calendar
} from 'lucide-react';
import { MemoryCluster } from '../types';

interface SuccessViewCardProps {
  cluster: MemoryCluster;
  onFavoriteToggle: () => void;
  onShare: () => void;
  onAddToAlbum: () => void;
  onSearchAgain: () => void;
  isFavorited: boolean;
}

export const SuccessViewCard: React.FC<SuccessViewCardProps> = ({
  cluster,
  onFavoriteToggle,
  onShare,
  onAddToAlbum,
  onSearchAgain,
  isFavorited,
}) => {
  return (
    <div className="gp-success-card animate-fade-in">
      {/* Banner */}
      <div className="gp-success-banner">
        <div className="gp-success-icon-wrapper">
          <CheckCircle2 size={32} color="#1E8E3E" />
        </div>
        <div>
          <div className="gp-success-ai-tag">
            <Sparkles size={14} /> Memory Recovered
          </div>
          <h2 className="gp-success-heading">This looks like the memory you were looking for!</h2>
          <p className="gp-success-subtext">
            Successfully rediscovered based on your vague recollection clues.
          </p>
        </div>
      </div>

      {/* Featured Preview Box */}
      <div className="gp-success-media-box">
        <div className="gp-success-hero-image">
          <img src={cluster.photos[0].url} alt={cluster.photos[0].caption} />
          <div className="gp-success-photo-count-badge">
            <Images size={14} /> {cluster.photoCount} photos in memory
          </div>
        </div>

        <div className="gp-success-details">
          <h3 className="gp-success-title">{cluster.title}</h3>
          <p className="gp-success-subtitle">{cluster.subtitle}</p>

          <div className="gp-success-meta">
            <span className="gp-meta-row">
              <MapPin size={16} /> {cluster.location}
            </span>
            <span className="gp-meta-row">
              <Calendar size={16} /> {cluster.dateStr}
            </span>
          </div>

          <div className="gp-success-people-strip">
            <span className="gp-people-label">People:</span>
            {cluster.people.map((p) => (
              <span key={p.id} className="gp-person-pill">
                <img src={p.avatar} alt={p.name} />
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="gp-success-actions-row">
        <button
          className={`gp-success-btn ${isFavorited ? 'favorited' : ''}`}
          onClick={onFavoriteToggle}
        >
          <Heart size={18} fill={isFavorited ? '#D93025' : 'none'} color={isFavorited ? '#D93025' : '#3C4043'} />
          <span>{isFavorited ? 'Favorited' : 'Favorite'}</span>
        </button>

        <button className="gp-success-btn" onClick={onShare}>
          <Share2 size={18} color="#3C4043" />
          <span>Share</span>
        </button>

        <button className="gp-success-btn" onClick={onAddToAlbum}>
          <FolderPlus size={18} color="#3C4043" />
          <span>Add to album</span>
        </button>

        <button className="gp-success-btn secondary" onClick={onSearchAgain}>
          <RotateCcw size={18} color="#1A73E8" />
          <span>Search again</span>
        </button>
      </div>

      <style>{`
        .gp-success-card {
          background: #FFFFFF;
          border: 1px solid #CEEAD6;
          border-radius: var(--gp-radius-lg);
          padding: 28px;
          margin-bottom: 24px;
          box-shadow: 0 4px 16px rgba(30, 142, 62, 0.08);
        }

        .gp-success-banner {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }

        .gp-success-icon-wrapper {
          background: #E6F4EA;
          padding: 10px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gp-success-ai-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #137333;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .gp-success-heading {
          font-size: 22px;
          font-weight: 600;
          color: var(--gp-text-primary);
        }

        .gp-success-subtext {
          font-size: 14px;
          color: var(--gp-text-secondary);
        }

        /* Media Box */
        .gp-success-media-box {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 20px;
          background: #F8F9FA;
          border-radius: var(--gp-radius-md);
          padding: 16px;
          margin-bottom: 24px;
        }

        .gp-success-hero-image {
          position: relative;
          height: 180px;
          border-radius: 12px;
          overflow: hidden;
        }

        .gp-success-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gp-success-photo-count-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          color: white;
          font-size: 12px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: var(--gp-radius-pill);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .gp-success-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .gp-success-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--gp-text-primary);
        }

        .gp-success-subtitle {
          font-size: 14px;
          color: var(--gp-text-secondary);
          margin-bottom: 12px;
        }

        .gp-success-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .gp-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: var(--gp-text-secondary);
        }

        .gp-success-people-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .gp-people-label {
          font-size: 13px;
          font-weight: 500;
          color: var(--gp-text-tertiary);
        }

        .gp-person-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: white;
          border: 1px solid #DADCE0;
          padding: 3px 10px 3px 4px;
          border-radius: var(--gp-radius-pill);
          font-size: 12.5px;
          font-weight: 500;
        }

        .gp-person-pill img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          object-fit: cover;
        }

        /* Action Row */
        .gp-success-actions-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .gp-success-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid #DADCE0;
          padding: 10px 18px;
          border-radius: var(--gp-radius-pill);
          font-size: 14px;
          font-weight: 500;
          color: var(--gp-text-primary);
          transition: all 0.2s ease;
        }

        .gp-success-btn:hover {
          background: #F8F9FA;
          border-color: #BDC1C6;
        }

        .gp-success-btn.favorited {
          background: #FCE8E6;
          border-color: #F8D7DA;
          color: #C5221F;
        }

        .gp-success-btn.secondary {
          margin-left: auto;
          background: #EDF4FC;
          border-color: #D3E3FD;
          color: var(--gp-blue-primary);
        }

        .gp-success-btn.secondary:hover {
          background: #D3E3FD;
        }

        @media (max-width: 700px) {
          .gp-success-media-box {
            grid-template-columns: 1fr;
          }
          .gp-success-btn.secondary {
            margin-left: 0;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};
