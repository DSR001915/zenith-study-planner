// import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import { isToday } from 'date-fns';
import { BookCheck } from 'lucide-react';

export const TodaysTasks = () => {
    const todaysTasks = useTaskStore((state) =>
        state.tasks.filter(
            (task) => !task.isCompleted && isToday(new Date(task.dueDate))
        )
    );

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-full">
            <h3 className="font-semibold text-lg mb-2">Due Today</h3>
            {todaysTasks.length > 0 ? (
                <div className="space-y-2">
                    {todaysTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                            <div>
                                <p className="font-medium">{task.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{task.subject}</p>
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-800' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                }`}>
                                {task.priority}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 py-8">
                    <BookCheck size={40} className="mb-2" />
                    <p className="font-medium">All caught up!</p>
                    <p className="text-sm">No tasks due today.</p>
                </div>
            )}
        </div>
    );
};