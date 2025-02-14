
import { Navbar } from "@/components/Navbar";
import { KanbanBoard } from "@/components/KanbanBoard";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

const KanbanPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center justify-between mb-8">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">
                Project Board
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Manage tasks and track progress across your team.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:space-x-4">
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Invite Members
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>
          <KanbanBoard />
        </div>
      </main>
    </div>
  );
};

export default KanbanPage;
