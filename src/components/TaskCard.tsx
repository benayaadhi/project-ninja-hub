
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  assignee?: string;
  priority?: "low" | "medium" | "high";
  platform?: "instagram" | "facebook" | "twitter" | "linkedin";
  hoursSpent?: number;
  dueDate?: string;
}

export const TaskCard = ({
  title,
  description,
  status,
  assignee,
  priority = "medium",
  platform,
  hoursSpent = 0,
  dueDate,
}: TaskCardProps) => {
  const navigate = useNavigate();
  
  const priorityColors = {
    low: "bg-gray-100 text-gray-600",
    medium: "bg-purple-100 text-purple-600",
    high: "bg-red-100 text-red-600",
  };

  const platformColors = {
    instagram: "bg-pink-100 text-pink-600",
    facebook: "bg-blue-100 text-blue-600",
    twitter: "bg-sky-100 text-sky-600",
    linkedin: "bg-indigo-100 text-indigo-600",
  };

  const handleClick = () => {
    navigate(`/progress/${encodeURIComponent(title)}`, { 
      state: { 
        title, 
        description, 
        status, 
        assignee, 
        priority, 
        platform, 
        hoursSpent, 
        dueDate 
      } 
    });
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                priorityColors[priority]
              )}
            >
              {priority}
            </span>
            {platform && (
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  platformColors[platform]
                )}
              >
                {platform}
              </span>
            )}
          </div>
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              status === "todo" && "bg-gray-100 text-gray-700",
              status === "in-progress" && "bg-blue-100 text-blue-700",
              status === "done" && "bg-green-100 text-green-700"
            )}
          >
            {status.replace("-", " ")}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1 text-sm line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{hoursSpent}h spent</span>
          </div>
          {dueDate && (
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(dueDate).toLocaleDateString()}</span>
            </div>
          )}
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
