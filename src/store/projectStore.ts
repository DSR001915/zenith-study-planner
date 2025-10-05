import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Project } from '../types';
import { v4 as uuidv4 } from 'uuid';
import localforage from 'localforage';

interface ProjectState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      addProject: (project) => {
        const newProject = { ...project, id: uuidv4() };
        set({ projects: [...get().projects, newProject] });
      },
    }),
    {
      name: 'zenith-project-storage',
      storage: createJSONStorage(() => localforage),
    }
  )
);