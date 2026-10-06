import { MemoryCluster, TaggedPerson, Photo, Album, CollectionItem } from '../types';

export const mockPeople: Record<string, TaggedPerson> = {
  hemal: {
    id: 'hemal',
    name: 'Hemal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    photoCount: 42
  },
  priya: {
    id: 'priya',
    name: 'Priya',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    photoCount: 38
  },
  rahul: {
    id: 'rahul',
    name: 'Rahul',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    photoCount: 29
  },
  benny: {
    id: 'benny',
    name: 'Benny',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=250&q=80',
    photoCount: 65
  },
  mee3: {
    id: 'mee3',
    name: 'Mee3',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    photoCount: 19
  },
  ananya: {
    id: 'ananya',
    name: 'Ananya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    photoCount: 15
  }
};

export const mockAllPhotos: Photo[] = [
  {
    id: 'p-1',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    caption: 'Sunny patio seating at Jubilee Hills Cafe',
    dateStr: 'Today, 2:15 PM',
    location: 'Third Wave Coffee, Jubilee Hills',
    isFavorite: true,
    category: 'photos',
    peopleIds: ['hemal', 'priya'],
    cameraInfo: 'iPhone 15 Pro · 24mm f/1.78'
  },
  {
    id: 'p-2',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    caption: 'Hemal & Priya chatting over iced lattes',
    dateStr: 'Today, 1:45 PM',
    location: 'Jubilee Hills, Hyderabad',
    isFavorite: false,
    category: 'photos',
    peopleIds: ['hemal', 'priya'],
    cameraInfo: 'iPhone 15 Pro · 77mm f/2.8'
  },
  {
    id: 'p-3',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    caption: 'Fresh Pour-over coffee & avocado croissants',
    dateStr: 'Yesterday, 11:30 AM',
    location: 'Jubilee Hills, Hyderabad',
    isFavorite: true,
    category: 'photos',
    peopleIds: [],
    cameraInfo: 'iPhone 15 Pro · 24mm f/1.78'
  },
  {
    id: 'p-4',
    url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1000&q=80',
    caption: 'Warm fairy light ambiance at Banjara Hills bistro',
    dateStr: 'Dec 20, 2024',
    location: 'Roastery Coffee House, Banjara Hills',
    isFavorite: true,
    category: 'photos',
    peopleIds: ['priya', 'rahul'],
    cameraInfo: 'Sony A7 IV · 35mm f/1.4'
  },
  {
    id: 'p-5',
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    caption: 'Group table with artisanal pasta & mocktails',
    dateStr: 'Dec 20, 2024',
    location: 'Banjara Hills, Hyderabad',
    isFavorite: false,
    category: 'photos',
    peopleIds: ['priya', 'rahul'],
    cameraInfo: 'iPhone 15 Pro · 24mm f/1.78'
  },
  {
    id: 'p-6',
    url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
    caption: 'Rooftop night skyline of Hyderabad with sparklers',
    dateStr: 'Oct 12, 2024',
    location: 'Over The Moon Rooftop, Gachibowli',
    isFavorite: true,
    category: 'photos',
    peopleIds: ['hemal', 'rahul'],
    cameraInfo: 'iPhone 15 Pro · Night Mode'
  },
  {
    id: 'p-7',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    caption: 'Birthday cake celebration with candles lit',
    dateStr: 'Oct 12, 2024',
    location: 'Gachibowli, Hyderabad',
    isFavorite: true,
    category: 'photos',
    peopleIds: ['hemal', 'rahul'],
    cameraInfo: 'iPhone 15 Pro · 24mm f/1.78'
  },
  {
    id: 'p-8',
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    caption: 'Famous Irani Chai & Osmania Biscuits at midnight',
    dateStr: 'Jan 18, 2025',
    location: 'Niloufer Cafe, Gachibowli',
    isFavorite: false,
    category: 'photos',
    peopleIds: ['hemal', 'ananya'],
    cameraInfo: 'iPhone 15 Pro · 24mm f/1.78'
  },
  {
    id: 'p-9',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    caption: 'Moraine Lake mountains & crystal water reflection',
    dateStr: 'Aug 14, 2024',
    location: 'Banff National Park',
    isFavorite: true,
    category: 'photos',
    peopleIds: [],
    cameraInfo: 'Canon EOS R5 · 16mm f/4'
  },
  {
    id: 'p-10',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    caption: 'Benny sitting outdoors in the garden',
    dateStr: 'Jul 3, 2024',
    location: 'Home Garden',
    isFavorite: true,
    category: 'photos',
    peopleIds: ['benny'],
    cameraInfo: 'iPhone 14 · 50mm f/2.0'
  },
  {
    id: 'p-11',
    url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    caption: 'Minimal desk setup with MacBook Pro',
    dateStr: 'May 19, 2024',
    location: 'Office Studio',
    isFavorite: false,
    category: 'screenshots',
    peopleIds: [],
    cameraInfo: 'Screen Grab · 2560x1600'
  },
  {
    id: 'p-12',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    caption: 'Modern architectural living room lighting',
    dateStr: 'Mar 8, 2024',
    location: 'Jubilee Hills Residence',
    isFavorite: false,
    category: 'screenshots',
    peopleIds: [],
    cameraInfo: 'Screen Grab · 2560x1600'
  }
];

