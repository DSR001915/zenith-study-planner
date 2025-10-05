import React, { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useProjectStore } from '../../store/projectStore';
import type { Priority } from '../../types';
import toast from 'react-hot-toast';

interface TaskFormProps {
    onClose: () => void;
}

export const TaskForm = ({ onClose }: TaskFormProps) => {
    const addTask = useTaskStore((state) => state.addTask);
    const projects = useProjectStore((state) => state.projects);

    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<Priority>('Medium');
    const [description, setDescription] = useState('');
    const [projectId, setProjectId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !subject || !dueDate) {
            toast.error('Please fill in all required fields.');
            return;
        }

        addTask({
            title,
            subject,
            dueDate: new Date(dueDate).toISOString(),
            priority,
            description,
            projectId: projectId || undefined,
        });

        toast.success('New task created!');
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-style" required />
            <input type="text" placeholder="Subject/Course" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-style" required />
            <div className="grid grid-cols-2 gap-4">
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="input-style" required />
                <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="input-style">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="input-style">
                <option value="">Assign to a project (Optional)</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
            <textarea placeholder="Description (Optional)" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="input-style" />
            <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                    Cancel
                </button>
                <button type="submit" className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
                    Add Task
                </button>
            </div>
        </form>
    );
};