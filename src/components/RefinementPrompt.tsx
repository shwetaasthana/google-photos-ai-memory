import React from 'react';
import { User, Sparkles, HelpCircle } from 'lucide-react';
import { mockPeople } from '../data/mockMemories';

interface RefinementPromptProps {
  selectedPerson: string | null;
  onSelectPerson: (personName: string) => void;
}

export const RefinementPrompt: React.FC<RefinementPromptProps> = ({
  selectedPerson,
  onSelectPerson,
}) => {
  const options = [
    { id: 'hemal', name: 'Hemal', avatar: mockPeople.hemal.avatar },
    { id: 'priya', name: 'Priya', avatar: mockPeople.priya.avatar },
    { id: 'rahul', name: 'Rahul', avatar: mockPeople.rahul.avatar },
    { id: 'not-sure', name: 'Not sure', icon: HelpCircle },
  ];

  return (
    <div className="gp-refinement-card animate-fade-in">
      <div className="gp-refinement-ai-badge">
        <Sparkles size={16} color="#1A73E8" />
        <span>Ask Photos Refinement</span>
      </div>

      <h3 className="gp-refinement-question">Do you remember who was with you?</h3>

      <div className="gp-refinement-options">
        {options.map((opt) => {
          const isSelected = selectedPerson === opt.name;
          const Icon = opt.icon;

          return (
            <button
              key={opt.id}
              className={`gp-person-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectPerson(opt.name)}
            >
              {opt.avatar ? (
                <img src={opt.avatar} alt={opt.name} className="gp-chip-avatar" />
              ) : Icon ? (
                <Icon size={16} className="gp-chip-icon" />
              ) : (
                <User size={16} className="gp-chip-icon" />
              )}
              <span className="gp-chip-label">{opt.name}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        .gp-refinement-card {
          background: linear-gradient(180deg, #EDF4FC 0%, #F4F8FE 100%);
          border: 1px solid #D3E3FD;
          border-radius: var(--gp-radius-lg);
          padding: 20px 24px;
          margin-bottom: 24px;
        }

        .gp-refinement-ai-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--gp-blue-primary);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .gp-refinement-question {
          font-size: 18px;
          font-weight: 500;
          color: var(--gp-text-primary);
          margin-bottom: 16px;
        }

        .gp-refinement-options {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .gp-person-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          border: 1px solid #DADCE0;
          padding: 8px 16px;
          border-radius: var(--gp-radius-pill);
          font-size: 14px;
          font-weight: 500;
          color: var(--gp-text-primary);
          transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .gp-person-chip:hover {
          background: #F8F9FA;
          border-color: var(--gp-blue-primary);
          transform: translateY(-1px);
        }

        .gp-person-chip.selected {
          background: #C2E7FF;
          border-color: #00639B;
          color: #001D35;
          font-weight: 600;
          box-shadow: 0 2px 6px rgba(0, 99, 155, 0.15);
        }

        .gp-chip-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
        }

        .gp-chip-icon {
          color: var(--gp-text-secondary);
        }

        .gp-person-chip.selected .gp-chip-icon {
          color: #001D35;
        }
      `}</style>
    </div>
  );
};
