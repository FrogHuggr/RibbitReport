// IUCN Conservation Status
export type IUCNStatus = 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX' | 'DD';

// Theme colors for articles
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  dark: string;
  light: string;
}

// Issue Schema
export interface Issue {
  id: string;
  number: number;
  title: string;
  theme?: string;
  coverImage: string;
  publishDate: string;
  welcomeMessage: {
    from: string;
    content: string;
  };
  articles: ArticleReference[];
}

// Article Reference (in issue index)
export interface ArticleReference {
  id: string;
  type: string;
  title: string;
  thumbnail: string;
  readingTime?: number;
  contentPath: string;
}

// Base Article with common fields
export interface BaseArticle {
  id: string;
  type: string;
  title: string;
  theme: ThemeColors;
}

// Photo credits
export interface PhotoCredit {
  photo: string;
  credit: string;
}

// Fun fact for species
export interface FunFact {
  emoji: string;
  title: string;
  description: string;
}

// Field Postcard Content Schema
export interface FieldPostcardContent extends BaseArticle {
  type: 'field-postcard';
  hero: {
    region: string;
    descriptor: string;
    descriptorAccent: string;
    speciesCommon: string;
    tagline: string;
  };
  fieldNotes: {
    species: string;
    scientificName: string;
    location: string;
    status: IUCNStatus;
    researcher: string;
  };
  speciesPhotos: {
    hero: string;
    alt: string;
    credits: string;
  };
  funFacts: FunFact[];
  sizeComparison: {
    size: string;
    comparedTo: string;
  };
  soundClip?: string;
  researcher: {
    name: string;
    photo: string;
    fieldPhoto: string;
    quote: string;
    story: string;
    photoCredits: PhotoCredit[];
  };
  mapLocation: {
    country: string;
    coordinates?: [number, number];
  };
  stamp: {
    emoji: string;
    title: string;
  };
}

// Myth Buster Content Schema
export interface MythBusterContent extends BaseArticle {
  type: 'myth-buster';
  myths: {
    myth: string;
    truth: string;
    image?: string;
  }[];
}

// Quiz Content Schema
export interface QuizContent extends BaseArticle {
  type: 'quiz';
  questions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    image?: string;
  }[];
  passingScore: number;
}

// Welcome Letter Content Schema
export interface WelcomeLetterContent extends BaseArticle {
  type: 'welcome-letter';
  from: string;
  greeting: string;
  body: string[];
  signOff: string;
  mascotPose: MarshMellowPose;
}

// Species Spotlight Content Schema
export interface SpeciesSpotlightContent extends BaseArticle {
  type: 'species-spotlight';
  species: {
    commonName: string;
    scientificName: string;
    status: IUCNStatus;
  };
  sections: {
    title: string;
    content: string;
    image?: string;
  }[];
}

// Union type for all article content
export type ArticleContent =
  | FieldPostcardContent
  | MythBusterContent
  | QuizContent
  | WelcomeLetterContent
  | SpeciesSpotlightContent;

// MarshMellow poses
export type MarshMellowPose =
  | 'waving'
  | 'reading'
  | 'celebrating'
  | 'thinking'
  | 'pointing'
  | 'sleeping'
  | 'surprised'
  | 'sad';

// Stamp for collection
export interface Stamp {
  id: string;
  articleId: string;
  emoji: string;
  title: string;
  country: string;
  earnedAt: string;
}

// Reading progress
export interface ReadingProgress {
  articleId: string;
  issueId: string;
  completed: boolean;
  completedAt?: string;
  currentPage?: number;
  totalPages?: number;
}

// Analytics Event
export interface AnalyticsEvent {
  timestamp: string;
  event:
    | 'article_view'
    | 'article_complete'
    | 'stamp_earned'
    | 'quiz_completed'
    | 'issue_downloaded'
    | 'share_clicked';
  data: {
    articleId?: string;
    issueId?: string;
    quizScore?: number;
    timeSpent?: number;
  };
}

// Download status for offline
export interface DownloadStatus {
  issueId: string;
  downloaded: boolean;
  downloadedAt?: string;
  sizeBytes?: number;
}
