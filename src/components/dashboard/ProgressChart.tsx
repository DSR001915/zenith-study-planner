// import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export const ProgressChart = () => {
    const { theme } = useTheme();
    const tasks = useTaskStore((state) => state.tasks);

    const completedCount = tasks.filter((task) => task.isCompleted).length;
    const pendingCount = tasks.length - completedCount;

    const data = [
        { name: 'Completed', value: completedCount },
        { name: 'Pending', value: pendingCount },
    ];

    const COLORS = ['#4F46E5', '#9CA3AF']; // Indigo, Gray

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-full">
            <h3 className="font-semibold text-lg mb-2">Overall Progress</h3>
            {tasks.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            stroke={theme === 'dark' ? '#1F2937' : '#FFFFFF'} // Match bg color for clean look
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                                borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB'
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 py-8">
                    <p>Add a task to see your progress!</p>
                </div>
            )}
        </div>
    );
};