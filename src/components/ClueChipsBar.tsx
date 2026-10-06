import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { ClueChip } from '../types';

interface ClueChipsBarProps {
  clues: ClueChip[];
  onRemoveClue: (id: string) => void;
  onAddClue: (label: string) => void;
}

export const ClueChipsBar: React.FC<ClueChipsBarProps> = ({
  clues,
  onRemoveClue,
  onAddClue,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newClueText, setNewClueText] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClueText.trim()) {
      onAddClue(newClueText.trim());
      setNewClueText('');
      setIsAdding(false);
    }
  };

  return (
    <div className="gp-clues-bar animate-fade-in">
      <div className="gp-clues-header">
        <Sparkles size={16} className="sparkle-icon" />
        <span className="gp-clues-label">Extracted clues from memory:</span>
      </div>

      <div className="gp-chips-wrapper">
        {clues.map((clue) => (
          <div key={clue.id} className="gp-clue-chip">
            <span className="gp-chip-text">{clue.label}</span>
            <button
              className="gp-chip-remove"
              onClick={() => onRemoveClue(clue.id)}
              title={`Remove ${clue.label} clue`}
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {isAdding ? (
          <form onSubmit={handleAddSubmit} className="gp-add-chip-form">
            <input
              type="text"
              className="gp-add-chip-input"
              placeholder="Add a clue..."
              value={newClueText}
              onChange={(e) => setNewClueText(e.target.value)}
              autoFocus
              onBlur={() => {
                if (!newClueText.trim()) setIsAdding(false);
              }}
            />
          </form>
        ) : (
          <button
            className="gp-add-chip-btn"
            onClick={() => setIsAdding(true)}
            title="Add another clue"
          >
            <Plus size={14} />
            <span>Add clue</span>
          </button>
        )}
      </div>

      <style>{`
        .gp-clues-bar {
          background: #F8F9FA;
          border: 1px solid var(--gp-border-subtle);
          border-radius: var(--gp-radius-md);
          padding: 12px 18px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .gp-clues-header {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--gp-blue-primary);
          font-weight: 500;
          font-size: 13px;
        }

        .sparkle-icon {
          color: var(--gp-blue-primary);
        }

        .gp-clues-label {
          color: var(--gp-text-secondary);
          font-size: 13px;
        }

        .gp-chips-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .gp-clue-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid #DADCE0;
          padding: 6px 12px;
          border-radius: var(--gp-radius-pill);
          font-size: 13px;
          font-weight: 500;
          color: #3C4043;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          transition: all 0.15s ease;
        }

        .gp-clue-chip:hover {
          background: #F1F3F4;
          border-color: #BDC1C6;
        }

        .gp-chip-remove {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5F6368;
          border-radius: 50%;
          padding: 2px;
        }

        .gp-chip-remove:hover {
          background: rgba(0,0,0,0.1);
          color: #202124;
        }

        .gp-add-chip-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: 1px dashed #AECBFA;
          color: var(--gp-blue-primary);
          padding: 6px 12px;
          border-radius: var(--gp-radius-pill);
          font-size: 13px;
          font-weight: 500;
          transition: all 0.15s ease;
        }

        .gp-add-chip-btn:hover {
          background: #EDF4FC;
        }

        .gp-add-chip-input {
          border: 1px solid var(--gp-blue-primary);
          border-radius: var(--gp-radius-pill);
          padding: 5px 12px;
          font-size: 13px;
          outline: none;
          background: white;
          width: 120px;
        }
      `}</style>
    </div>
  );
};
