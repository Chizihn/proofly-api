// User
export interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
  [key: string]: any;
}

export interface UserResponse {
  _id: string;
  civicId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  settings: UserSettings;
  badges: string[];
  progress: string[];
  isAdmin: boolean;
  wallet: string;
  followers: string[];
  following: string[];
}

export interface UpdateUserRequest {
  name?: string;
  settings?: Partial<UserSettings>;
}

// Track
export interface TrackResponse {
  _id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  modules: string[];
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
}

export interface CreateTrackRequest {
  title: string;
  description: string;
  icon?: string;
  category?: string;
  modules?: string[];
  isFeatured?: boolean;
}

// Module
export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface ModuleResponse {
  _id: string;
  trackId: string;
  title: string;
  content: string;
  order: number;
  quiz: QuizQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateModuleRequest {
  trackId: string;
  title: string;
  content: string;
  order: number;
  quiz?: QuizQuestion[];
}

// Progress
export interface ProgressResponse {
  _id: string;
  userId: string;
  trackId: string;
  completedModules: string[];
  lastAccessed: string;
  quizResults: Record<string, any>;
}

export interface UpdateProgressRequest {
  completedModules?: string[];
  quizResults?: Record<string, any>;
}

// Badge
export interface BadgeResponse {
  _id: string;
  name: string;
  description: string;
  icon: string;
  criteria: Record<string, any>;
  createdAt: string;
}

export interface CreateBadgeRequest {
  name: string;
  description: string;
  icon?: string;
  criteria: Record<string, any>;
}

// NFT
export interface NftResponse {
  _id: string;
  mintAddress: string;
  ownerWallet: string;
  trackId: string;
  txHash: string;
  metadataUri: string;
  createdAt: string;
}

// Auth
export interface AuthenticatedRequest {
  user: any;
}

// Error
export interface ErrorResponse {
  error: string;
} 