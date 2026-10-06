import React, { useState } from 'react';
import {
  Sparkles,
  Moon,
  Utensils,
  Cake,
  Sun,
  Calendar,
  MessageSquare,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { RecoveryOption } from '../types';

interface RecoveryFlowCardProps {
  onSelectRecoveryClue: (clueText: string, filterTag?: string) => void;
  onCustomTextSubmit: (customText: string) => void;
}

export const RecoveryFlowCard: React.FC<RecoveryFlowCardProps> = ({
  onSelectRecoveryClue,
  onCustomTextSubmit,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInputText, setCustomInputText] = useState('');
  const [selectedClueId, setSelectedClueId] = useState<string | null>(null);

  const recoveryOptions: (RecoveryOption & { icon: React.ElementType })[] = [
    {
      id: 'night',
      label: 'It was at night',
      icon: Moon,
      filterTag: 'night',
    },
    {
      id: 'food',
      label: 'There was food',
      icon: Utensils,
      filterTag: 'food',
    },
    {
      id: 'birthday',
      label: 'It was a birthday',
      icon: Cake,
      filterTag: 'birthday',
    },
    {
      id: 'outdoors',
      label: 'It was outdoors',
      icon: Sun,
      filterTag: 'outdoors',
    },
    {
      id: 'year2024',
      label: 'Around 2024',
      icon: Calendar,
      filterTag: '2024',
    },
    {
      id: 'something-else',
      label: 'Something else...',
      icon: MessageSquare,
    },
  ];

  const handleOptionClick = (opt: typeof recoveryOptions[0]) => {
    setSelectedClueId(opt.id);
    if (opt.id === 'something-else') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      onSelectRecoveryClue(opt.label, opt.filterTag);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInputText.trim()) {
      onCustomTextSubmit(customInputText.trim());
    }
  };

  return (
    <div className="gp-recovery-card animate-fade-in">
      <div className="gp-recovery-header">
        <div className="gp-recovery-sparkle-badge">
          <Sparkles size={16} />
          <span>Ask Photos Recovery</span>
        </div>
        <h3 className="gp-recovery-title">No problem. Let's narrow it down.</h3>
        <p className="gp-recovery-subtitle">What else do you remember about this memory?</p>
      </div>

      {/* Suggested Recovery Clue Chips */}
      <div className="gp-recovery-chips-grid">
        {recoveryOptions.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedClueId === opt.id;

          return (
            <button
              key={opt.id}
              className={`gp-recovery-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => handleOptionClick(opt)}
            >
              <Icon size={16} className="gp-chip-icon" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Custom Input when 'Something else...' is active */}
      {showCustomInput && (
        <form onSubmit={handleFormSubmit} className="gp-custom-clue-box animate-fade-in">
          <label className="gp-custom-label">Describe any detail you recall:</label>
          <div className="gp-custom-input-group">
            <input
              type="text"
              className="gp-custom-input"
              placeholder="e.g., We went there after dinner, or near rooftop area..."
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              autoFocus
            />
            <button type="submit" className="gp-custom-submit-btn">
              <span>Refine search</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}

      <style>{`
        .gp-recovery-card {
          background: #FFFFFF;
          border: 1px solid #DADCE0;
          border-left: 4px solid var(--gp-blue-primary);
          border-radius: var(--gp-radius-lg);
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: var(--gp-shadow-subtle);
        }

        .gp-recovery-sparkle-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--gp-blue-primary);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .gp-recovery-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--gp-text-primary);
          margin-bottom: 4px;
        }

        .gp-recovery-subtitle {
          font-size: 14px;
          color: var(--gp-text-secondary);
          margin-bottom: 20px;
        }

        .gp-recovery-chips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
          margin-bottom: 16px;
        }

        .gp-recovery-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--gp-surface-variant);
          border: 1px solid transparent;
          padding: 10px 14px;
          border-radius: var(--gp-radius-pill);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--gp-text-primary);
          transition: all 0.2s ease;
          text-align: left;
        }

        .gp-recovery-chip:hover {
          background: #E8EAED;
          border-color: #BDC1C6;
        }

        .gp-recovery-chip.selected {
          background: #C2E7FF;
          border-color: #00639B;
          color: #001D35;
          font-weight: 600;
        }

        .gp-chip-icon {
          color: var(--gp-blue-primary);
          flex-shrink: 0;
        }

        .gp-recovery-chip.selected .gp-chip-icon {
          color: #001D35;
        }

        /* Custom Input Styling */
        .gp-custom-clue-box {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--gp-border-subtle);
        }

        .gp-custom-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--gp-text-secondary);
          margin-bottom: 8px;
        }

        .gp-custom-input-group {
          display: flex;
          gap: 10px;
        }

        .gp-custom-input {
          flex: 1;
          border: 1px solid #DADCE0;
          border-radius: var(--gp-radius-pill);
          padding: 10px 18px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .gp-custom-input:focus {
          border-color: var(--gp-blue-primary);
          box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
        }

        .gp-custom-submit-btn {
          background: var(--gp-blue-primary);
          color: white;
          padding: 10px 20px;
          border-radius: var(--gp-radius-pill);
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s ease;
        }

        .gp-custom-submit-btn:hover {
          background: #1557B0;
        }
      `}</style>
    </div>
  );
};
