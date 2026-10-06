import React from 'react';
import {
  Sparkles,
  Zap,
  Calendar,
  Image as ImageIcon,
  Video,
  Layers,
  LayoutGrid,
  Camera,
  MoreHorizontal,
  Bookmark
} from 'lucide-react';

interface CreateTabViewProps {
  onSelectCreationTool: (toolName: string) => void;
}

export const CreateTabView: React.FC<CreateTabViewProps> = ({ onSelectCreationTool }) => {
  const promptChips = [
    { label: 'You → chibi sticker', icon: '🎨' },
    { label: 'Weekend highlight GIF', icon: '⚡' },
    { label: 'Collage your weekend', icon: '📅' },
    { label: 'Slow pan of your fav', icon: '🐌' },
  ];

  const toolsGrid = [
    { name: 'Remix', icon: ImageIcon },
    { name: 'Highlight video', icon: Video },
    { name: 'Animation', icon: Layers },
    { name: 'Collage', icon: LayoutGrid },
    { name: 'Cinematic photo', icon: Camera },
    { name: 'More', icon: MoreHorizontal },
  ];

  return (
    <div className="gp-create-tab animate-fade-in">
      {/* Greeting Title */}
      <div className="gp-create-header">
        <h2 className="gp-create-title">Alex, got an idea? Let's make it happen.</h2>
      </div>

      {/* Featured Creation Cards Carousel */}
      <div className="gp-create-carousel">
        <div className="gp-create-hero-card">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
            alt="Animation"
          />
          <div className="gp-card-badge">Animation</div>
          <button className="gp-card-save-btn" onClick={() => onSelectCreationTool('Saved Animation')}>
            Save
          </button>
        </div>

        <div className="gp-create-hero-card">
          <img
            src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80"
            alt="Cinematic"
          />
          <div className="gp-card-badge">Cinematic</div>
          <button className="gp-card-save-btn" onClick={() => onSelectCreationTool('Saved Cinematic')}>
            Save
          </button>
        </div>
      </div>

      {/* Make Your Own Chips */}
      <section className="gp-create-section">
        <h4 className="gp-create-section-title">Make your own</h4>
        <div className="gp-prompt-chips-grid">
          {promptChips.map((chip) => (
            <button
              key={chip.label}
              className="gp-make-chip-btn"
              onClick={() => onSelectCreationTool(chip.label)}
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Creation Tools Grid */}
      <section className="gp-create-section">
        <div className="gp-tools-grid">
          {toolsGrid.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.name}
                className="gp-tool-grid-card"
                onClick={() => onSelectCreationTool(tool.name)}
              >
                <div className="gp-tool-icon-box">
                  <Icon size={24} color="#1F1F1F" />
                </div>
                <span className="gp-tool-name">{tool.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      <style>{`
        .gp-create-tab {
          padding: 24px 16px 90px;
        }

        .gp-create-header {
          margin-bottom: 20px;
        }

        .gp-create-title {
          font-size: 26px;
          font-weight: 500;
          line-height: 1.25;
          color: var(--gp-text-primary);
        }

        /* Hero Carousel */
        .gp-create-carousel {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          margin-bottom: 24px;
          padding-bottom: 4px;
        }

        .gp-create-hero-card {
          min-width: 220px;
          width: 220px;
          height: 280px;
          border-radius: var(--gp-radius-lg);
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
          box-shadow: var(--gp-shadow-subtle);
        }

        .gp-create-hero-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gp-card-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--gp-radius-pill);
        }

        .gp-card-save-btn {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: #FFFFFF;
          color: #1F1F1F;
          font-weight: 600;
          font-size: 13px;
          padding: 6px 16px;
          border-radius: var(--gp-radius-pill);
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        /* Sections */
        .gp-create-section {
          margin-bottom: 24px;
        }

        .gp-create-section-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--gp-text-tertiary);
          text-align: center;
          margin-bottom: 14px;
        }

        /* Chips Grid */
        .gp-prompt-chips-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .gp-make-chip-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #F1F3F4;
          border: 1px solid transparent;
          padding: 12px 14px;
          border-radius: var(--gp-radius-pill);
          font-size: 13px;
          font-weight: 500;
          color: var(--gp-text-primary);
          transition: background 0.15s ease;
        }

        .gp-make-chip-btn:hover {
          background: #E8EAED;
        }

        /* Tools Grid */
        .gp-tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .gp-tool-grid-card {
          background: #F8F9FA;
          border-radius: var(--gp-radius-md);
          padding: 16px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .gp-tool-grid-card:hover {
          background: #F1F3F4;
        }

        .gp-tool-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }

        .gp-tool-name {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--gp-text-primary);
          text-align: center;
        }
      `}</style>
    </div>
  );
};
