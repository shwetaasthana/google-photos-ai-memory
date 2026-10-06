import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Image as ImageIcon,
  Heart,
  SlidersHorizontal,
  ChevronRight,
  X,
  Search,
  Filter,
  RotateCcw
} from 'lucide-react';
import { MemoryCluster, Photo, TaggedPerson, ClueChip } from '../types';
import { mockPeople } from '../data/mockMemories';

interface SearchResultsViewProps {
  query: string;
  isSkeletonLoading: boolean;
  resultsCount: number;
  photosList: Photo[];
  clustersList: MemoryCluster[];
  clues: ClueChip[];
  selectedPerson: string | null;
  confidenceMessage: string;
  onBack: () => void;
  onOpenPhoto: (photo: Photo) => void;
  onOpenCluster: (cluster: MemoryCluster) => void;
  onSelectPersonRefinement: (personName: string) => void;
  onSelectRecoveryClue: (clueText: string, filterTag?: string) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  query,
  isSkeletonLoading,
  resultsCount,
  photosList,
  clustersList,
  clues,
  selectedPerson,
  confidenceMessage,
  onBack,
  onOpenPhoto,
  onOpenCluster,
  onSelectPersonRefinement,
  onSelectRecoveryClue,
}) => {
  // Secondary Filtration, Sort & Search State
  const [secondaryInput, setSecondaryInput] = useState('');
  const [appliedSecondary, setAppliedSecondary] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
  const [activeSort, setActiveSort] = useState<'match' | 'newest' | 'oldest'>('match');
  const [isRefining, setIsRefining] = useState(false);

  // Trigger brief loader during AI secondary refinement
  const triggerRefineAnimation = () => {
    setIsRefining(true);
    setTimeout(() => {
      setIsRefining(false);
    }, 180);
  };

  const handleSecondarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secondaryInput.trim()) return;
    setAppliedSecondary(secondaryInput.trim());
    triggerRefineAnimation();
  };

  const handleClearSecondary = () => {
    setSecondaryInput('');
    setAppliedSecondary('');
    triggerRefineAnimation();
  };

  const handleKeywordClick = (label: string) => {
    if (selectedKeyword === label) {
      setSelectedKeyword(null);
    } else {
      setSelectedKeyword(label);
    }
    triggerRefineAnimation();
  };

  const handleToggleQuickFilter = (filterKey: string) => {
    setActiveQuickFilters((prev) =>
      prev.includes(filterKey)
        ? prev.filter((k) => k !== filterKey)
        : [...prev, filterKey]
    );
    triggerRefineAnimation();
  };

  const handleResetAllRefinements = () => {
    setSecondaryInput('');
    setAppliedSecondary('');
    setSelectedKeyword(null);
    setActiveQuickFilters([]);
    setActiveSort('match');
    triggerRefineAnimation();
  };

  // Filtered & Sorted Photos Calculation
  const filteredPhotos = useMemo(() => {
    let list = [...photosList];

    // 1. Keyword filter chip
    if (selectedKeyword) {
      const kw = selectedKeyword.toLowerCase();
      list = list.filter((p) => {
        const cap = p.caption.toLowerCase();
        return cap.includes(kw) || kw.split(' ').some((k) => cap.includes(k));
      });
    }

    // 2. Secondary AI search query input
    if (appliedSecondary.trim()) {
      const sq = appliedSecondary.toLowerCase().trim();
      list = list.filter((p) => {
        const cap = p.caption.toLowerCase();
        if (sq.includes('sunset') || sq.includes('evening')) {
          return cap.includes('sunset') || cap.includes('evening') || cap.includes('cafe') || cap.includes('rooftop');
        }
        if (sq.includes('hemal')) return cap.includes('hemal');
        if (sq.includes('priya')) return cap.includes('priya');
        if (sq.includes('food') || sq.includes('dinner') || sq.includes('lunch')) {
          return cap.includes('brunch') || cap.includes('dinner') || cap.includes('cafe') || cap.includes('food');
        }
        return cap.includes(sq);
      });
    }

    // 3. Quick filters
    if (activeQuickFilters.includes('favorites')) {
      list = list.filter((p) => p.isFavorite);
    }
    if (activeQuickFilters.includes('night')) {
      list = list.filter((p) => {
        const cap = p.caption.toLowerCase();
        return cap.includes('night') || cap.includes('dinner') || cap.includes('evening');
      });
    }
    if (activeQuickFilters.includes('food')) {
      list = list.filter((p) => {
        const cap = p.caption.toLowerCase();
        return cap.includes('food') || cap.includes('cafe') || cap.includes('brunch') || cap.includes('dinner');
      });
    }
    if (activeQuickFilters.includes('hemal')) {
      list = list.filter((p) => p.caption.toLowerCase().includes('hemal'));
    }

    // 4. Sorting logic
    if (activeSort === 'newest') {
      list = [...list].reverse();
    } else if (activeSort === 'oldest') {
      // Keep natural chronological order
    }

    return list;
  }, [photosList, selectedKeyword, appliedSecondary, activeQuickFilters, activeSort]);

  const hasActiveRefinements =
    appliedSecondary.length > 0 ||
    selectedKeyword !== null ||
    activeQuickFilters.length > 0 ||
    activeSort !== 'match';

  return (
    <div className="gp-search-results-fullpage animate-fade-in">
      {/* Dedicated Top Bar */}
      <div className="gp-results-topbar">
        <button className="gp-results-back" onClick={onBack} title="Back to photos">
          <ArrowLeft size={20} />
        </button>

        <div className="gp-results-query-box">
          <Sparkles size={16} color="#1A73E8" />
          <span className="gp-results-query-text">{query || 'Goa Trip 2024'}</span>
        </div>
      </div>

      {/* Main Full-Viewport Content Area */}
      <div className="gp-results-viewport-body">
        {/* Skeleton Loader during search (<300ms) */}
        {isSkeletonLoading ? (
          <div className="gp-skeleton-wrapper animate-fade-in">
            <div className="gp-skeleton-header"></div>
            <div className="gp-skeleton-grid">
              <div className="gp-skeleton-box"></div>
              <div className="gp-skeleton-box"></div>
              <div className="gp-skeleton-box"></div>
              <div className="gp-skeleton-box"></div>
              <div className="gp-skeleton-box"></div>
              <div className="gp-skeleton-box"></div>
            </div>
          </div>
        ) : (
          <>
            {/* 3-PART HEADER SECTION */}
            <div className="gp-results-3part-card">
              {/* Part 1: Heading */}
              <div className="gp-part-heading-row">
                <h2 className="gp-main-heading">Photos</h2>
                {hasActiveRefinements && (
                  <button
                    className="gp-reset-refinements-btn"
                    onClick={handleResetAllRefinements}
                    title="Clear secondary filters"
                  >
                    <RotateCcw size={13} />
                    <span>Reset Filters</span>
                  </button>
                )}
              </div>

              {/* Part 2: Sub-heading */}
              <div className="gp-part-subheading-row">
                <p className="gp-subheading-text">
                  {filteredPhotos.length} photos found · {confidenceMessage}
                  {appliedSecondary && (
                    <span className="gp-refined-badge">
                      ✨ Refined by "{appliedSecondary}"
                    </span>
                  )}
                  {selectedKeyword && (
                    <span className="gp-refined-badge">
                      🏷️ Keyword: {selectedKeyword}
                    </span>
                  )}
                </p>
              </div>

              {/* Part 3: Keywords & Secondary Filtration / Sort / Search */}
              <div className="gp-part-keywords-refinement-area">
                {/* Keywords Row */}
                <div className="gp-keywords-strip">
                  <span className="gp-keywords-label">Keywords:</span>
                  <div className="gp-keywords-chips-flex">
                    {clues.map((c) => {
                      const isSel = selectedKeyword === c.label;
                      return (
                        <button
                          key={c.id}
                          className={`gp-keyword-pill ${isSel ? 'active' : ''}`}
                          onClick={() => handleKeywordClick(c.label)}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary AI Search Input Bar */}
                <form onSubmit={handleSecondarySubmit} className="gp-secondary-search-form">
                  <div className="gp-secondary-input-wrapper">
                    <Sparkles size={15} color="#1A73E8" className="gp-sparkle-inline" />
                    <input
                      type="text"
                      className="gp-secondary-search-input"
                      placeholder="Type details for 2nd filtration (e.g. sunset, food, Hemal)..."
                      value={secondaryInput}
                      onChange={(e) => setSecondaryInput(e.target.value)}
                    />
                    {secondaryInput && (
                      <button
                        type="button"
                        className="gp-secondary-clear-btn"
                        onClick={handleClearSecondary}
                      >
                        <X size={14} color="#5F6368" />
                      </button>
                    )}
                    <button type="submit" className="gp-secondary-submit-btn">
                      Refine
                    </button>
                  </div>
                </form>

                {/* Quick Filters & Sorting Controls */}
                <div className="gp-quick-filters-sort-row">
                  <div className="gp-quick-pills-group">
                    <button
                      className={`gp-filter-pill ${activeQuickFilters.includes('favorites') ? 'selected' : ''}`}
                      onClick={() => handleToggleQuickFilter('favorites')}
                    >
                      ❤️ Favorites
                    </button>
                    <button
                      className={`gp-filter-pill ${activeQuickFilters.includes('night') ? 'selected' : ''}`}
                      onClick={() => handleToggleQuickFilter('night')}
                    >
                      🌙 Night time
                    </button>
                    <button
                      className={`gp-filter-pill ${activeQuickFilters.includes('food') ? 'selected' : ''}`}
                      onClick={() => handleToggleQuickFilter('food')}
                    >
                      🍲 Food
                    </button>
                    <button
                      className={`gp-filter-pill ${activeQuickFilters.includes('hemal') ? 'selected' : ''}`}
                      onClick={() => handleToggleQuickFilter('hemal')}
                    >
                      👤 With Hemal
                    </button>
                  </div>

                  <div className="gp-sort-wrapper">
                    <select
                      className="gp-sort-select"
                      value={activeSort}
                      onChange={(e) => {
                        setActiveSort(e.target.value as any);
                        triggerRefineAnimation();
                      }}
                    >
                      <option value="match">Sort: Best Match</option>
                      <option value="newest">Sort: Newest</option>
                      <option value="oldest">Sort: Oldest</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* HERO ELEMENT: Photos Grid (Refined or Original) */}
            <section className="gp-hero-photos-grid-section">
              {isRefining ? (
                <div className="gp-refine-spinner-box">
                  <Sparkles size={20} className="sparkle-active-icon" />
                  <span>AI refining photos...</span>
                </div>
              ) : filteredPhotos.length === 0 ? (
                <div className="gp-no-refined-results">
                  <p>No photos match your secondary filter combination.</p>
                  <button className="gp-reset-refinement-link" onClick={handleResetAllRefinements}>
                    Reset filters to view all {photosList.length} photos
                  </button>
                </div>
              ) : (
                <div className="gp-photos-full-grid">
                  {filteredPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="gp-hero-photo-item animate-fade-in"
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
              )}
            </section>

            {/* Metadata Summary Row (Dates, Places, People) */}
            <section className="gp-metadata-summary-card">
              <div className="gp-meta-tag">
                <MapPin size={16} color="#00639B" />
                <span>Hyderabad, Jubilee Hills, Banjara Hills</span>
              </div>
              <div className="gp-meta-tag">
                <Calendar size={16} color="#00639B" />
                <span>March 2025 · Dec 2024 · Oct 2024</span>
              </div>
              <div className="gp-meta-people-strip">
                <Users size={16} color="#00639B" />
                <span>People:</span>
                <img src={mockPeople.hemal.avatar} alt="Hemal" title="Hemal" />
                <img src={mockPeople.priya.avatar} alt="Priya" title="Priya" />
                <img src={mockPeople.rahul.avatar} alt="Rahul" title="Rahul" />
              </div>
            </section>

            {/* 6.1 SECONDARY REFINEMENT (Below Photos Results) */}
            <section className="gp-secondary-refinement-card">
              <div className="gp-refine-header">
                <SlidersHorizontal size={16} color="#1A73E8" />
                <span>Need help narrowing results?</span>
              </div>

              <div className="gp-refinement-groups-col">
                {/* Person Filter Chips */}
                <div className="gp-refine-subgroup">
                  <span className="gp-subgroup-label">People:</span>
                  <div className="gp-chips-flex">
                    {['Hemal', 'Priya', 'Rahul', 'Not sure'].map((pName) => {
                      const isSel = selectedPerson?.toLowerCase() === pName.toLowerCase();
                      return (
                        <button
                          key={pName}
                          className={`gp-refine-chip ${isSel ? 'selected' : ''}`}
                          onClick={() => onSelectPersonRefinement(pName)}
                        >
                          {pName}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Attribute Filter Chips */}
                <div className="gp-refine-subgroup">
                  <span className="gp-subgroup-label">Context:</span>
                  <div className="gp-chips-flex">
                    <button
                      className="gp-refine-chip"
                      onClick={() => onSelectRecoveryClue('It was at night', 'night')}
                    >
                      🌙 Night time
                    </button>
                    <button
                      className="gp-refine-chip"
                      onClick={() => onSelectRecoveryClue('There was food', 'food')}
                    >
                      🍲 Dinner & Food
                    </button>
                    <button
                      className="gp-refine-chip"
                      onClick={() => onSelectRecoveryClue('It was a birthday', 'birthday')}
                    >
                      🎂 Birthday
                    </button>
                    <button
                      className="gp-refine-chip"
                      onClick={() => onSelectRecoveryClue('It was outdoors', 'outdoors')}
                    >
                      ☀️ Outdoors
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Candidate Memory Clusters Section */}
            <section className="gp-candidate-clusters-section">
              <h3 className="gp-clusters-section-title">Candidate Memory Clusters</h3>
              <div className="gp-clusters-cards-list">
                {clustersList.map((cluster) => (
                  <div
                    key={cluster.id}
                    className="gp-cluster-summary-card"
                    onClick={() => onOpenCluster(cluster)}
                  >
                    <img src={cluster.photos[0].url} alt={cluster.title} />
                    <div className="gp-cluster-summary-info">
                      <h4>{cluster.title}</h4>
                      <p>{cluster.subtitle}</p>
                      <span className="gp-cluster-photo-cnt">{cluster.photoCount} photos</span>
                    </div>
                    <ChevronRight size={20} color="#5F6368" />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      <style>{`
        .gp-search-results-fullpage {
          min-height: 100vh;
          background: #FFFFFF;
          padding-bottom: 90px;
        }

        .gp-results-topbar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--gp-border-subtle);
          position: sticky;
          top: 0;
          background: white;
          z-index: 50;
        }

        .gp-results-back {
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gp-results-query-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #F4F8FE;
          border: 1px solid #D3E3FD;
          padding: 8px 14px;
          border-radius: var(--gp-radius-pill);
        }

        .gp-results-query-text {
          font-size: 14px;
          font-weight: 500;
          color: #041E49;
        }

        .gp-results-viewport-body {
          padding: 16px;
        }

        /* 3-Part Header Section Container */
        .gp-results-3part-card {
          background: #F8F9FA;
          border: 1px solid #E0E0E0;
          border-radius: var(--gp-radius-md);
          padding: 16px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Part 1: Heading */
        .gp-part-heading-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .gp-main-heading {
          font-size: 24px;
          font-weight: 700;
          color: #202124;
          letter-spacing: -0.3px;
        }

        .gp-reset-refinements-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #FFFFFF;
          border: 1px solid #DADCE0;
          color: #5F6368;
          padding: 4px 10px;
          border-radius: var(--gp-radius-pill);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .gp-reset-refinements-btn:hover {
          background: #F1F3F4;
          color: #202124;
        }

        /* Part 2: Sub-heading */
        .gp-part-subheading-row {
          line-height: 1.4;
        }

        .gp-subheading-text {
          font-size: 13.5px;
          color: #4A4D51;
          font-weight: 400;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
        }

        .gp-refined-badge {
          background: #C2E7FF;
          color: #001D35;
          font-size: 11.5px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 12px;
        }

        /* Part 3: Keywords & Secondary Filtration / Search */
        .gp-part-keywords-refinement-area {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 4px;
        }

        /* Keywords Row */
        .gp-keywords-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .gp-keywords-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #3C4043;
        }

        .gp-keywords-chips-flex {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .gp-keyword-pill {
          background: #E8F0FE;
          border: 1px solid #D3E3FD;
          color: #1967D2;
          padding: 5px 12px;
          border-radius: var(--gp-radius-pill);
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .gp-keyword-pill:hover {
          background: #D2E3FC;
        }

        .gp-keyword-pill.active {
          background: #1967D2;
          color: #FFFFFF;
          border-color: #1967D2;
          font-weight: 600;
        }

        /* Secondary AI Search Form & Input */
        .gp-secondary-search-form {
          width: 100%;
        }

        .gp-secondary-input-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1.5px solid #1A73E8;
          border-radius: var(--gp-radius-pill);
          padding: 4px 6px 4px 12px;
          box-shadow: 0 1px 4px rgba(26,115,232,0.12);
        }

        .gp-sparkle-inline {
          flex-shrink: 0;
        }

        .gp-secondary-search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 13.5px;
          color: #202124;
          background: transparent;
        }

        .gp-secondary-clear-btn {
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .gp-secondary-submit-btn {
          background: #1A73E8;
          color: #FFFFFF;
          border: none;
          padding: 6px 14px;
          border-radius: var(--gp-radius-pill);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease;
          flex-shrink: 0;
        }

        .gp-secondary-submit-btn:hover {
          background: #1557B0;
        }

        /* Quick Filters & Sorting Controls Row */
        .gp-quick-filters-sort-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }

        .gp-quick-pills-group {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .gp-filter-pill {
          background: #FFFFFF;
          border: 1px solid #DADCE0;
          padding: 4px 10px;
          border-radius: var(--gp-radius-pill);
          font-size: 12px;
          font-weight: 500;
          color: #3C4043;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .gp-filter-pill:hover {
          background: #F1F3F4;
          border-color: #BDC1C6;
        }

        .gp-filter-pill.selected {
          background: #E8F0FE;
          border-color: #1A73E8;
          color: #1967D2;
          font-weight: 600;
        }

        .gp-sort-wrapper {
          flex-shrink: 0;
        }

        .gp-sort-select {
          background: #FFFFFF;
          border: 1px solid #DADCE0;
          padding: 4px 8px;
          border-radius: var(--gp-radius-pill);
          font-size: 12px;
          font-weight: 500;
          color: #3C4043;
          outline: none;
          cursor: pointer;
        }

        .gp-refine-spinner-box {
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #1A73E8;
        }

        .gp-no-refined-results {
          padding: 24px 16px;
          text-align: center;
          color: #5F6368;
          font-size: 14px;
        }

        .gp-reset-refinement-link {
          margin-top: 8px;
          color: #1A73E8;
          font-weight: 600;
          text-decoration: underline;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* 7.2 Full Viewport Photos Grid (Hero Content) */
        .gp-hero-photos-grid-section {
          margin-bottom: 20px;
        }

        .gp-photos-full-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          border-radius: var(--gp-radius-md);
          overflow: hidden;
        }

        .gp-hero-photo-item {
          aspect-ratio: 1;
          position: relative;
          cursor: pointer;
          overflow: hidden;
        }

        .gp-hero-photo-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s ease;
        }

        .gp-hero-photo-item:hover img {
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

        /* Metadata Summary Card */
        .gp-metadata-summary-card {
          background: #F8F9FA;
          border: 1px solid var(--gp-border-subtle);
          border-radius: var(--gp-radius-md);
          padding: 14px 16px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .gp-meta-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--gp-text-primary);
          font-weight: 500;
        }

        .gp-meta-people-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--gp-text-secondary);
        }

        .gp-meta-people-strip img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
        }

        /* Secondary Refinement Card (Below Photos) */
        .gp-secondary-refinement-card {
          background: #EDF4FC;
          border: 1px solid #D3E3FD;
          border-radius: var(--gp-radius-md);
          padding: 16px;
          margin-bottom: 24px;
        }

        .gp-refine-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--gp-blue-primary);
          margin-bottom: 12px;
        }

        .gp-refinement-groups-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .gp-refine-subgroup {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .gp-subgroup-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #041E49;
          min-width: 60px;
        }

        .gp-chips-flex {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .gp-refine-chip {
          background: white;
          border: 1px solid #DADCE0;
          padding: 6px 12px;
          border-radius: var(--gp-radius-pill);
          font-size: 13px;
          font-weight: 500;
          color: var(--gp-text-primary);
          transition: all 0.15s ease;
        }

        .gp-refine-chip:hover {
          background: #F8F9FA;
          border-color: var(--gp-blue-primary);
        }

        .gp-refine-chip.selected {
          background: #C2E7FF;
          border-color: #00639B;
          color: #001D35;
          font-weight: 600;
        }

        /* Clusters List */
        .gp-candidate-clusters-section {
          margin-bottom: 24px;
        }

        .gp-clusters-section-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--gp-text-primary);
          margin-bottom: 12px;
        }

        .gp-clusters-cards-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .gp-cluster-summary-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid var(--gp-border);
          padding: 10px;
          border-radius: var(--gp-radius-md);
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .gp-cluster-summary-card:hover {
          background: #F8F9FA;
        }

        .gp-cluster-summary-card img {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          object-fit: cover;
        }

        .gp-cluster-summary-info {
          flex: 1;
        }

        .gp-cluster-summary-info h4 {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--gp-text-primary);
        }

        .gp-cluster-summary-info p {
          font-size: 12.5px;
          color: var(--gp-text-secondary);
        }

        .gp-cluster-photo-cnt {
          font-size: 11px;
          color: var(--gp-blue-primary);
          font-weight: 500;
        }

        /* Skeleton Loaders */
        .gp-skeleton-wrapper {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .gp-skeleton-header {
          height: 32px;
          width: 60%;
          background: #E8EAED;
          border-radius: 8px;
          animation: pulseGlow 1.2s infinite;
        }

        .gp-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
        }

        .gp-skeleton-box {
          aspect-ratio: 1;
          background: #E8EAED;
          border-radius: 6px;
          animation: pulseGlow 1.2s infinite;
        }
      `}</style>
    </div>
  );
};
