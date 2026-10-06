import React from 'react';
import { ArrowLeft, MoreHorizontal, Heart, Image as ImageIcon } from 'lucide-react';
import { CollectionItem, Photo } from '../types';

interface CollectionDetailViewProps {
  collection: CollectionItem;
  onBack: () => void;
  onOpenPhoto: (photo: Photo) => void;
}

export const CollectionDetailView: React.FC<CollectionDetailViewProps> = ({
  collection,
  onBack,
  onOpenPhoto,
}) => {
  return (
    <div className="gp-collection-detail-view animate-fade-in">
      {/* Top Header */}
      <div className="gp-coll-detail-topbar">
        <button className="gp-back-link" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Collections</span>
        </button>
        <button className="gp-icon-btn">
          <MoreHorizontal size={20} color="#5F6368" />
        </button>
      </div>

      {/* Collection Banner Header */}
      <div className="gp-coll-detail-header">
        <h2 className="gp-coll-detail-title">{collection.title}</h2>
        <p className="gp-coll-detail-count">{collection.itemCount} Items</p>
      </div>

      {/* Photo Grid */}
      <div className="gp-coll-detail-grid">
        {collection.photos.map((photo) => (
          <div
            key={photo.id}
            className="gp-coll-photo-item"
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

      <style>{`
        .gp-collection-detail-view {
          min-height: 100vh;
          background: #FFFFFF;
          padding-bottom: 90px;
        }

        .gp-coll-detail-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
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

        .gp-coll-detail-header {
          padding: 20px 16px 12px;
        }

        .gp-coll-detail-title {
          font-size: 24px;
          font-weight: 600;
          color: var(--gp-text-primary);
        }

        .gp-coll-detail-count {
          font-size: 13.5px;
          color: var(--gp-text-secondary);
        }

        .gp-coll-detail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3px;
          padding: 0 16px 24px;
        }

        .gp-coll-photo-item {
          aspect-ratio: 1;
          position: relative;
          cursor: pointer;
          overflow: hidden;
        }

        .gp-coll-photo-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s ease;
        }

        .gp-coll-photo-item:hover img {
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
