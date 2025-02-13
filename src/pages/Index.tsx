
import { Navbar } from "@/components/Navbar";
import { Board } from "@/components/Board";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all projects and their current status.
              </p>
            </div>
          </div>
          <Board />
        </div>
      </main>
    </div>
  );
};

export default Index;
