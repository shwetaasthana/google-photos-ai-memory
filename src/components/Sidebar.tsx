import React from 'react';
import { Image, Layers, Sparkles, FolderArchive, Trash2, Heart, Users, MapPin } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onResetToIdle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onResetToIdle }) => {
  const navItems = [
    { id: 'photos', label: 'Photos', icon: Image },
    { id: 'collections', label: 'Collections', icon: Layers },
    { id: 'ai-discovery', label: 'AI Discovery', icon: Sparkles, badge: 'New' },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'archive', label: 'Archive', icon: FolderArchive },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  return (
    <aside className="gp-sidebar">
      <nav className="gp-nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`gp-nav-item ${isActive ? 'active' : ''} ${
                item.id === 'ai-discovery' ? 'ai-item' : ''
              }`}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === 'ai-discovery' && onResetToIdle) {
                  onResetToIdle();
                }
              }}
            >
              <div className="gp-nav-icon">
                <Icon size={20} />
              </div>
              <span className="gp-nav-label">{item.label}</span>
              {item.badge && <span className="gp-nav-badge">{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      {/* People & Places Quick Filters */}
      <div className="gp-sidebar-section">
        <h4 className="gp-section-title">Quick Explore</h4>
        <div className="gp-quick-explore-list">
          <div className="gp-quick-chip">
            <Users size={14} />
            <span>People & Pets</span>
          </div>
          <div className="gp-quick-chip">
            <MapPin size={14} />
            <span>Places</span>
          </div>
        </div>
      </div>

      <style>{`
        .gp-sidebar {
          width: 240px;
          background: #ffffff;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          border-right: 1px solid var(--gp-border-subtle);
          flex-shrink: 0;
          min-height: calc(100vh - 65px);
        }

        .gp-nav-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .gp-nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 18px;
          border-radius: var(--gp-radius-pill);
          color: #3C4043;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.15s ease;
          width: 100%;
          text-align: left;
        }

        .gp-nav-item:hover {
          background-color: var(--gp-surface-variant);
        }

        .gp-nav-item.active {
          background-color: var(--gp-blue-light);
          color: #001D35;
          font-weight: 600;
        }

        .gp-nav-item.ai-item {
          color: #00639B;
        }

        .gp-nav-item.ai-item.active {
          background-color: #D3E3FD;
          color: #041E49;
        }

        .gp-nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gp-nav-badge {
          margin-left: auto;
          background: #00639B;
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 10px;
        }

        .gp-sidebar-section {
          padding-top: 12px;
          border-top: 1px solid var(--gp-border-subtle);
        }

        .gp-section-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--gp-text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          padding-left: 12px;
        }

        .gp-quick-explore-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .gp-quick-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          color: var(--gp-text-secondary);
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .gp-quick-chip:hover {
          background-color: var(--gp-surface-variant);
          color: var(--gp-text-primary);
        }

        @media (max-width: 900px) {
          .gp-sidebar {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
};
