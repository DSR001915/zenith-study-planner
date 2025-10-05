import React, { useState } from "react";
import GanttChart from "../components/features/GanttChart";
import { useProjectStore } from "../store/projectStore";
import { motion } from "framer-motion";

interface ExtendedProject {
  id?: string;
  title: string;
  summary: string;
  tools: string;
  timeSpent: string;
  details: string;
  startDate: string;
  endDate: string;
}

export const ProjectsPage = () => {
  const addProject = useProjectStore((state) => state.addProject);
  const [projects, setProjects] = useState<ExtendedProject[]>([]);
  const [formData, setFormData] = useState<ExtendedProject>({
    title: "",
    summary: "",
    tools: "",
    timeSpent: "",
    details: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, startDate, endDate } = formData;
    if (title && startDate && endDate) {
      // Save minimal data to Zustand (for Gantt)
      addProject({ title, startDate, endDate });

      // Save extended data locally (for display)
      setProjects((prev) => [
        ...prev,
        { ...formData, id: crypto.randomUUID() },
      ]);

      // Reset form
      setFormData({
        title: "",
        summary: "",
        tools: "",
        timeSpent: "",
        details: "",
        startDate: "",
        endDate: "",
      });
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen">

      {/* === AI-inspired animated gradient background === */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 blur-3xl opacity-30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* === Main Content === */}
      <div className="relative space-y-6 z-10 p-4 lg:p-6">
        {/* New Project Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            🚀 Create a New Project
          </h2>

          <form
            onSubmit={handleAddProject}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              className="input-style"
              required
            />

            <input
              type="text"
              name="summary"
              placeholder="Short Summary"
              value={formData.summary}
              onChange={handleChange}
              className="input-style"
            />

            <input
              type="text"
              name="tools"
              placeholder="Tools / Technologies Used"
              value={formData.tools}
              onChange={handleChange}
              className="input-style"
            />

            <input
              type="text"
              name="timeSpent"
              placeholder="Time Spent (e.g., 15 hrs / 2 weeks)"
              value={formData.timeSpent}
              onChange={handleChange}
              className="input-style"
            />

            <textarea
              name="details"
              placeholder="Brief Details / Description"
              value={formData.details}
              onChange={handleChange}
              rows={3}
              className="input-style md:col-span-2"
            />

            {/* Dates */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-style"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input-style"
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-end mt-2">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg transition-all transform hover:scale-105 shadow-md"
              >
                Add Project
              </button>
            </div>
          </form>
        </div>

        {/* Project List Display */}
        {projects.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              📘 Added Projects
            </h2>
            <ul className="space-y-4">
              {projects.map((p) => (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:shadow-md dark:hover:shadow-gray-700 transition"
                >
                  <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                    {p.title}
                  </h3>
                  {p.summary && (
                    <p className="text-gray-700 dark:text-gray-300 italic mb-2">
                      {p.summary}
                    </p>
                  )}
                  {p.details && (
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {p.details}
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {p.tools && (
                      <p>
                        <strong>🛠 Tools:</strong> {p.tools}
                      </p>
                    )}
                    {p.timeSpent && (
                      <p>
                        <strong>⏱ Time Spent:</strong> {p.timeSpent}
                      </p>
                    )}
                    <p>
                      <strong>📅 Duration:</strong>{" "}
                      {p.startDate} → {p.endDate}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Gantt Chart below */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            📊 Project Timelines
          </h2>
          <GanttChart />
        </div>
      </div>
    </div>
  );
};