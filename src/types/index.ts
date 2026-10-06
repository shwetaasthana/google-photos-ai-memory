export interface Photo {
  id: string;
  url: string;
  caption: string;
  dateStr?: string;
  location?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  isFavorite?: boolean;
  category?: 'photos' | 'screenshots' | 'selfies' | 'videos' | 'documents';
  peopleIds?: string[];
  cameraInfo?: string;
}

export interface TaggedPerson {
  id: string;
  name: string;
  avatar: string;
  photoCount?: number;
}

export interface CollectionItem {
  id: string;
  title: string;
  itemCount: number;
  category: 'screenshots' | 'favorites' | 'videos' | 'selfies' | 'documents' | 'downloads' | 'camera' | 'archive' | 'trash';
  thumbnails: string[];
  photos: Photo[];
}

export interface Album {
  id: string;
  title: string;
  subtitle: string;
  coverUrl: string;
  photoCount: number;
  photos: Photo[];
}

export interface MemoryCluster {
  id: string;
  title: string;
  subtitle: string;
  dateStr: string;
  location: string;
  neighborhood: string;
  photoCount: number;
  photos: Photo[];
  people: TaggedPerson[];
  tags: string[];
  timeOfDay?: 'day' | 'night' | 'evening';
  occasion?: 'birthday' | 'casual' | 'dinner' | 'coffee';
  isOutdoors?: boolean;
  hasFood?: boolean;
  matchedScore?: number;
}

export interface ClueChip {
  id: string;
  label: string;
  category: 'location' | 'place' | 'person' | 'time' | 'attribute';
  isAutoExtracted?: boolean;
}

export type AppStage =
  | 'idle'
  | 'interpreting'
  | 'candidates'
  | 'refined-results'
  | 'memory-preview'
  | 'recovery'
  | 'success';

export type AppTab = 'photos' | 'collections' | 'create' | 'search';

export interface RecoveryOption {
  id: string;
  label: string;
  iconName?: string;
  queryAddon?: string;
  filterTag?: string;
}
