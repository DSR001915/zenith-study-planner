import { useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Views,
  type Event,
} from "react-big-calendar";
import moment from "moment";
import { useTaskStore } from "../store/taskStore";
import { Modal } from "../components/common/Modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendar.css";

// ✅ Create localizer using moment
const localizer = momentLocalizer(moment);

interface CustomEvent extends Event {
  type: "task" | "tip" | "event";
  description?: string;
  priority?: string;
  isCompleted?: boolean;
}

export const CalendarPage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const [customEvents, setCustomEvents] = useState<CustomEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    type: "tip",
  });

  // Convert tasks from global store to calendar events
  const taskEvents: CustomEvent[] = tasks.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    title: task.title,
    type: "task",
    description: task.subject,
    priority: task.priority,
    isCompleted: task.isCompleted,
    allDay: true,
  }));

  const allEvents: CustomEvent[] = [...taskEvents, ...customEvents];

  // Customize event colors and styles
  const eventStyleGetter = (event: CustomEvent) => {
    let backgroundColor = "#3182CE"; // default blue

    if (event.type === "tip") backgroundColor = "#805AD5"; // purple
    if (event.type === "event") backgroundColor = "#DD6B20"; // orange
    if (event.type === "task") {
      if (event.isCompleted) backgroundColor = "#A0AEC0";
      else if (event.priority === "High") backgroundColor = "#E53E3E";
      else if (event.priority === "Medium") backgroundColor = "#D69E2E";
      else backgroundColor = "#38A169";
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block",
        fontWeight: 500,
      },
    };
  };

  // Open modal when user clicks an empty date slot
  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    setIsModalOpen(true);
  };

  // Add a new tip/event/note
  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;
    const event: CustomEvent = {
      start: selectedDate || new Date(),
      end: selectedDate || new Date(),
      title: newEvent.title,
      description: newEvent.description,
      type: newEvent.type as "tip" | "event" | "task",
      allDay: true,
    };
    setCustomEvents((prev) => [...prev, event]);
    setNewEvent({ title: "", description: "", type: "tip" });
    setIsModalOpen(false);
  };

  // Show details when user clicks on an event
  const handleSelectEvent = (event: CustomEvent) => {
    alert(
      `${event.title}\n\n${
        event.description || "No details"
      }\nType: ${event.type.toUpperCase()}`
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg relative">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        📅 Study Calendar
      </h2>

      <div style={{ height: "80vh" }}>
        <Calendar
          localizer={localizer} // ✅ Using moment localizer
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.MONTH}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          style={{ height: "100%" }}
          eventPropGetter={eventStyleGetter}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          popup
          tooltipAccessor={(event) =>
            event.description || event.type.toUpperCase()
          }
        />
      </div>

      {/* Add Tip/Event Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedDate
            ? `Add Note or Event - ${moment(selectedDate).format("MMM DD, YYYY")}`
            : "Add Note/Event"
        }
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full px-3 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-md"
          />
          <textarea
            placeholder="Description (Optional)"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            rows={3}
            className="w-full px-3 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-md"
          />

          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Type:
            </label>
            <select
              value={newEvent.type}
              onChange={(e) =>
                setNewEvent({ ...newEvent, type: e.target.value })
              }
              className="px-3 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-md"
            >
              <option value="tip">Tip / Note</option>
              <option value="event">Event</option>
            </select>
          </div>

          <button
            onClick={handleAddEvent}
            className="w-full py-2 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
          >
            Add to Calendar
          </button>
        </div>
      </Modal>
    </div>
  );
};
