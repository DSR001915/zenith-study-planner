// import React from 'react';
import { TodaysTasks } from '../components/dashboard/TodaysTasks';
import { ProgressChart } from '../components/dashboard/ProgressChart';
import { GamificationStats } from '../components/dashboard/GamificationStats';
import { Header } from '../components/layout/Header';
import { useUIStore } from '../store/uiStore';

export const DashboardPage = () => {
    const { isFocusMode } = useUIStore();

    return (
        <div>
            {!isFocusMode && <Header />}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <TodaysTasks />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <GamificationStats />
                    <ProgressChart />
                </div>
            </div>
        </div>
    );
};