export const mockScreenshotsPhotos: Photo[] = [
  {
    id: 'scr-1',
    url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    caption: 'Flight Confirmation Ticket Screenshot',
    dateStr: 'Yesterday, 4:10 PM',
    category: 'screenshots',
    location: 'Hyderabad to Goa Flight',
    cameraInfo: 'Screen Capture · iOS'
  },
  {
    id: 'scr-2',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    caption: 'Interior Design Pinterest Inspiration',
    dateStr: 'Mar 12, 2025',
    category: 'screenshots',
    location: 'Pinterest App',
    cameraInfo: 'Screen Capture · iOS'
  },
  {
    id: 'scr-3',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    caption: 'Cafe Menu & Coffee Recipe Bookmark',
    dateStr: 'Feb 28, 2025',
    category: 'screenshots',
    location: 'Third Wave Coffee Website',
    cameraInfo: 'Screen Capture · iOS'
  },
  {
    id: 'scr-4',
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    caption: 'Restaurant Reservation Confirmation',
    dateStr: 'Jan 14, 2025',
    category: 'screenshots',
    location: 'Zomato Booking',
    cameraInfo: 'Screen Capture · iOS'
  }
];

export const mockCollections: CollectionItem[] = [
  {
    id: 'coll-screenshots',
    title: 'Screenshots',
    itemCount: 235,
    category: 'screenshots',
    thumbnails: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=300&q=80'
    ],
    photos: mockScreenshotsPhotos
  },
  {
    id: 'coll-favorites',
    title: 'Favorites',
    itemCount: 14,
    category: 'favorites',
    thumbnails: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80'
    ],
    photos: mockAllPhotos.filter((p) => p.isFavorite)
  },
  {
    id: 'coll-videos',
    title: 'Videos',
    itemCount: 42,
    category: 'videos',
    thumbnails: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80'
    ],
    photos: mockAllPhotos.slice(0, 4)
  },
  {
    id: 'coll-selfies',
    title: 'Selfies',
    itemCount: 89,
    category: 'selfies',
    thumbnails: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
    ],
    photos: mockAllPhotos.slice(1, 5)
  },
  {
    id: 'coll-documents',
    title: 'Documents',
    itemCount: 16,
    category: 'documents',
    thumbnails: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=300&q=80'
    ],
    photos: mockScreenshotsPhotos
  },
  {
    id: 'coll-camera',
    title: 'Camera Photos',
    itemCount: 1420,
    category: 'camera',
    thumbnails: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80'
    ],
    photos: mockAllPhotos
  }
];

