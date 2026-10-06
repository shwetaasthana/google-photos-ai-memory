import React from 'react';
import { Image as ImageIcon, Layers, PlusCircle, Search } from 'lucide-react';
import { AppTab } from '../types';

interface BottomNavProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="gp-bottom-nav">
      <div className="gp-bottom-nav-container">
        {/* Photos Tab */}
        <button
          className={`gp-nav-pill-btn ${currentTab === 'photos' ? 'active' : ''}`}
          onClick={() => onSelectTab('photos')}
        >
          <div className="gp-pill-icon-wrapper">
            <ImageIcon size={20} />
          </div>
          <span className="gp-pill-label">Photos</span>
        </button>

        {/* Collections Tab */}
        <button
          className={`gp-nav-pill-btn ${currentTab === 'collections' ? 'active' : ''}`}
          onClick={() => onSelectTab('collections')}
        >
          <div className="gp-pill-icon-wrapper">
            <Layers size={20} />
          </div>
          <span className="gp-pill-label">Collections</span>
        </button>

        {/* Create Tab */}
        <button
          className={`gp-nav-pill-btn ${currentTab === 'create' ? 'active' : ''}`}
          onClick={() => onSelectTab('create')}
        >
          <div className="gp-pill-icon-wrapper">
            <PlusCircle size={20} />
          </div>
          <span className="gp-pill-label">Create</span>
        </button>

        {/* Search / AI Discovery Tab */}
        <button
          className={`gp-nav-search-circle-btn ${currentTab === 'search' ? 'active' : ''}`}
          onClick={() => onSelectTab('search')}
          title="Search & AI Memory Discovery"
        >
          <Search size={20} />
        </button>
      </div>

      <style>{`
        .gp-bottom-nav {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: calc(100% - 24px);
          max-width: 388px;
        }

        .gp-bottom-nav-container {
          background: rgba(241, 243, 244, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: var(--gp-radius-pill);
          padding: 5px 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
          box-shadow: 0 4px 22px rgba(0, 0, 0, 0.16);
        }

        .gp-nav-pill-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 10px;
          border-radius: var(--gp-radius-pill);
          color: #444746;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
          white-space: nowrap;
          flex-shrink: 1;
        }

        .gp-nav-pill-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .gp-nav-pill-btn.active {
          background: #C2E7FF;
          color: #001D35;
          font-weight: 600;
        }

        .gp-pill-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .gp-nav-search-circle-btn {
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          max-width: 44px;
          max-height: 44px;
          flex-shrink: 0;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background: #E3E3E3;
          color: #1F1F1F;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          padding: 0;
          border: none;
          cursor: pointer;
        }

        .gp-nav-search-circle-btn:hover {
          background: #D6D6D6;
          transform: scale(1.05);
        }

        .gp-nav-search-circle-btn.active {
          background: #00639B;
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(0, 99, 155, 0.35);
        }

        @media (max-width: 360px) {
          .gp-nav-pill-btn {
            padding: 6px 8px;
            font-size: 12px;
          }
          .gp-pill-label {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};
