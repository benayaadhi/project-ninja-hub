
import { Navbar } from "@/components/Navbar";
import { Board } from "@/components/Board";
import { ChartBar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center justify-between mb-8">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">
                Team Workload
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Track and manage your team's social media tasks and campaigns.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ChartBar className="w-4 h-4" />
                <span>Total Active Tasks: {3}</span>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Workload
              </Button>
            </div>
          </div>
          <Board />
        </div>
      </main>
    </div>
  );
};

export default Index;
