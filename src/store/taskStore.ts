// src/store/taskStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Task } from '../types'; // ✅ type-only import
import { v4 as uuidv4 } from 'uuid';
import localforage from 'localforage';
import { useGamificationStore } from './gamificationStore';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'isCompleted' | 'createdAt'>) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: uuidv4(),
          isCompleted: false,
          createdAt: new Date().toISOString(),
        };
        set({ tasks: [...get().tasks, newTask] });
      },

      updateTask: (id, updatedTask) => {
        set({
          tasks: get().tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        });
      },

      deleteTask: (id) => {
        set({ tasks: get().tasks.filter((task) => task.id !== id) });
      },

      toggleTaskCompletion: (id) => {
        let completedTask: Task | undefined;

        const updatedTasks = get().tasks.map((task) => {
          if (task.id === id) {
            const updated: Task = { ...task, isCompleted: !task.isCompleted };
            if (updated.isCompleted) completedTask = updated;
            return updated;
          }
          return task;
        });

        set({ tasks: updatedTasks });

        if (completedTask) {
          // Gamification integration
          const { awardPoints, updateStreak, checkAndAwardBadges } = useGamificationStore.getState();

          const points: Record<Task['priority'], number> = {
            Low: 5,
            Medium: 10,
            High: 20,
          };

          awardPoints(points[completedTask.priority]);
          updateStreak();
          checkAndAwardBadges(completedTask, get().tasks);
        }
      },
    }),
    {
      name: 'zenith-task-storage',
      storage: createJSONStorage(() => localforage),
    }
  )
);
