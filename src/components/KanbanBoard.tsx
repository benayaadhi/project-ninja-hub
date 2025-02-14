
import { useState } from "react";
import { Card } from "./ui/card";
import { Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { TaskCard } from "./TaskCard";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<KanbanTask | null>(null);
  const [editingColumnId, setEditingColumnId] = useState<string>("");

  const [newTask, setNewTask] = useState<KanbanTask>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    hoursSpent: 0,
  });

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

  const handleAddTask = (columnId: string) => {
    setEditingTask(null);
    setEditingColumnId(columnId);
    setNewTask({
      title: "",
      description: "",
      status: columnId as "todo" | "in-progress" | "done",
      priority: "medium",
      hoursSpent: 0,
    });
    setIsDialogOpen(true);
  };

  const handleEditTask = (task: KanbanTask, columnId: string) => {
    setEditingTask(task);
    setEditingColumnId(columnId);
    setNewTask(task);
    setIsDialogOpen(true);
  };

  const handleSaveTask = () => {
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      const columnIndex = newColumns.findIndex(col => col.id === editingColumnId);
      
      if (editingTask) {
        // Edit existing task
        const taskIndex = newColumns[columnIndex].tasks.findIndex(
          t => t.title === editingTask.title
        );
        newColumns[columnIndex].tasks[taskIndex] = newTask;
      } else {
        // Add new task
        newColumns[columnIndex].tasks.push(newTask);
      }
      
      return newColumns;
    });
    
    setIsDialogOpen(false);
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
                  onClick={() => handleEditTask(task, column.id)}
                >
                  <TaskCard {...task} />
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400"
                onClick={() => handleAddTask(column.id)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingTask ? "Edit Task" : "Add New Task"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={newTask.title}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select
                value={newTask.priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setNewTask((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <Select
                value={newTask.platform}
                onValueChange={(value: "instagram" | "facebook" | "twitter" | "linkedin") =>
                  setNewTask((prev) => ({ ...prev, platform: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Assignee</label>
              <Input
                value={newTask.assignee || ""}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, assignee: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTask}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
