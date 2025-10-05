// import React from 'react';
import { useGamificationStore } from '../../store/gamificationStore';
import { Star, Flame, Trophy } from 'lucide-react';

export const GamificationStats = () => {
    const { points, currentStreak, longestStreak } = useGamificationStore();

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-full">
            <h3 className="font-semibold text-lg mb-4">Your Stats</h3>
            <div className="space-y-4">
                <div className="flex items-center">
                    <Star className="text-yellow-400 mr-3" size={24} />
                    <div>
                        <p className="font-bold text-xl">{points}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Points</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Flame className="text-orange-500 mr-3" size={24} />
                    <div>
                        <p className="font-bold text-xl">{currentStreak}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Study Streak</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Trophy className="text-indigo-500 mr-3" size={24} />
                    <div>
                        <p className="font-bold text-xl">{longestStreak}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Longest Streak</p>
                    </div>
                </div>
            </div>
        </div>
    );
};