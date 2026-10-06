import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { mockAllPhotos, mockMemoryClusters } from '../data/mockMemories';
import { Photo, MemoryCluster } from '../types';

interface PhotosTabViewProps {
  onOpenPhoto: (photo: Photo) => void;
  onOpenMemoryCluster: (cluster: MemoryCluster) => void;
  onOpenNotifications?: () => void;
  onOpenAccountModal?: () => void;
  onOpenCreateTab?: () => void;
}

export const PhotosTabView: React.FC<PhotosTabViewProps> = ({
  onOpenPhoto,
  onOpenMemoryCluster,
}) => {
  return (
    <div className="gp-photos-tab animate-fade-in">
      {/* 2.1 Memories Open Photos Immediately */}
      <section className="gp-memories-carousel-section">
        <div className="gp-memories-header">
          <Sparkles size={15} color="#00639B" />
          <span>Memories</span>
        </div>
        <div className="gp-memories-cards-scroll">
          {mockMemoryClusters.map((cluster) => (
            <div
              key={cluster.id}
              className="gp-memory-story-card"
              onClick={() => onOpenMemoryCluster(cluster)}
            >
              <img src={cluster.photos[0].url} alt={cluster.title} />
              <div className="gp-story-overlay">
                <h4 className="gp-story-title">{cluster.title}</h4>
                <p className="gp-story-sub">{cluster.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hero Photos Timeline Grid */}
      <section className="gp-timeline-section">
        {/* Group: Today */}
        <div className="gp-timeline-group">
          <h3 className="gp-timeline-date">Today</h3>
          <div className="gp-photo-grid">
            {mockAllPhotos.slice(0, 3).map((photo) => (
              <div
                key={photo.id}
                className="gp-photo-grid-item"
                onClick={() => onOpenPhoto(photo)}
              >
                <img src={photo.url} alt={photo.caption} loading="lazy" />
                {photo.isFavorite && (
                  <div className="gp-fav-badge">
                    <Heart size={14} fill="#FFFFFF" color="#FFFFFF" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Group: December 2024 */}
        <div className="gp-timeline-group">
          <h3 className="gp-timeline-date">December 2024</h3>
          <div className="gp-photo-grid">
            {mockAllPhotos.slice(3, 7).map((photo) => (
              <div
                key={photo.id}
                className="gp-photo-grid-item"
                onClick={() => onOpenPhoto(photo)}
              >
                <img src={photo.url} alt={photo.caption} loading="lazy" />
                {photo.isFavorite && (
                  <div className="gp-fav-badge">
                    <Heart size={14} fill="#FFFFFF" color="#FFFFFF" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Group: October 2024 & Older */}
        <div className="gp-timeline-group">
          <h3 className="gp-timeline-date">October 2024</h3>
          <div className="gp-photo-grid">
            {mockAllPhotos.slice(7).map((photo) => (
              <div
                key={photo.id}
                className="gp-photo-grid-item"
                onClick={() => onOpenPhoto(photo)}
              >
                <img src={photo.url} alt={photo.caption} loading="lazy" />
                {photo.isFavorite && (
                  <div className="gp-fav-badge">
                    <Heart size={14} fill="#FFFFFF" color="#FFFFFF" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .gp-photos-tab {
          padding-bottom: 90px;
        }

        /* Memories Carousel */
        .gp-memories-carousel-section {
          padding: 12px 14px;
        }

        .gp-memories-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 600;
          color: #00639B;
          margin-bottom: 8px;
        }

        .gp-memories-cards-scroll {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .gp-memory-story-card {
          min-width: 135px;
          width: 135px;
          height: 195px;
          border-radius: var(--gp-radius-md);
          overflow: hidden;
          position: relative;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: var(--gp-shadow-subtle);
          transition: transform 0.2s ease;
        }

        .gp-memory-story-card:hover {
          transform: scale(1.02);
        }

        .gp-memory-story-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gp-story-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%);
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: white;
        }

        .gp-story-title {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.2;
        }

        .gp-story-sub {
          font-size: 10.5px;
          opacity: 0.85;
          margin-top: 2px;
        }

        /* Timeline Grid */
        .gp-timeline-section {
          padding: 0 14px 24px;
        }

        .gp-timeline-group {
          margin-bottom: 18px;
        }

        .gp-timeline-date {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--gp-text-primary);
          margin-bottom: 8px;
        }

        .gp-photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3px;
        }

        .gp-photo-grid-item {
          aspect-ratio: 1;
          position: relative;
          cursor: pointer;
          overflow: hidden;
        }

        .gp-photo-grid-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s ease;
        }

        .gp-photo-grid-item:hover img {
          transform: scale(1.04);
        }

        .gp-fav-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          background: rgba(0,0,0,0.4);
          padding: 3px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
