
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageCircle,
  Tag,
  Users,
  Paperclip,
  MapPin,
  Copy,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

const ProgressPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state;
  const [description, setDescription] = useState(task?.description || "");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  
  const activities: Activity[] = [
    {
      id: "1",
      user: "Alex",
      action: "moved this card from To do to Doing",
      timestamp: "6 hours ago"
    },
    {
      id: "2",
      user: "Alex",
      action: "added this card to To do",
      timestamp: "9 hours ago"
    }
  ];

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Task not found</p>
      </div>
    );
  }

  const handleDescriptionSave = () => {
    setIsEditingDescription(false);
    // Here you would typically save the changes to your backend
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6 -ml-4 text-gray-300 hover:text-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Board
        </Button>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">{task.title}</h1>
              <p className="text-sm text-gray-400">
                in list <Badge variant="secondary">{task.status}</Badge>
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Users className="h-4 w-4" />
                <span className="ml-2">Join</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <MessageCircle className="w-5 h-5 mt-1 text-gray-400" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-2">Description</h3>
                    {isEditingDescription ? (
                      <div className="space-y-2">
                        <Textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="min-h-[100px] bg-gray-800 border-gray-700"
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={handleDescriptionSave}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsEditingDescription(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="text-sm text-gray-300 p-2 rounded hover:bg-gray-800 cursor-pointer"
                        onClick={() => setIsEditingDescription(true)}
                      >
                        {description || "Add a more detailed description..."}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Clock className="w-5 h-5 mt-1 text-gray-400" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-2">Activity</h3>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-purple-600">
                              {activity.user[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span>{" "}
                              {activity.action}
                            </p>
                            <p className="text-xs text-gray-400">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Add to card</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Members
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Tag className="w-4 h-4 mr-2" />
                    Labels
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Dates
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attachment
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </Button>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div>
                <h3 className="text-sm font-medium mb-2">Actions</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MoreHorizontal className="w-4 h-4 mr-2" />
                    More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
