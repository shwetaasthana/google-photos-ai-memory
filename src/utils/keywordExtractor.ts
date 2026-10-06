import { ClueChip } from '../types';

/**
 * Dynamically extracts memory clues & keywords from any user prompt string.
 * Example: "College days with Friends" -> [College, Group of people, Friends]
 */
export function extractKeywordsFromPrompt(promptText: string): ClueChip[] {
  if (!promptText || !promptText.trim()) {
    return [];
  }

  const text = promptText.trim();
  const lower = text.toLowerCase();
  const extracted: ClueChip[] = [];
  const addedLabels = new Set<string>();

  const addChip = (label: string, category: ClueChip['category']) => {
    if (!addedLabels.has(label.toLowerCase())) {
      addedLabels.add(label.toLowerCase());
      extracted.push({
        id: `extracted-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        label,
        category,
        isAutoExtracted: true,
      });
    }
  };

  // 1. Keyword mapping dictionary for semantic understanding
  if (lower.includes('college') || lower.includes('campus') || lower.includes('university')) {
    addChip('College', 'place');
    if (lower.includes('friends') || lower.includes('group') || lower.includes('buddies')) {
      addChip('Group of people', 'person');
    }
  }

  if (lower.includes('friends') || lower.includes('friend')) {
    addChip('Friends', 'attribute');
  }

  if (lower.includes('hyderabad')) addChip('Hyderabad', 'location');
  if (lower.includes('goa')) addChip('Goa', 'location');
  if (lower.includes('banff') || lower.includes('mountain')) addChip('Banff Mountains', 'location');
  if (lower.includes('delhi')) addChip('Delhi', 'location');

  if (lower.includes('cafe') || lower.includes('coffee')) addChip('Cafe', 'place');
  if (lower.includes('bistro') || lower.includes('restaurant') || lower.includes('dinner')) addChip('Dining', 'place');
  if (lower.includes('rooftop')) addChip('Rooftop', 'place');

  if (lower.includes('birthday') || lower.includes('party')) addChip('Birthday Party', 'attribute');
  if (lower.includes('trip') || lower.includes('travel') || lower.includes('vacation')) addChip('Vacation Trip', 'attribute');
  if (lower.includes('night')) addChip('Night time', 'time');
  if (lower.includes('beach') || lower.includes('ocean')) addChip('Beach', 'place');

  // 2. Generic token extraction if dictionary didn't catch enough
  const stopWords = new Set([
    'in', 'with', 'at', 'on', 'the', 'a', 'an', 'for', 'of', 'my', 'me', 'days', 'and', 'show', 'search', 'find'
  ]);

  const words = lower.split(/\s+/).map((w) => w.replace(/[^a-z0-9]/gi, '')).filter(Boolean);

  for (const word of words) {
    if (!stopWords.has(word) && word.length > 2) {
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
      addChip(capitalized, 'attribute');
    }
  }

  return extracted;
}
