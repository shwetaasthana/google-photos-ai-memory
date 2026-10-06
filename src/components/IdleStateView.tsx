import React from 'react';
import { Sparkles, Clock, Compass, Heart, Bookmark, MapPin, Users } from 'lucide-react';
import { presetPromptSuggestions, mockPeople } from '../data/mockMemories';

interface IdleStateViewProps {
  onSelectPreset: (promptText: string) => void;
}

export const IdleStateView: React.FC<IdleStateViewProps> = ({ onSelectPreset }) => {
  const peopleBubbles = [
    { name: 'Hemal', avatar: mockPeople.hemal.avatar },
    { name: 'Priya', avatar: mockPeople.priya.avatar },
    { name: 'Rahul', avatar: mockPeople.rahul.avatar },
    { name: 'Ananya', avatar: mockPeople.ananya.avatar },
  ];

  return (
    <div className="gp-idle-view animate-fade-in">
      {/* Ask Photos Feature Banner */}
      <div className="gp-ask-photos-banner" onClick={() => onSelectPreset('Cafe in Hyderabad with friends')}>
        <div className="gp-banner-icon-bg">
          <Sparkles size={24} className="sparkle-anim" />
        </div>
        <div className="gp-banner-text">
          <div className="gp-banner-tag">New AI Discovery</div>
          <h3 className="gp-banner-title">Search your memories naturally with Gemini</h3>
          <p className="gp-banner-desc">
            Vague recollections like <em>"Cafe in Hyderabad with friends"</em> can be recovered step-by-step.
          </p>
        </div>
        <button
          className="gp-banner-action"
          onClick={(e) => {
            e.stopPropagation();
            onSelectPreset('Cafe in Hyderabad with friends');
          }}
        >
          Try Ask Photos
        </button>
      </div>

      {/* People & Pets Strip */}
      <section className="gp-idle-section">
        <h3 className="gp-idle-section-title">People & Pets</h3>
        <div className="gp-people-bubbles-row">
          {peopleBubbles.map((p) => (
            <div
              key={p.name}
              className="gp-people-bubble-card"
              onClick={() => onSelectPreset(`Memories with ${p.name}`)}
            >
              <img src={p.avatar} alt={p.name} />
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Prompts Section */}
      <section className="gp-idle-section">
        <h3 className="gp-idle-section-title">Suggested Memory Searches</h3>
        <div className="gp-prompts-grid">
          {presetPromptSuggestions.map((promptText, idx) => (
            <button
              key={idx}
              className="gp-prompt-chip-card"
              onClick={() => onSelectPreset(promptText)}
            >
              <div className="gp-prompt-icon">
                {idx === 0 ? <Sparkles size={16} color="#1A73E8" /> : <Clock size={16} color="#5F6368" />}
              </div>
              <span className="gp-prompt-text">{promptText}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Memories Overview Grid */}
      <section className="gp-idle-section">
        <h3 className="gp-idle-section-title">Recent Albums & Places</h3>
        <div className="gp-recent-albums-grid">
          <div
            className="gp-album-card"
            onClick={() => onSelectPreset('Cafe in Hyderabad with friends')}
          >
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80"
              alt="Jubilee Hills"
            />
            <div className="gp-album-info">
              <h4>Jubilee Hills Cafes</h4>
              <p>6 photos · Hyderabad</p>
            </div>
          </div>

          <div
            className="gp-album-card"
            onClick={() => onSelectPreset('Banjara Hills dinner with friends')}
          >
            <img
              src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80"
              alt="Banjara Hills"
            />
            <div className="gp-album-info">
              <h4>Banjara Hills Bistro</h4>
              <p>8 photos · December 2024</p>
            </div>
          </div>

          <div
            className="gp-album-card"
            onClick={() => onSelectPreset('Rooftop birthday in Hyderabad')}
          >
            <img
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80"
              alt="Birthday Rooftop"
            />
            <div className="gp-album-info">
              <h4>Birthday Celebration</h4>
              <p>10 photos · October 2024</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .gp-idle-view {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Banner */
        .gp-ask-photos-banner {
          background: linear-gradient(135deg, #EDF4FC 0%, #D3E3FD 100%);
          border: 1px solid #AECBFA;
          border-radius: var(--gp-radius-lg);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .gp-ask-photos-banner:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(26, 115, 232, 0.15);
        }

        .gp-banner-icon-bg {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gp-blue-primary);
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .sparkle-anim {
          animation: pulseGlow 2.5s infinite;
        }

        .gp-banner-text {
          flex: 1;
        }

        .gp-banner-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--gp-blue-primary);
          margin-bottom: 2px;
        }

        .gp-banner-title {
          font-size: 18px;
          font-weight: 600;
          color: #041E49;
        }

        .gp-banner-desc {
          font-size: 14px;
          color: #3C4043;
          margin-top: 2px;
        }

        .gp-banner-action {
          background: var(--gp-blue-primary);
          color: white;
          font-weight: 600;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: var(--gp-radius-pill);
          white-space: nowrap;
          transition: background 0.2s ease;
        }

        .gp-banner-action:hover {
          background: #1557B0;
        }

        /* Sections */
        .gp-idle-section-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--gp-text-primary);
          margin-bottom: 14px;
        }

        /* People Bubbles */
        .gp-people-bubbles-row {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 6px;
        }

        .gp-people-bubble-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .gp-people-bubble-card img {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          transition: transform 0.2s ease;
        }

        .gp-people-bubble-card:hover img {
          transform: scale(1.06);
        }

        .gp-people-bubble-card span {
          font-size: 13px;
          font-weight: 500;
          color: var(--gp-text-primary);
        }

        /* Prompts Grid */
        .gp-prompts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 10px;
        }

        .gp-prompt-chip-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid #DADCE0;
          padding: 12px 16px;
          border-radius: var(--gp-radius-md);
          text-align: left;
          transition: all 0.15s ease;
        }

        .gp-prompt-chip-card:hover {
          background: #F8F9FA;
          border-color: var(--gp-blue-primary);
          transform: translateY(-1px);
        }

        .gp-prompt-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--gp-surface-variant);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .gp-prompt-text {
          font-size: 14px;
          font-weight: 500;
          color: var(--gp-text-primary);
        }

        /* Recent Albums */
        .gp-recent-albums-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }

        .gp-album-card {
          background: white;
          border: 1px solid var(--gp-border);
          border-radius: var(--gp-radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .gp-album-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--gp-shadow-md);
        }

        .gp-album-card img {
          width: 100%;
          height: 130px;
          object-fit: cover;
        }

        .gp-album-info {
          padding: 12px;
        }

        .gp-album-info h4 {
          font-size: 14px;
          font-weight: 600;
          color: var(--gp-text-primary);
        }

        .gp-album-info p {
          font-size: 12px;
          color: var(--gp-text-secondary);
        }
      `}</style>
    </div>
  );
};
