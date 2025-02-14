
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const mockData = [
  { date: "03/15", ideal: 100, remaining: 100, completed: 0 },
  { date: "03/16", ideal: 90, remaining: 95, completed: 5 },
  { date: "03/17", ideal: 80, remaining: 85, completed: 15 },
  { date: "03/18", ideal: 70, remaining: 75, completed: 25 },
  { date: "03/19", ideal: 60, remaining: 65, completed: 35 },
  { date: "03/20", ideal: 50, remaining: 45, completed: 55 },
  { date: "03/21", ideal: 40, remaining: 35, completed: 65 },
  { date: "03/22", ideal: 30, remaining: 25, completed: 75 },
  { date: "03/23", ideal: 20, remaining: 15, completed: 85 },
  { date: "03/24", ideal: 10, remaining: 5, completed: 95 },
  { date: "03/25", ideal: 0, remaining: 0, completed: 100 },
];

const TeamTracker = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6 -ml-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Board
        </Button>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Sprint Burndown
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Track team progress and velocity
            </p>
          </div>

          <div className="h-[400px] w-full">
            <ChartContainer
              className="h-full"
              config={{
                ideal: { label: "Ideal Burndown", color: "#3B82F6" },
                remaining: { label: "Remaining Work", color: "#F97316" },
                completed: { label: "Completed Work", color: "#22C55E" },
              }}
            >
              <LineChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ideal"
                  stroke="#3B82F6"
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="remaining"
                  stroke="#F97316"
                  dot={true}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#22C55E"
                  dot={true}
                />
              </LineChart>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-700">Total Hours</h3>
              <p className="mt-2 text-2xl font-semibold text-blue-900">100</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-orange-700">
                Remaining Hours
              </h3>
              <p className="mt-2 text-2xl font-semibold text-orange-900">45</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-700">
                Completed Hours
              </h3>
              <p className="mt-2 text-2xl font-semibold text-green-900">55</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamTracker;