export const mockAlbums: Album[] = [
  {
    id: 'alb-1',
    title: 'EVANORA',
    subtitle: 'Profile Edit',
    coverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    photoCount: 14,
    photos: mockAllPhotos.slice(0, 4)
  },
  {
    id: 'alb-2',
    title: 'SOLITUDE',
    subtitle: 'Eliza Reed',
    coverUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    photoCount: 22,
    photos: mockAllPhotos.slice(2, 6)
  },
  {
    id: 'alb-3',
    title: 'MINE 😊',
    subtitle: 'Clara Jayne',
    coverUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    photoCount: 9,
    photos: mockAllPhotos.slice(4, 8)
  },
  {
    id: 'alb-4',
    title: 'HYDERABAD CAFES',
    subtitle: 'Brunch & Chai',
    coverUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80',
    photoCount: 18,
    photos: mockAllPhotos.slice(0, 6)
  }
];

export const mockMemoryClusters: MemoryCluster[] = [
  {
    id: 'jubilee-hills-mar-2025',
    title: 'Jubilee Hills · March 2025',
    subtitle: 'Artisan Cafe & Brunch with Hemal & Priya',
    dateStr: 'Sunday, March 16, 2025',
    location: 'Third Wave Coffee, Jubilee Hills, Hyderabad',
    neighborhood: 'Jubilee Hills',
    photoCount: 6,
    people: [mockPeople.hemal, mockPeople.priya],
    tags: ['hyderabad', 'cafe', 'friends', 'hemal', 'priya', 'day', 'coffee', 'outdoors', 'food', 'brunch'],
    timeOfDay: 'day',
    occasion: 'coffee',
    isOutdoors: true,
    hasFood: true,
    photos: [
      {
        id: 'jh-1',
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
        caption: 'Sunny patio seating at Jubilee Hills Cafe',
      },
      {
        id: 'jh-2',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        caption: 'Hemal & Priya chatting over iced lattes',
      },
      {
        id: 'jh-3',
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
        caption: 'Fresh Pour-over coffee & avocado croissants',
      },
      {
        id: 'jh-4',
        url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80',
        caption: 'Lush greenery courtyard view',
      },
      {
        id: 'jh-5',
        url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
        caption: 'Priya snapping coffee photos',
      },
      {
        id: 'jh-6',
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
        caption: 'Table arrangement with sunglasses & coffee',
      },
    ],
  },
  {
    id: 'banjara-hills-dec-2024',
    title: 'Banjara Hills · December 2024',
    subtitle: 'Cozy Evening Cafe & Dinner with Priya & Rahul',
    dateStr: 'Friday, December 20, 2024',
    location: 'Roastery Coffee House, Banjara Hills, Hyderabad',
    neighborhood: 'Banjara Hills',
    photoCount: 8,
    people: [mockPeople.priya, mockPeople.rahul],
    tags: ['hyderabad', 'cafe', 'friends', 'priya', 'rahul', 'night', 'evening', 'dinner', 'food'],
    timeOfDay: 'night',
    occasion: 'dinner',
    isOutdoors: false,
    hasFood: true,
    photos: [
      {
        id: 'bh-1',
        url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1000&q=80',
        caption: 'Warm fairy light ambiance at Banjara Hills bistro',
      },
      {
        id: 'bh-2',
        url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
        caption: 'Group table with artisanal pasta & mocktails',
      },
      {
        id: 'bh-3',
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
        caption: 'Gourmet dinner spread served hot',
      },
      {
        id: 'bh-4',
        url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
        caption: 'Priya laughing with Rahul during dinner',
      },
      {
        id: 'bh-5',
        url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
        caption: 'Chocolaty cold brew dessert glass',
      },
      {
        id: 'bh-6',
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        caption: 'Rustic indoor seating near fireplace wall',
      },
      {
        id: 'bh-7',
        url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
        caption: 'Rahul sharing stories over drinks',
      },
      {
        id: 'bh-8',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
        caption: 'Candlelit night portrait of the group',
      },
    ],
  },
  {
    id: 'hyderabad-oct-2024',
    title: 'Hyderabad · October 2024',
    subtitle: 'Birthday Party & Rooftop Cafe with Hemal & Rahul',
    dateStr: 'Saturday, October 12, 2024',
    location: 'Over The Moon Rooftop, Gachibowli, Hyderabad',
    neighborhood: 'Gachibowli',
    photoCount: 10,
    people: [mockPeople.hemal, mockPeople.rahul],
    tags: ['hyderabad', 'cafe', 'friends', 'hemal', 'rahul', 'birthday', 'night', 'outdoors', 'food'],
    timeOfDay: 'night',
    occasion: 'birthday',
    isOutdoors: true,
    hasFood: true,
    photos: [
      {
        id: 'hyd-1',
        url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
        caption: 'Rooftop night skyline of Hyderabad with sparklers',
      },
      {
        id: 'hyd-2',
        url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
        caption: 'Birthday cake celebration with candles lit',
      },
      {
        id: 'hyd-3',
        url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80',
        caption: 'Hemal cheerings with glasses on the rooftop',
      },
      {
        id: 'hyd-4',
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
        caption: 'Rahul wearing birthday hat taking selfies',
      },
      {
        id: 'hyd-5',
        url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
        caption: 'Balloons decor & party lights',
      },
      {
        id: 'hyd-6',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
        caption: 'Friends singing happy birthday together',
      },
      {
        id: 'hyd-7',
        url: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80',
        caption: 'Finger food appetizers platter',
      },
      {
        id: 'hyd-8',
        url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
        caption: 'Group hug on the open terrace',
      },
      {
        id: 'hyd-9',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
        caption: 'Night city lights from the 15th floor',
      },
      {
        id: 'hyd-10',
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
        caption: 'Candid photo of Hemal smiling at the camera',
      }
    ]
  },
  {
    id: 'gachibowli-jan-2025',
    title: 'Gachibowli · January 2025',
    subtitle: 'Late Night Tea & Snacks with Hemal & Ananya',
    dateStr: 'Saturday, January 18, 2025',
    location: 'Niloufer Cafe, Gachibowli, Hyderabad',
    neighborhood: 'Gachibowli',
    photoCount: 5,
    people: [mockPeople.hemal, mockPeople.ananya],
    tags: ['hyderabad', 'cafe', 'friends', 'hemal', 'ananya', 'night', 'outdoors', 'food', 'tea'],
    timeOfDay: 'night',
    occasion: 'coffee',
    isOutdoors: true,
    hasFood: true,
    photos: [
      {
        id: 'gac-1',
        url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
        caption: 'Famous Irani Chai & Osmania Biscuits at midnight',
      },
      {
        id: 'gac-2',
        url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
        caption: 'Warm outdoor seating after dinner',
      },
      {
        id: 'gac-3',
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
        caption: 'Hemal enjoying hot chai',
      },
      {
        id: 'gac-4',
        url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
        caption: 'Late night conversation under tree lights',
      },
      {
        id: 'gac-5',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        caption: 'Ananya taking a picture of the warm tea cup',
      }
    ]
  }
];

