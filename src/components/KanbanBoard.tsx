
import { useState } from "react";
import { Card } from "./ui/card";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { TaskCard } from "./TaskCard";

interface KanbanTask {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  assignee?: string;
  priority: "low" | "medium" | "high";
  platform?: "instagram" | "facebook" | "twitter" | "linkedin";
  hoursSpent: number;
  dueDate?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          title: "Create Social Media Calendar",
          description: "Plan content for next month",
          status: "todo",
          priority: "high",
          platform: "instagram",
          hoursSpent: 0,
          dueDate: "2024-03-25",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        {
          title: "Design Instagram Posts",
          description: "Create visuals for upcoming campaign",
          status: "in-progress",
          assignee: "John Doe",
          priority: "medium",
          platform: "instagram",
          hoursSpent: 2,
          dueDate: "2024-03-20",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          title: "Website Copy Review",
          description: "Review and approve website content",
          status: "done",
          assignee: "Jane Smith",
          priority: "low",
          hoursSpent: 4,
          dueDate: "2024-03-15",
        },
      ],
    },
  ]);

  const handleDragStart = (e: React.DragEvent, taskIndex: number, sourceColumn: string) => {
    e.dataTransfer.setData("taskIndex", taskIndex.toString());
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    e.preventDefault();
    
    const taskIndex = parseInt(e.dataTransfer.getData("taskIndex"));
    const sourceColumn = e.dataTransfer.getData("sourceColumn");
    
    if (sourceColumn === targetColumn) return;

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn);
      const targetColIndex = newColumns.findIndex(col => col.id === targetColumn);
      
      const [task] = newColumns[sourceColIndex].tasks.splice(taskIndex, 1);
      task.status = targetColumn as "todo" | "in-progress" | "done";
      newColumns[targetColIndex].tasks.push(task);
      
      return newColumns;
    });
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-gray-50 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">{column.title}</h3>
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                {column.tasks.length}
              </span>
            </div>
            <div className="space-y-4">
              {column.tasks.map((task, index) => (
                <div
                  key={task.title}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index, column.id)}
                >
                  <TaskCard {...task} />
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
