
import { TaskCard } from "./TaskCard";

const mockTasks = [
  {
    title: "Design System Updates",
    description: "Update color palette and typography in the design system",
    status: "in-progress",
    assignee: "Alex Chen",
    priority: "high",
  },
  {
    title: "User Research",
    description: "Conduct user interviews for new feature development",
    status: "todo",
    assignee: "Sarah Smith",
    priority: "medium",
  },
  {
    title: "Bug Fixes",
    description: "Fix reported issues in the authentication flow",
    status: "done",
    assignee: "Mike Johnson",
    priority: "low",
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
