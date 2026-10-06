import React from 'react';
import { ChevronRight } from 'lucide-react';
import { mockCollections, mockAlbums, mockPeople } from '../data/mockMemories';
import { Album, TaggedPerson, CollectionItem } from '../types';

interface CollectionsTabViewProps {
  onOpenCollection: (collection: CollectionItem) => void;
  onOpenAlbum: (album: Album) => void;
  onSelectPersonFilter: (person: TaggedPerson) => void;
}

export const CollectionsTabView: React.FC<CollectionsTabViewProps> = ({
  onOpenCollection,
  onOpenAlbum,
  onSelectPersonFilter,
}) => {
  return (
    <div className="gp-collections-tab animate-fade-in">
      {/* Auto-Generated Visual Collections Grid (2x2 Thumbnails) */}
      <section className="gp-collections-section">
        <h3 className="gp-coll-section-title main">Auto-Generated Collections</h3>

        <div className="gp-visual-collections-grid">
          {mockCollections.map((coll) => (
            <div
              key={coll.id}
              className="gp-visual-coll-card"
              onClick={() => onOpenCollection(coll)}
            >
              {/* 2x2 Thumbnail Grid */}
              <div className="gp-coll-thumb-grid">
                {coll.thumbnails.map((url, idx) => (
                  <img key={idx} src={url} alt={coll.title} />
                ))}
              </div>

              <div className="gp-coll-card-info">
                <h4 className="gp-coll-card-title">{coll.title}</h4>
                <p className="gp-coll-card-count">{coll.itemCount} Items</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Albums Section */}
      <section className="gp-collections-section">
        <div className="gp-section-header-row">
          <h3 className="gp-coll-section-title">Albums</h3>
          <ChevronRight size={18} color="#5F6368" />
        </div>

        <div className="gp-albums-horizontal-scroll">
          {mockAlbums.map((album) => (
            <div
              key={album.id}
              className="gp-album-poster-card"
              onClick={() => onOpenAlbum(album)}
            >
              <img src={album.coverUrl} alt={album.title} />
              <div className="gp-album-poster-overlay">
                <span className="gp-poster-subtitle">{album.subtitle}</span>
                <h4 className="gp-poster-title">{album.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* People & Pets Section */}
      <section className="gp-collections-section">
        <div className="gp-section-header-row">
          <h3 className="gp-coll-section-title">People & pets</h3>
          <ChevronRight size={18} color="#5F6368" />
        </div>

        <div className="gp-people-horizontal-scroll">
          {Object.values(mockPeople).map((person) => (
            <div
              key={person.id}
              className="gp-person-bubble-item"
              onClick={() => onSelectPersonFilter(person)}
            >
              <img src={person.avatar} alt={person.name} />
              <span className="gp-person-bubble-name">{person.name}</span>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .gp-collections-tab {
          padding: 16px 16px 90px;
        }

        .gp-collections-section {
          margin-bottom: 24px;
        }

        .gp-section-header-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 12px;
          cursor: pointer;
        }

        .gp-coll-section-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--gp-text-primary);
        }

        .gp-coll-section-title.main {
          margin-bottom: 14px;
        }

        /* 2x2 Thumbnail Collection Cards Grid */
        .gp-visual-collections-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .gp-visual-coll-card {
          background: #F8F9FA;
          border: 1px solid var(--gp-border-subtle);
          border-radius: var(--gp-radius-md);
          padding: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .gp-visual-coll-card:hover {
          background: #F1F3F4;
          transform: translateY(-2px);
          box-shadow: var(--gp-shadow-subtle);
        }

        .gp-coll-thumb-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          border-radius: 10px;
          overflow: hidden;
          height: 110px;
          margin-bottom: 8px;
        }

        .gp-coll-thumb-grid img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gp-coll-card-info {
          padding: 2px 4px;
        }

        .gp-coll-card-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--gp-text-primary);
        }

        .gp-coll-card-count {
          font-size: 12px;
          color: var(--gp-text-secondary);
        }

        /* Albums Horizontal Scroll */
        .gp-albums-horizontal-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .gp-album-poster-card {
          width: 130px;
          height: 180px;
          border-radius: var(--gp-radius-md);
          overflow: hidden;
          position: relative;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: var(--gp-shadow-subtle);
          transition: transform 0.2s ease;
        }

        .gp-album-poster-card:hover {
          transform: translateY(-2px);
        }

        .gp-album-poster-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gp-album-poster-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%);
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: white;
        }

        .gp-poster-subtitle {
          font-size: 10px;
          text-transform: uppercase;
          opacity: 0.8;
        }

        .gp-poster-title {
          font-size: 14px;
          font-weight: 700;
          line-height: 1.2;
        }

        /* People Circles */
        .gp-people-horizontal-scroll {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .gp-person-bubble-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .gp-person-bubble-item img {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .gp-person-bubble-name {
          font-size: 12px;
          font-weight: 500;
          color: var(--gp-text-primary);
        }
      `}</style>
    </div>
  );
};
