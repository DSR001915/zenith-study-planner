// src/pages/TasksPage.tsx
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { TaskList } from "../components/tasks/TaskList";
import { FocusHeaderTimer } from "../components/features/FocusHeaderTimer";
import { FocusModeToggle } from "../components/features/FocusModeToggle";
import { Modal } from "../components/common/Modal";
import { TaskForm } from "../components/tasks/TaskForm";
import { motion, AnimatePresence } from "framer-motion";

export const TasksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-400/5 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Study Tasks
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-transform hover:scale-105 shadow-md"
          >
            <PlusCircle size={20} />
            Add Task
          </button>
          <FocusModeToggle />
          <FocusHeaderTimer />
        </div>
      </div>

      {/* Animated tasks list */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10"
      >
        <TaskList />
      </motion.div>

      {/* AnimatePresence wraps the modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add New Study Task"
          >
            <TaskForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
