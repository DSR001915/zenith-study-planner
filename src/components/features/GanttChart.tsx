// import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { useTaskStore } from '../../store/taskStore';
import { differenceInDays, format, isValid } from 'date-fns';

const GanttChart = () => {
    const projects = useProjectStore((state) => state.projects);
    const tasks = useTaskStore((state) => state.tasks);

    if (projects.length === 0) {
        return <p className="text-gray-500 dark:text-gray-400">No projects created yet. Add a project to see its timeline.</p>;
    }

    return (
        <div className="space-y-8">
            {projects.map(project => {
                const projectStart = new Date(project.startDate);
                const projectEnd = new Date(project.endDate);

                if (!isValid(projectStart) || !isValid(projectEnd)) return null;

                const totalDuration = differenceInDays(projectEnd, projectStart) + 1;
                if (totalDuration <= 0) return null;

                const projectTasks = tasks.filter(t => t.projectId === project.id);

                return (
                    <div key={project.id}>
                        <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {format(projectStart, 'MMM d')} - {format(projectEnd, 'MMM d, yyyy')} ({totalDuration} days)
                        </p>
                        <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                            {projectTasks.map(task => {
                                const taskStart = new Date(task.dueDate);
                                if (!isValid(taskStart)) return null;
                                
                                const offset = differenceInDays(taskStart, projectStart);
                                if (offset < 0 || offset >= totalDuration) return null;

                                const leftPercentage = (offset / totalDuration) * 100;

                                return (
                                    <div
                                        key={task.id}
                                        className="absolute h-full top-0 group"
                                        style={{ left: `${leftPercentage}%` }}
                                        title={task.title}
                                    >
                                        <div className={`h-full w-1.5 rounded-full mx-auto ${task.isCompleted ? 'bg-green-500' : 'bg-indigo-500'}`}></div>
                                        <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-xs rounded py-1 px-2 z-10">
                                            {task.title}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GanttChart;