import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { PhotosTabView } from './components/PhotosTabView';
import { CollectionsTabView } from './components/CollectionsTabView';
import { CollectionDetailView } from './components/CollectionDetailView';
import { CreateTabView } from './components/CreateTabView';
import { SearchTabView } from './components/SearchTabView';
import { SearchResultsView } from './components/SearchResultsView';
import { UpdatesView } from './components/UpdatesView';
import { AccountModal } from './components/AccountModal';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { MemoryPreviewModal } from './components/MemoryPreviewModal';
import { RecoveryFlowCard } from './components/RecoveryFlowCard';
import { SuccessViewCard } from './components/SuccessViewCard';
import { Toast } from './components/Toast';
import {
  AppStage,
  AppTab,
  ClueChip,
  MemoryCluster,
  Photo,
  CollectionItem,
  TaggedPerson
} from './types';
import {
  mockMemoryClusters,
  initialExtractedClues,
  mockAllPhotos,
  mockCollections
} from './data/mockMemories';
import { extractKeywordsFromPrompt } from './utils/keywordExtractor';
import { Sparkles, Smartphone, Monitor } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & View Mode State
  const [currentTab, setCurrentTab] = useState<AppTab>('photos');
  const [subScreen, setSubScreen] = useState<
    null | 'updates' | 'account' | 'lightbox' | 'collection-detail' | 'search-results' | 'memory-preview' | 'recovery' | 'success'
  >(null);
  const [phoneFrameMode, setPhoneFrameMode] = useState<boolean>(true);

  // Search & Discovery State
  const [query, setQuery] = useState<string>('');
  const [isSkeletonLoading, setIsSkeletonLoading] = useState<boolean>(false);
  const [clues, setClues] = useState<ClueChip[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [activeCluster, setActiveCluster] = useState<MemoryCluster | null>(null);
  const [matchedClusters, setMatchedClusters] = useState<MemoryCluster[]>([...mockMemoryClusters]);
  const [confidenceMessage, setConfidenceMessage] = useState<string>(
    'Showing results matching your query'
  );

  // Collections & Photo Lightbox State
  const [selectedCollection, setSelectedCollection] = useState<CollectionItem | null>(null);
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const [favoritedPhotoIds, setFavoritedPhotoIds] = useState<Set<string>>(
    new Set(['p-1', 'p-3', 'p-4', 'p-6', 'p-7', 'p-9', 'p-10'])
  );
  const [favoritedClusterIds, setFavoritedClusterIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Requirement 1: Execute search with DYNAMIC KEYWORD EXTRACTION from exact user prompt
  const handleExecuteSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setSubScreen('search-results');
    setIsSkeletonLoading(true);

    // Extract dynamic clue chips from the exact prompt entered by the user
    const dynamicClues = extractKeywordsFromPrompt(searchQuery);

    setTimeout(() => {
      setIsSkeletonLoading(false);
      setClues(dynamicClues.length > 0 ? dynamicClues : [...initialExtractedClues]);
      setSelectedPerson(null);

      // Re-rank/filter mock clusters based on query content
      const lower = searchQuery.toLowerCase();
      if (lower.includes('college') || lower.includes('campus')) {
        setMatchedClusters([
          {
            id: 'college-memories',
            title: 'College Days & Reunion · May 2024',
            subtitle: 'Campus grounds, cafeteria & group photos with friends',
            dateStr: 'Saturday, May 18, 2024',
            location: 'University Campus, Hyderabad',
            neighborhood: 'Campus',
            photoCount: 12,
            people: [mockMemoryClusters[0].people[0], mockMemoryClusters[0].people[1]],
            tags: ['college', 'friends', 'group', 'campus'],
            photos: [
              {
                id: 'col-1',
                url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
                caption: 'Group of college friends hanging out near campus quad',
              },
              {
                id: 'col-2',
                url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
                caption: 'Study session at university library cafe',
              },
              {
                id: 'col-3',
                url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
                caption: 'College festival night celebration',
              }
            ]
          },
          ...mockMemoryClusters
        ]);
      } else {
        setMatchedClusters([...mockMemoryClusters]);
      }

      setConfidenceMessage(`Showing photos matching "${searchQuery}"`);
    }, 280);
  };

  // Refinement Person Selection
  const handleSelectPersonRefinement = (personName: string) => {
    setSelectedPerson(personName);

    if (personName.toLowerCase() === 'not sure') {
      setMatchedClusters([...mockMemoryClusters]);
      setConfidenceMessage('Showing all candidate memories');
      return;
    }

    let updated = mockMemoryClusters.filter((c) =>
      c.people.some((p) => p.name.toLowerCase() === personName.toLowerCase())
    );

    if (personName.toLowerCase() === 'hemal') {
      const jubilee = updated.find((c) => c.id === 'jubilee-hills-mar-2025');
      const rooftop = updated.find((c) => c.id === 'hyderabad-oct-2024');
      const gachibowli = updated.find((c) => c.id === 'gachibowli-jan-2025');

      const reordered: MemoryCluster[] = [];
      if (jubilee) reordered.push({ ...jubilee, matchedScore: 98 });
      if (rooftop) reordered.push({ ...rooftop, matchedScore: 92 });
      if (gachibowli) reordered.push({ ...gachibowli, matchedScore: 85 });
      updated = reordered;
    }

    if (!clues.some((c) => c.label.toLowerCase() === personName.toLowerCase())) {
      setClues((prev) => [
        ...prev,
        {
          id: `person-${Date.now()}`,
          label: personName,
          category: 'person',
          isAutoExtracted: false,
        },
      ]);
    }

    setMatchedClusters(updated);
    setConfidenceMessage(
      `Filtered to ${updated.length} memories matching ${personName}.`
    );
  };

  // Recovery Clue Selection
  const handleSelectRecoveryClue = (clueText: string, filterTag?: string) => {
    setIsSkeletonLoading(true);

    setTimeout(() => {
      setIsSkeletonLoading(false);
      let filtered = mockMemoryClusters;

      if (filterTag === 'night') {
        filtered = mockMemoryClusters.filter(
          (c) => c.timeOfDay === 'night' || c.tags.includes('night')
        );
      } else if (filterTag === 'food') {
        filtered = mockMemoryClusters.filter((c) => c.hasFood || c.tags.includes('dinner'));
      } else if (filterTag === 'birthday') {
        filtered = mockMemoryClusters.filter((c) => c.occasion === 'birthday');
      } else if (filterTag === 'outdoors') {
        filtered = mockMemoryClusters.filter((c) => c.isOutdoors);
      }

      setClues((prev) => [
        ...prev,
        {
          id: `rec-${Date.now()}`,
          label: clueText,
          category: 'attribute',
        },
      ]);

      setMatchedClusters(filtered);
      setConfidenceMessage(`Updated results matching "${clueText}"`);
    }, 280);
  };

  // Collection Browsing (Section 4)
  const handleOpenCollection = (collection: CollectionItem) => {
    setSelectedCollection(collection);
    setSubScreen('collection-detail');
  };

  // Photo Lightbox Launcher (Section 3)
  const handleOpenPhoto = (photo: Photo) => {
    setActivePhoto(photo);
    setSubScreen('lightbox');
  };

  // Memory Cluster Preview Launcher (Section 2)
  const handleOpenMemoryCluster = (cluster: MemoryCluster) => {
    setActiveCluster(cluster);
    setSubScreen('memory-preview');
  };

  // Favorites & Action Handlers
  const handleTogglePhotoFavorite = (photoId: string) => {
    setFavoritedPhotoIds((prev) => {
      const next = new Set(prev);
      if (next.has(photoId)) {
        next.delete(photoId);
        setToastMessage('Removed from Favorites');
      } else {
        next.add(photoId);
        setToastMessage('Added to Favorites ❤️');
      }
      return next;
    });
  };

  const handleToggleClusterFavorite = (clusterId?: string) => {
    const targetId = clusterId || activeCluster?.id;
    if (!targetId) return;

    setFavoritedClusterIds((prev) => {
      const next = new Set(prev);
      if (next.has(targetId)) {
        next.delete(targetId);
        setToastMessage('Removed from Favorites');
      } else {
        next.add(targetId);
        setToastMessage('Added to Favorites ❤️');
      }
      return next;
    });
  };

  const handleShare = (text?: string) => {
    setToastMessage(`Link copied to clipboard! ↗`);
  };

  const handleAddToAlbum = () => {
    setToastMessage(`Added to 'Hyderabad Memories 2025' album 📁`);
  };

  const handleDeletePhoto = (photoId: string) => {
    setSubScreen(null);
    setToastMessage('Photo moved to Trash 🗑️');
  };

  const handleSelectCreationTool = (toolName: string) => {
    setToastMessage(`Generated new ${toolName}! ✨ Saved to Creation album.`);
  };

  // Requirement 3: Reset Search Engine & Navigate to Home (Photos Tab)
  const handleResetSearch = () => {
    setQuery('');
    setSubScreen(null);
    setCurrentTab('photos');
    setClues([]);
    setSelectedPerson(null);
    setActiveCluster(null);
    setMatchedClusters([...mockMemoryClusters]);
  };

  // Main Sub-Screen Routing Logic
  const renderTabContent = () => {
    if (subScreen === 'updates') {
      return (
        <UpdatesView
          onBack={() => setSubScreen(null)}
          onManageStorage={() => setSubScreen('account')}
          onViewEdits={() => handleSelectCreationTool('Favorite Edit Collage')}
        />
      );
    }

    if (subScreen === 'collection-detail' && selectedCollection) {
      return (
        <CollectionDetailView
          collection={selectedCollection}
          onBack={() => setSubScreen(null)}
          onOpenPhoto={handleOpenPhoto}
        />
      );
    }

    if (subScreen === 'search-results') {
      return (
        <SearchResultsView
          query={query}
          isSkeletonLoading={isSkeletonLoading}
          resultsCount={42}
          photosList={mockAllPhotos}
          clustersList={matchedClusters}
          clues={clues}
          selectedPerson={selectedPerson}
          confidenceMessage={confidenceMessage}
          onBack={handleResetSearch}
          onOpenPhoto={handleOpenPhoto}
          onOpenCluster={handleOpenMemoryCluster}
          onSelectPersonRefinement={handleSelectPersonRefinement}
          onSelectRecoveryClue={handleSelectRecoveryClue}
        />
      );
    }

    if (subScreen === 'recovery') {
      return (
        <div className="gp-recovery-page animate-fade-in" style={{ padding: '16px' }}>
          <RecoveryFlowCard
            onSelectRecoveryClue={(text, tag) => {
              handleSelectRecoveryClue(text, tag);
              setSubScreen('search-results');
            }}
            onCustomTextSubmit={(txt) => {
              handleExecuteSearch(txt);
            }}
          />
        </div>
      );
    }

    if (subScreen === 'success' && activeCluster) {
      return (
        <div className="gp-success-page animate-fade-in" style={{ padding: '16px' }}>
          <SuccessViewCard
            cluster={activeCluster}
            isFavorited={favoritedClusterIds.has(activeCluster.id)}
            onFavoriteToggle={() => handleToggleClusterFavorite(activeCluster.id)}
            onShare={() => handleShare(activeCluster.title)}
            onAddToAlbum={() => handleAddToAlbum()}
            onSearchAgain={handleResetSearch}
          />
        </div>
      );
    }

    switch (currentTab) {
      case 'photos':
        return (
          <PhotosTabView
            onOpenPhoto={handleOpenPhoto}
            onOpenMemoryCluster={handleOpenMemoryCluster}
            onOpenNotifications={() => setSubScreen('updates')}
            onOpenAccountModal={() => setSubScreen('account')}
            onOpenCreateTab={() => setCurrentTab('create')}
          />
        );

      case 'collections':
        return (
          <CollectionsTabView
            onOpenCollection={handleOpenCollection}
            onOpenAlbum={(album) => {
              if (album.photos.length > 0) handleOpenPhoto(album.photos[0]);
            }}
            onSelectPersonFilter={(person) => {
              handleExecuteSearch(`Memories with ${person.name}`);
            }}
          />
        );

      case 'create':
        return <CreateTabView onSelectCreationTool={handleSelectCreationTool} />;

      case 'search':
        return (
          <SearchTabView
            onExecuteSearch={handleExecuteSearch}
            onSelectPerson={(person) => {
              handleExecuteSearch(`Photos with ${person.name}`);
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`gp-app-root ${phoneFrameMode ? 'mode-phone-frame' : 'mode-responsive'}`}>
      {/* Viewport Switcher Bar */}
      <div className="gp-device-toggle-bar">
        <span className="gp-device-toggle-title">Google Photos MVP — Dynamic Prompt Extraction</span>
        <div className="gp-toggle-buttons-group">
          <button
            className={`gp-device-btn ${phoneFrameMode ? 'active' : ''}`}
            onClick={() => setPhoneFrameMode(true)}
          >
            <Smartphone size={16} />
            <span>Phone Frame View</span>
          </button>
          <button
            className={`gp-device-btn ${!phoneFrameMode ? 'active' : ''}`}
            onClick={() => setPhoneFrameMode(false)}
          >
            <Monitor size={16} />
            <span>Full Viewport View</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="gp-viewport-wrapper">
        <div className="gp-mobile-phone-container">
          {/* iOS Status Bar */}
          <div className="gp-ios-statusbar">
            <span className="gp-status-time">9:41</span>
            <div className="gp-status-notch"></div>
            <div className="gp-status-icons">
              <span>5G</span>
              <div className="gp-battery-icon"></div>
            </div>
          </div>

          {/* Top Navbar */}
          <Navbar
            query={query}
            setQuery={setQuery}
            onSearch={handleExecuteSearch}
            appStage={subScreen === 'search-results' ? 'candidates' : 'idle'}
            onReset={handleResetSearch}
            onOpenNotifications={() => setSubScreen('updates')}
            onOpenAccountModal={() => setSubScreen('account')}
            onOpenCreateTab={() => setCurrentTab('create')}
          />

          {/* Main App Body */}
          <main className="gp-app-main-body">{renderTabContent()}</main>

          {/* Floating Bottom Nav */}
          {subScreen === null && (
            <BottomNav
              currentTab={currentTab}
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                setSubScreen(null);
              }}
            />
          )}

          {/* Account Sheet */}
          {subScreen === 'account' && (
            <AccountModal
              onClose={() => setSubScreen(null)}
              onManageStorage={() => setToastMessage('Redirected to Google One Storage Manager')}
            />
          )}

          {/* Memory Preview Modal */}
          {subScreen === 'memory-preview' && activeCluster && (
            <MemoryPreviewModal
              cluster={activeCluster}
              isFavorited={favoritedClusterIds.has(activeCluster.id)}
              onClose={() => setSubScreen(null)}
              onConfirmSuccess={() => setSubScreen('success')}
              onRejectNotThisOne={() => setSubScreen('recovery')}
              onToggleFavorite={(id) => handleToggleClusterFavorite(id)}
              onShare={(title) => handleShare(title)}
              onAddToAlbum={() => handleAddToAlbum()}
            />
          )}

          {/* Photo Lightbox Modal */}
          {subScreen === 'lightbox' && activePhoto && (
            <PhotoLightboxModal
              photo={activePhoto}
              isFavorite={favoritedPhotoIds.has(activePhoto.id)}
              onClose={() => setSubScreen(null)}
              onToggleFavorite={handleTogglePhotoFavorite}
              onShare={handleShare}
              onDelete={handleDeletePhoto}
            />
          )}
        </div>
      </div>

      {/* Action Toast Feedback */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      <style>{`
        .gp-app-root {
          min-height: 100vh;
          background-color: #121212;
          color: var(--gp-text-primary);
          display: flex;
          flex-direction: column;
        }

        .gp-device-toggle-bar {
          background: #1F1F1F;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 8px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          z-index: 100;
        }

        .gp-device-toggle-title {
          font-size: 14px;
          font-weight: 600;
          color: #E3E3E3;
        }

        .gp-toggle-buttons-group {
          display: flex;
          gap: 8px;
        }

        .gp-device-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.1);
          color: #C4C7C5;
          padding: 6px 14px;
          border-radius: var(--gp-radius-pill);
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .gp-device-btn.active {
          background: var(--gp-blue-primary);
          color: white;
        }

        /* Viewport Frame */
        .gp-viewport-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .mode-phone-frame .gp-mobile-phone-container {
          width: 412px;
          height: 840px;
          background: #FFFFFF;
          border-radius: 44px;
          box-shadow: 0 0 0 12px #2A2A2A, 0 20px 50px rgba(0,0,0,0.6);
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .mode-responsive .gp-viewport-wrapper {
          padding: 0;
        }

        .mode-responsive .gp-mobile-phone-container {
          width: 100%;
          min-height: calc(100vh - 45px);
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .gp-ios-statusbar {
          height: 38px;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          font-size: 13.5px;
          font-weight: 600;
          color: #000000;
          flex-shrink: 0;
          user-select: none;
        }

        .gp-status-notch {
          width: 110px;
          height: 18px;
          background: #000000;
          border-radius: 12px;
        }

        .gp-status-icons {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
        }

        .gp-battery-icon {
          width: 20px;
          height: 10px;
          border: 1.5px solid #000000;
          border-radius: 3px;
          position: relative;
        }

        .gp-battery-icon::after {
          content: '';
          position: absolute;
          inset: 1.5px;
          background: #000000;
          border-radius: 1px;
        }

        .gp-app-main-body {
          flex: 1;
          overflow-y: auto;
          position: relative;
        }

        @media (max-width: 480px) {
          .gp-device-toggle-bar {
            display: none;
          }
          .mode-phone-frame .gp-mobile-phone-container {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};
