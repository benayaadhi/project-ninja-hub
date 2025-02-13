
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ProgressPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state;

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Task not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6 -ml-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tasks
        </Button>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{task.title}</h1>
            <p className="mt-2 text-gray-600">{task.description}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-50 rounded-lg p-4 flex-1">
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {task.status.replace("-", " ")}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex-1">
              <h3 className="text-sm font-medium text-gray-500">Assignee</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {task.assignee}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex-1">
              <h3 className="text-sm font-medium text-gray-500">Platform</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {task.platform}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Hours Spent</span>
              </div>
              <span className="font-medium">{task.hoursSpent}h</span>
            </div>
            <Progress value={33} className="h-2" />
          </div>

          {task.dueDate && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Due: {task.dueDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
