// src/components/layout/Layout.tsx
import { Outlet, Link } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { FocusScene } from '../features/FocusScene';

export const Layout = () => {
  const { isFocusMode } = useUIStore();

  return (
    <div
      className={`relative flex h-screen transition-colors duration-300 ${
        isFocusMode
          ? 'bg-gray-900 text-gray-200'
          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      }`}
    >
      {/* Ambient background animation (behind content) */}
      <FocusScene />

      <aside
        className={`relative z-10 transition-all duration-300 ${
          isFocusMode ? '-ml-64' : 'ml-0'
        } w-64 bg-white p-4 shadow-md dark:bg-gray-800 dark:border-r dark:border-gray-700 flex-shrink-0`}
      >
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Zenith</h1>
        <nav className="mt-8 space-y-2">
          <Link to="/" className="block py-2 px-4 rounded hover:bg-indigo-50 dark:hover:bg-gray-700">Dashboard</Link>
          <Link to="/tasks" className="block py-2 px-4 rounded hover:bg-indigo-50 dark:hover:bg-gray-700">Tasks</Link>
          <Link to="/calendar" className="block py-2 px-4 rounded hover:bg-indigo-50 dark:hover:bg-gray-700">Calendar</Link>
          <Link to="/projects" className="block py-2 px-4 rounded hover:bg-indigo-50 dark:hover:bg-gray-700">Projects</Link>
          <Link to="/settings" className="block py-2 px-4 rounded hover:bg-indigo-50 dark:hover:bg-gray-700">Settings</Link>
        </nav>
      </aside>

      <main className="relative z-10 flex-1 p-8 overflow-y-auto transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};