export const presetPromptSuggestions = [
  'Cafe in Hyderabad with friends',
  'Where did I travel in 2024?',
  'Who did I spend the most time with in 2021?',
  'Show me birthday celebrations in October',
  'Which mountains have I visited?'
];

export const initialExtractedClues = [
  { id: 'c1', label: 'Hyderabad', category: 'location', isAutoExtracted: true },
  { id: 'c2', label: 'Cafe', category: 'place', isAutoExtracted: true },
  { id: 'c3', label: 'Friends', category: 'attribute', isAutoExtracted: true }
] as const;

export const recentSearchesList = [
  'Cafe in Hyderabad with friends',
  'Goa Trip 2024',
  'Birthday Party rooftop',
  'Screenshots & Tickets',
  'Banff Mountain lakes'
];

export const suggestedSearchCategories = [
  { label: 'Food Photos', icon: '🍲', query: 'Food and dining' },
  { label: 'Beach Photos', icon: '🏖️', query: 'Beach and ocean' },
  { label: 'Selfies', icon: '🤳', query: 'Selfies with friends' },
  { label: 'Documents', icon: '📄', query: 'Document scans' }
];

export const mockPlacesList = [
  { id: 'pl-1', name: 'Hyderabad', count: 184, imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80' },
  { id: 'pl-2', name: 'Bangalore', count: 96, imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80' },
  { id: 'pl-3', name: 'Delhi', count: 62, imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80' }
];
