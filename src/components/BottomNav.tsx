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
            <ImageIcon size={18} />
          </div>
          <span className="gp-pill-label">Photos</span>
        </button>

        {/* Collections Tab */}
        <button
          className={`gp-nav-pill-btn ${currentTab === 'collections' ? 'active' : ''}`}
          onClick={() => onSelectTab('collections')}
        >
          <div className="gp-pill-icon-wrapper">
            <Layers size={18} />
          </div>
          <span className="gp-pill-label">Collections</span>
        </button>

        {/* Create Tab */}
        <button
          className={`gp-nav-pill-btn ${currentTab === 'create' ? 'active' : ''}`}
          onClick={() => onSelectTab('create')}
        >
          <div className="gp-pill-icon-wrapper">
            <PlusCircle size={18} />
          </div>
          <span className="gp-pill-label">Create</span>
        </button>

        {/* Search / AI Discovery Tab */}
        <button
          className={`gp-nav-search-circle-btn ${currentTab === 'search' ? 'active' : ''}`}
          onClick={() => onSelectTab('search')}
          title="Search & AI Memory Discovery"
        >
          <Search size={18} />
        </button>
      </div>

      <style>{`
        .gp-bottom-nav {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: auto;
          max-width: 95%;
          pointer-events: none;
        }

        .gp-bottom-nav-container {
          pointer-events: auto;
          background: rgba(245, 247, 250, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 32px;
          padding: 4px 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.06);
          box-sizing: border-box;
        }

        .gp-nav-pill-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 9px;
          border-radius: 20px;
          color: #444746;
          font-size: 12.5px;
          font-weight: 500;
          transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
          white-space: nowrap;
          border: none;
          background: transparent;
          cursor: pointer;
          flex-shrink: 0;
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
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          max-width: 40px;
          max-height: 40px;
          flex-shrink: 0;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background: #00639B;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
          box-shadow: 0 2px 8px rgba(0, 99, 155, 0.35);
          padding: 0;
          border: none;
          cursor: pointer;
          margin-left: 2px;
        }

        .gp-nav-search-circle-btn:hover {
          background: #004D7A;
          transform: scale(1.05);
        }

        .gp-nav-search-circle-btn.active {
          background: #00639B;
          color: #FFFFFF;
          box-shadow: 0 0 0 2px #C2E7FF, 0 3px 10px rgba(0, 99, 155, 0.4);
        }

        @media (max-width: 360px) {
          .gp-nav-pill-btn {
            padding: 5px 7px;
            font-size: 11.5px;
            gap: 3px;
          }
        }
      `}</style>
    </nav>
  );
};
