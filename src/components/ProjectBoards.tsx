
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  description: string;
  tasksCount: number;
  client: string;
}

const mockProjects: Project[] = [
  {
    id: "xyz-instagram",
    name: "XYZ Social Media",
    description: "Instagram and Facebook campaign management",
    tasksCount: 3,
    client: "XYZ Corp",
  },
  {
    id: "abc-digital",
    name: "ABC Digital Marketing",
    description: "Full digital marketing campaign Q1 2024",
    tasksCount: 5,
    client: "ABC Inc",
  },
];

export const ProjectBoards = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <Card
            key={project.id}
            className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/board/${project.id}`)}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {project.tasksCount} tasks
                </span>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="pt-4 border-t">
                <span className="text-sm font-medium text-purple-600">
                  {project.client}
                </span>
              </div>
            </div>
          </Card>
        ))}
        <Card
          className="p-6 border-2 border-dashed hover:border-gray-400 transition-all duration-300 cursor-pointer flex items-center justify-center"
          onClick={() => navigate("/board/new")}
        >
          <div className="text-center">
            <Plus className="w-8 h-8 mx-auto text-gray-400" />
            <h3 className="mt-2 font-medium text-gray-900">Create New Board</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start a new project board
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
