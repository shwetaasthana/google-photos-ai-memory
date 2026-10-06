import React, { useState, useRef } from 'react';
import { Search, Sparkles, Clock, MapPin, Users, ChevronRight, X } from 'lucide-react';
import {
  recentSearchesList,
  suggestedSearchCategories,
  mockPlacesList,
  mockPeople
} from '../data/mockMemories';
import { TaggedPerson } from '../types';

interface SearchTabViewProps {
  onExecuteSearch: (query: string) => void;
  onSelectPerson: (person: TaggedPerson) => void;
}

export const SearchTabView: React.FC<SearchTabViewProps> = ({
  onExecuteSearch,
  onSelectPerson,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allSuggestions = [
    { title: 'College days with Friends', tag: 'Suggested query' },
    { title: 'Cafe in Hyderabad with friends', tag: 'Suggested query' },
    { title: 'Goa Trip 2024', tag: 'Recent search' },
    { title: 'Birthday Party rooftop', tag: 'Recent search' },
    { title: 'Banff Mountain lakes', tag: 'Recent search' },
    { title: 'Screenshots & Tickets', tag: 'Collection' },
  ];

  const filteredSuggestions = searchInput.trim()
    ? allSuggestions.filter((item) =>
        item.title.toLowerCase().includes(searchInput.trim().toLowerCase())
      )
    : allSuggestions;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setIsDropdownOpen(false);
      onExecuteSearch(searchInput.trim());
    }
  };

  const handleSelectSuggestion = (suggestionTitle: string) => {
    setSearchInput(suggestionTitle);
    setIsDropdownOpen(false);
    onExecuteSearch(suggestionTitle);
  };

  // Requirement 3: Click "Try Ask Photos" -> Focus search box cleanly, NO autoselected data!
  const handleTryAskPhotosClick = () => {
    setSearchInput('');
    setIsDropdownOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="gp-search-tab-page animate-fade-in">
      {/* 5.1 Dedicated Search Input Box at Top with Auto-Suggestion Dropdown */}
      <div className="gp-search-input-header">
        <h2 className="gp-search-page-title">Search</h2>

        <div className="gp-search-input-relative-wrapper">
          <form onSubmit={handleSubmit} className="gp-dedicated-search-box">
            <Search size={18} color="#5F6368" />
            <input
              ref={inputRef}
              type="text"
              className="gp-dedicated-input"
              placeholder="Search your photos, places, people, memories"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />
            {searchInput && (
              <button
                type="button"
                className="gp-clear-search-btn"
                onClick={() => setSearchInput('')}
              >
                <X size={14} color="#5F6368" />
              </button>
            )}
            <button type="submit" className="gp-dedicated-search-btn">
              Search
            </button>
          </form>

          {/* Requirement 2: Auto-Suggestion Dropdown Menu */}
          {isDropdownOpen && filteredSuggestions.length > 0 && (
            <div className="gp-search-suggestions-dropdown animate-fade-in">
              <div className="gp-dropdown-label">Search Suggestions</div>
              {filteredSuggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="gp-suggestion-item"
                  onClick={() => handleSelectSuggestion(item.title)}
                >
                  <Search size={15} color="#5F6368" />
                  <span className="gp-sugg-title">{item.title}</span>
                  <span className="gp-sugg-tag">{item.tag}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Requirement 3: Compact Ask Photos Banner (Clean focus, no data autoselected!) */}
      <div
        className="gp-ask-photos-compact-banner"
        onClick={handleTryAskPhotosClick}
      >
        <div className="gp-compact-sparkle-bg">
          <Sparkles size={20} className="sparkle-anim" />
        </div>
        <div className="gp-compact-banner-text">
          <div className="gp-compact-tag">✨ Ask Photos</div>
          <h3 className="gp-compact-title">Search your memories naturally with Gemini</h3>
          <p className="gp-compact-desc">Type any memory prompt to start searching.</p>
        </div>
        <button className="gp-compact-action-btn">Try Ask Photos</button>
      </div>

      {/* Rich Discovery Content below AI banner */}

      {/* Recent Searches */}
      <section className="gp-discovery-section">
        <h3 className="gp-disc-heading">Recent Searches</h3>
        <div className="gp-recent-searches-list">
          {recentSearchesList.map((item, idx) => (
            <button
              key={idx}
              className="gp-recent-search-row"
              onClick={() => handleSelectSuggestion(item)}
            >
              <Clock size={16} color="#5F6368" />
              <span>{item}</span>
            </button>
          ))}
        </div>
      </section>

      {/* People & Pets */}
      <section className="gp-discovery-section">
        <div className="gp-disc-header-row">
          <h3 className="gp-disc-heading">People & Pets</h3>
          <ChevronRight size={18} color="#5F6368" />
        </div>

        <div className="gp-people-scroll-row">
          {Object.values(mockPeople).map((person) => (
            <div
              key={person.id}
              className="gp-person-bubble-item"
              onClick={() => onSelectPerson(person)}
            >
              <img src={person.avatar} alt={person.name} />
              <span>{person.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Places */}
      <section className="gp-discovery-section">
        <div className="gp-disc-header-row">
          <h3 className="gp-disc-heading">Places</h3>
          <ChevronRight size={18} color="#5F6368" />
        </div>

        <div className="gp-places-grid">
          {mockPlacesList.map((place) => (
            <div
              key={place.id}
              className="gp-place-card"
              onClick={() => handleSelectSuggestion(place.name)}
            >
              <img src={place.imageUrl} alt={place.name} />
              <div className="gp-place-overlay">
                <h4>{place.name}</h4>
                <p>{place.count} photos</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Searches */}
      <section className="gp-discovery-section">
        <h3 className="gp-disc-heading">Suggested Searches</h3>
        <div className="gp-suggested-categories-grid">
          {suggestedSearchCategories.map((cat, idx) => (
            <button
              key={idx}
              className="gp-suggested-cat-chip"
              onClick={() => handleSelectSuggestion(cat.query)}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      <style>{`
        .gp-search-tab-page {
          padding: 16px 16px 90px;
        }

        .gp-search-input-header {
          margin-bottom: 16px;
        }

        .gp-search-page-title {
          font-size: 24px;
          font-weight: 600;
          color: var(--gp-text-primary);
          margin-bottom: 12px;
        }

        .gp-search-input-relative-wrapper {
          position: relative;
        }

        .gp-dedicated-search-box {
          display: flex;
          align-items: center;
          background: #F1F3F4;
          border-radius: var(--gp-radius-pill);
          padding: 4px 6px 4px 14px;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .gp-dedicated-search-box:focus-within {
          background: #FFFFFF;
          border-color: #DADCE0;
          box-shadow: 0 1px 6px rgba(0,0,0,0.12);
        }

        .gp-dedicated-input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 8px 10px;
          font-size: 14px;
          outline: none;
          color: var(--gp-text-primary);
        }

        .gp-clear-search-btn {
          padding: 4px;
          margin-right: 4px;
        }

        .gp-dedicated-search-btn {
          background: var(--gp-blue-primary);
          color: white;
          font-weight: 500;
          font-size: 13px;
          padding: 6px 14px;
          border-radius: var(--gp-radius-pill);
        }

        /* Auto-Suggestion Dropdown Menu */
        .gp-search-suggestions-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #FFFFFF;
          border: 1px solid #DADCE0;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          z-index: 100;
          overflow: hidden;
          padding: 8px 0;
        }

        .gp-dropdown-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--gp-text-tertiary);
          text-transform: uppercase;
          padding: 6px 16px;
          letter-spacing: 0.5px;
        }

        .gp-suggestion-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .gp-suggestion-item:hover {
          background: #F1F3F4;
        }

        .gp-sugg-title {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--gp-text-primary);
          flex: 1;
        }

        .gp-sugg-tag {
          font-size: 11px;
          color: var(--gp-text-secondary);
          background: #F8F9FA;
          padding: 2px 8px;
          border-radius: 8px;
        }

        /* Compact Banner */
        .gp-ask-photos-compact-banner {
          background: linear-gradient(135deg, #EDF4FC 0%, #D3E3FD 100%);
          border: 1px solid #AECBFA;
          border-radius: var(--gp-radius-md);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          margin-bottom: 24px;
          transition: transform 0.2s ease;
        }

        .gp-ask-photos-compact-banner:hover {
          transform: translateY(-1px);
        }

        .gp-compact-sparkle-bg {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gp-blue-primary);
          flex-shrink: 0;
        }

        .gp-compact-banner-text {
          flex: 1;
        }

        .gp-compact-tag {
          font-size: 11px;
          font-weight: 700;
          color: var(--gp-blue-primary);
          text-transform: uppercase;
        }

        .gp-compact-title {
          font-size: 15px;
          font-weight: 600;
          color: #041E49;
          line-height: 1.25;
        }

        .gp-compact-desc {
          font-size: 12.5px;
          color: #3C4043;
        }

        .gp-compact-action-btn {
          background: var(--gp-blue-primary);
          color: white;
          font-weight: 600;
          font-size: 12.5px;
          padding: 6px 12px;
          border-radius: var(--gp-radius-pill);
          white-space: nowrap;
        }

        /* Sections */
        .gp-discovery-section {
          margin-bottom: 22px;
        }

        .gp-disc-heading {
          font-size: 16px;
          font-weight: 600;
          color: var(--gp-text-primary);
          margin-bottom: 10px;
        }

        .gp-disc-header-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 10px;
          cursor: pointer;
        }

        /* Recent Searches */
        .gp-recent-searches-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .gp-recent-search-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13.5px;
          color: var(--gp-text-primary);
          text-align: left;
          transition: background 0.15s ease;
        }

        .gp-recent-search-row:hover {
          background: #F1F3F4;
        }

        /* People Row */
        .gp-people-scroll-row {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .gp-person-bubble-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .gp-person-bubble-item img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .gp-person-bubble-item span {
          font-size: 12px;
          font-weight: 500;
        }

        /* Places Grid */
        .gp-places-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .gp-place-card {
          position: relative;
          height: 90px;
          border-radius: var(--gp-radius-md);
          overflow: hidden;
          cursor: pointer;
        }

        .gp-place-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gp-place-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%);
          padding: 8px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: white;
        }

        .gp-place-overlay h4 {
          font-size: 13px;
          font-weight: 600;
        }

        .gp-place-overlay p {
          font-size: 11px;
          opacity: 0.85;
        }

        /* Suggested Categories Chips */
        .gp-suggested-categories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .gp-suggested-cat-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #F1F3F4;
          padding: 10px 14px;
          border-radius: var(--gp-radius-pill);
          font-size: 13px;
          font-weight: 500;
          color: var(--gp-text-primary);
          transition: background 0.15s ease;
        }

        .gp-suggested-cat-chip:hover {
          background: #E8EAED;
        }
      `}</style>
    </div>
  );
};
