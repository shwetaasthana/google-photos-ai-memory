import React, { useState } from 'react';
import { Search, Sparkles, Plus, Bell, X, RotateCcw } from 'lucide-react';
import { AppStage } from '../types';

interface NavbarProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  appStage: AppStage;
  onReset: () => void;
  onOpenNotifications?: () => void;
  onOpenAccountModal?: () => void;
  onOpenCreateTab?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  query,
  setQuery,
  onSearch,
  appStage,
  onReset,
  onOpenNotifications,
  onOpenAccountModal,
  onOpenCreateTab,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetQuery = query.trim() || 'Cafe in Hyderabad with friends';
    if (!query.trim()) {
      setQuery(targetQuery);
    }
    onSearch(targetQuery);
  };

  return (
    <header className="gp-header">
      {/* Single Clean Google Photos Logo Title */}
      <div className="gp-brand" onClick={onReset} title="Google Photos home">
        <svg className="gp-logo" viewBox="0 0 48 48" width="24" height="24">
          <path fill="#EA4335" d="M24 12c0-6.627 5.373-12 12-12v12H24z" />
          <path fill="#4285F4" d="M36 24c6.627 0 12 5.373 12 12H36V24z" />
          <path fill="#34A853" d="M24 36c0 6.627-5.373 12-12 12V36h12z" />
          <path fill="#FBBC05" d="M12 24c-6.627 0-12-5.373-12-12h12v12z" />
        </svg>
        <span className="gp-brand-name">
          Google <span className="gp-brand-sub">Photos</span>
        </span>
      </div>

      {/* Compact Search Bar */}
      <form
        onSubmit={handleSubmit}
        className={`gp-search-container ${isFocused ? 'focused' : ''} ${
          appStage !== 'idle' ? 'active-search' : ''
        }`}
      >
        <div className="gp-search-icon-left">
          {appStage !== 'idle' ? (
            <Sparkles className="sparkle-active-icon" size={16} />
          ) : (
            <Search size={16} color="#5F6368" />
          )}
        </div>
        <input
          type="text"
          className="gp-search-input"
          placeholder="Search photos, people, places..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {query && (
          <button
            type="button"
            className="gp-search-clear"
            onClick={() => {
              setQuery('');
              if (appStage !== 'idle') onReset();
            }}
          >
            <X size={14} color="#5F6368" />
          </button>
        )}
      </form>

      {/* Right Actions & Profile */}
      <div className="gp-header-actions">
        {appStage !== 'idle' && (
          <button className="gp-action-pill" onClick={onReset} title="Reset Discovery">
            <RotateCcw size={14} />
            <span className="gp-action-pill-text">Reset</span>
          </button>
        )}

        {/* Create (+) CTA */}
        {onOpenCreateTab && (
          <button
            className="gp-nav-icon-btn"
            onClick={onOpenCreateTab}
            title="Create"
            type="button"
          >
            <Plus size={19} color="#444746" />
          </button>
        )}

        {/* Notifications (Bell with Badge) */}
        {onOpenNotifications && (
          <button
            className="gp-nav-icon-btn relative"
            onClick={onOpenNotifications}
            title="Updates & Notifications"
            type="button"
          >
            <Bell size={19} color="#444746" />
            <span className="gp-notif-dot">1</span>
          </button>
        )}

        {/* User Profile Avatar */}
        <div
          className="gp-user-avatar"
          onClick={onOpenAccountModal}
          title="Google Account: Alex Chen"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="Alex Chen"
          />
        </div>
      </div>

      <style>{`
        .gp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: #ffffff;
          border-bottom: 1px solid var(--gp-border-subtle);
          position: sticky;
          top: 0;
          z-index: 100;
          gap: 12px;
          height: 52px;
        }

        .gp-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          user-select: none;
          flex-shrink: 0;
        }

        .gp-brand-name {
          font-size: 18px;
          font-weight: 500;
          color: #3C4043;
          letter-spacing: -0.3px;
        }

        .gp-brand-sub {
          font-weight: 400;
          color: #5F6368;
        }

        .gp-search-container {
          flex: 1;
          max-width: 480px;
          display: flex;
          align-items: center;
          background-color: var(--gp-surface-variant);
          border-radius: var(--gp-radius-pill);
          padding: 2px 4px 2px 12px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          height: 38px;
        }

        .gp-search-container.focused {
          background-color: #ffffff;
          box-shadow: 0 1px 6px rgba(32,33,36,0.28);
          border-color: #DADCE0;
        }

        .gp-search-container.active-search {
          border: 1px solid #1A73E8;
          background-color: #F4F8FE;
        }

        .gp-search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 14px;
          color: var(--gp-text-primary);
          padding: 6px 8px;
          outline: none;
        }

        .gp-search-clear {
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sparkle-active-icon {
          color: var(--gp-blue-primary);
          animation: pulseGlow 2s infinite;
        }

        .gp-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .gp-action-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #EDF4FC;
          color: var(--gp-blue-primary);
          padding: 4px 10px;
          border-radius: var(--gp-radius-pill);
          font-size: 12px;
          font-weight: 500;
        }

        .gp-user-avatar {
          width: 32px;
          height: 32px;
          cursor: pointer;
        }

        .gp-user-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #DADCE0;
        }

        .gp-nav-icon-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.15s ease;
          position: relative;
        }

        .gp-nav-icon-btn:hover {
          background: #F1F3F4;
        }

        .gp-notif-dot {
          position: absolute;
          top: 1px;
          right: 1px;
          background: #D93025;
          color: white;
          font-size: 9px;
          font-weight: bold;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid white;
        }

        @media (max-width: 500px) {
          .gp-brand-name {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
