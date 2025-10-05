import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GamificationStats, BadgeId, Task } from '../types';
import localforage from 'localforage';
import { isYesterday, format } from 'date-fns';
import toast from 'react-hot-toast';

interface GamificationState extends GamificationStats {
  awardPoints: (points: number) => void;
  updateStreak: () => void;
  unlockBadge: (badgeId: BadgeId) => void;
  checkAndAwardBadges: (completedTask: Task, allTasks: Task[]) => void;
}

const initialState: GamificationStats = {
  points: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastCompletionDate: null,
  unlockedBadges: [],
};

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      ...initialState,
      awardPoints: (points) => set((state) => ({ points: state.points + points })),
      updateStreak: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const lastDate = get().lastCompletionDate;

        if (lastDate === today) return;

        let newStreak = 1;
        if (lastDate && isYesterday(new Date(lastDate))) {
          newStreak = get().currentStreak + 1;
        }

        set((state) => ({
          currentStreak: newStreak,
          longestStreak: Math.max(state.longestStreak, newStreak),
          lastCompletionDate: today,
        }));
      },
      unlockBadge: (badgeId) => {
        if (!get().unlockedBadges.includes(badgeId)) {
          set((state) => ({
            unlockedBadges: [...state.unlockedBadges, badgeId],
          }));
          toast.success(`🏆 Badge Unlocked: ${badgeId.replace('_', ' ')}!`);
        }
      },
      checkAndAwardBadges: (_completedTask, allTasks) => {
        const { unlockBadge, currentStreak } = get();
        const completedTasks = allTasks.filter(t => t.isCompleted);

        if (completedTasks.length === 1) {
          unlockBadge('FIRST_TASK');
        }
        if (currentStreak >= 3 && !get().unlockedBadges.includes('STREAK_3_DAYS')) {
          unlockBadge('STREAK_3_DAYS');
        }
      },
    }),
    {
      name: 'zenith-gamification-storage',
      storage: createJSONStorage(() => localforage),
    }
  )
);