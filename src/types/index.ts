export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description?: string;
  subject: string;
  dueDate: string; // ISO 8601 string format
  priority: Priority;
  isCompleted: boolean;
  createdAt: string; // ISO 8601 string format
  projectId?: string;
}

export interface Project {
  id: string;
  title: string;
  startDate: string; // ISO Date string (YYYY-MM-DD)
  endDate: string; // ISO Date string (YYYY-MM-DD)
}

export type BadgeId = 
  | 'FIRST_TASK'
  | 'WEEKEND_WARRIOR'
  | 'SUBJECT_MASTER_10'
  | 'STREAK_3_DAYS';

export interface GamificationStats {
  points: number;
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate: string | null; // ISO date string (YYYY-MM-DD)
  unlockedBadges: BadgeId[];
}