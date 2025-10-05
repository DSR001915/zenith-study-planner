// import React from 'react';
import { useUIStore } from '../store/uiStore';

export const SettingsPage = () => {
    const { sound, setSound } = useUIStore();

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div>
                <label htmlFor="focusSound" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Focus Mode Sound
                </label>
                <select
                    id="focusSound"
                    value={sound}
                    onChange={(e) => setSound(e.target.value as any)}
                    className="mt-1 block w-full max-w-xs pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="none">None</option>
                    <option value="rain">Rain</option>
                    <option value="cafe">Cafe</option>
                </select>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Select a sound to play when you enter Focus Mode.
                </p>
            </div>
        </div>
    );
};