// import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import { TaskItem } from './TaskItem';

export const TaskList = () => {
    const tasks = useTaskStore((state) => state.tasks);

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
        }
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {sortedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};