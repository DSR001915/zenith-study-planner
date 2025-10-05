// import React from 'react';
import type { Task } from '../../types';
import { useTaskStore } from '../../store/taskStore';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import toast from 'react-hot-toast';

interface TaskItemProps {
    task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
    const { toggleTaskCompletion, deleteTask } = useTaskStore();

    const priorityColor = {
        Low: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        High: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    };

    const handleDelete = () => {
        deleteTask(task.id);
        toast.error('Task deleted.');
    };

    return (
        <div className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50">
            <button onClick={() => toggleTaskCompletion(task.id)} className="mr-4">
                {task.isCompleted ? (
                    <CheckCircle className="text-green-500" />
                ) : (
                    <Circle className="text-gray-400 dark:text-gray-500" />
                )}
            </button>
            <div className="flex-1">
                <p className={`font-medium ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{task.subject}</p>
            </div>
            <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColor[task.priority]}`}>
                    {task.priority}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <button onClick={handleDelete} className="text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};