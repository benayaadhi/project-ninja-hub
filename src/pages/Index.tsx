
import { Navbar } from "@/components/Navbar";
import { ProjectBoards } from "@/components/ProjectBoards";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center justify-between mb-8">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">
                Project Boards
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Manage your client projects and team workload
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button onClick={() => navigate("/board/new")}>
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
          <ProjectBoards />
        </div>
      </main>
    </div>
  );
};

export default Index;
