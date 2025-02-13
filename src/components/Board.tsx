
import { TaskCard } from "./TaskCard";

const mockTasks = [
  {
    title: "Instagram Content Calendar",
    description: "Create and schedule content for client XYZ's Instagram",
    status: "in-progress",
    assignee: "Alex Chen",
    priority: "high",
    platform: "instagram",
    hoursSpent: 4,
    dueDate: "2024-03-20",
  },
  {
    title: "Facebook Ad Campaign",
    description: "Design and launch Q1 promotional campaign for client ABC",
    status: "todo",
    assignee: "Sarah Smith",
    priority: "medium",
    platform: "facebook",
    hoursSpent: 2,
    dueDate: "2024-03-25",
  },
  {
    title: "LinkedIn Company Page Setup",
    description: "Set up and optimize client DEF's LinkedIn presence",
    status: "done",
    assignee: "Mike Johnson",
    priority: "low",
    platform: "linkedin",
    hoursSpent: 6,
    dueDate: "2024-03-15",
  },
] as const;

export const Board = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {mockTasks.map((task, index) => (
        <TaskCard key={index} {...task} />
      ))}
    </div>
  );
};
