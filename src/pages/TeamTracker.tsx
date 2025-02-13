
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
  { date: "11/07", ideal: 120, remaining: 115, scope: 120 },
  { date: "11/09", ideal: 100, remaining: 105, scope: 120 },
  { date: "11/11", ideal: 80, remaining: 95, scope: 120 },
  { date: "11/13", ideal: 60, remaining: 70, scope: 120 },
  { date: "11/15", ideal: 40, remaining: 65, scope: 120 },
  { date: "11/17", ideal: 20, remaining: 30, scope: 120 },
  { date: "11/19", ideal: 10, remaining: 15, scope: 120 },
  { date: "11/21", ideal: 0, remaining: 0, scope: 120 },
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
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tasks
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
                scope: { label: "Sprint Scope", color: "#22C55E" },
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
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="remaining"
                  stroke="#F97316"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="scope"
                  stroke="#22C55E"
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-700">Planned Hours</h3>
              <p className="mt-2 text-2xl font-semibold text-blue-900">120</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-orange-700">
                Remaining Hours
              </h3>
              <p className="mt-2 text-2xl font-semibold text-orange-900">65</p>
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
