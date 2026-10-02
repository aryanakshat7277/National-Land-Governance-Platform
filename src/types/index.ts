// ============================================================
// CORE TYPES FOR LAND GOVERNANCE PLATFORM
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'public' | 'researcher' | 'official' | 'admin';
  organization: string;
  avatar?: string;
  joinedAt: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'research' | 'policy' | 'dataset' | 'case_study' | 'legal' | 'report' | 'guideline';
  category: string;
  author: string;
  organization: string;
  publishedAt: string;
  tags: string[];
  state?: string;
  abstract: string;
  downloads: number;
  views: number;
  citations: number;
  fileSize?: string;
  fileType?: string;
  doi?: string;
  isAIIndexed: boolean;
  coverImage?: string;
}

export interface StatCard {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: 'blue' | 'amber' | 'green' | 'red' | 'purple';
}

export interface GISLayer {
  id: string;
  name: string;
  description: string;
  type: 'choropleth' | 'heatmap' | 'marker' | 'boundary';
  active: boolean;
  color: string;
  legendItems: { label: string; color: string; value?: number }[];
}

export interface ResearchWorkspace {
  id: string;
  title: string;
  description: string;
  members: { id: string; name: string; role: string; avatar?: string }[];
  tags: string[];
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  lastActivity: string;
  documentsCount: number;
  messagesCount: number;
  coverImage?: string;
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  theme: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  participants: number;
  status: 'upcoming' | 'active' | 'completed';
  organizer: string;
  tags: string[];
  coverImage?: string;
}

export interface PolicySimParam {
  id: string;
  label: string;
  type: 'slider' | 'select' | 'toggle';
  value: number | string | boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  unit?: string;
}

export interface PolicySimResult {
  scenario: string;
  indicators: {
    label: string;
    baseline: number;
    simulated: number;
    unit: string;
    impact: 'positive' | 'negative' | 'neutral';
  }[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  category: string;
  url?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'research';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
