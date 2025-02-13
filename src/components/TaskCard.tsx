
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  assignee?: string;
  priority?: "low" | "medium" | "high";
}

export const TaskCard = ({
  title,
  description,
  status,
  assignee,
  priority = "medium",
}: TaskCardProps) => {
  const priorityColors = {
    low: "bg-gray-100 text-gray-600",
    medium: "bg-purple-100 text-purple-600",
    high: "bg-red-100 text-red-600",
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              priorityColors[priority]
            )}
          >
            {priority}
          </span>
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              status === "todo" && "bg-status-todo text-gray-700",
              status === "in-progress" && "bg-status-in-progress text-blue-700",
              status === "done" && "bg-status-done text-green-700"
            )}
          >
            {status.replace("-", " ")}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1 text-sm line-clamp-2">{description}</p>
        </div>
        {assignee && (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-xs font-medium text-purple-600">
                {assignee.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-gray-600">{assignee}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
