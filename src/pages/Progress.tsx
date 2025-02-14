
import { useState, useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: "move" | "create" | "edit" | "comment";
}

const ProgressPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const task = location.state;
  const [description, setDescription] = useState(task?.description || "");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from your API
    const taskId = decodeURIComponent(location.pathname.split('/').pop() || '');
    const mockActivities: Activity[] = [
      {
        id: "1",
        user: "Alex",
        action: `moved "${taskId}" from To do to Doing`,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        type: "move"
      },
      {
        id: "2",
        user: "Alex",
        action: `created "${taskId}"`,
        timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
        type: "create"
      }
    ];
    setActivities(mockActivities);
  }, [location.pathname]);

  if (!task) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Task not found</p>
      </div>
    );
  }

  const handleDescriptionSave = () => {
    setIsEditingDescription(false);
    toast({
      title: "Description updated",
      description: "Task description has been saved successfully.",
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6 -ml-4 hover:bg-secondary"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Board
        </Button>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-foreground">{task.title}</h1>
              <p className="text-sm text-muted-foreground">
                in list <Badge variant="secondary">{task.status}</Badge>
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4" />
                <span className="ml-2">Join</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <MessageCircle className="w-5 h-5 mt-1 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-foreground mb-2">Description</h3>
                    {isEditingDescription ? (
                      <div className="space-y-2">
                        <Textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="min-h-[100px] bg-background border-input"
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={handleDescriptionSave}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsEditingDescription(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="text-sm text-muted-foreground p-2 rounded hover:bg-secondary/50 cursor-pointer"
                        onClick={() => setIsEditingDescription(true)}
                      >
                        {description || "Add a more detailed description..."}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Clock className="w-5 h-5 mt-1 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-foreground mb-2">Activity</h3>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 animate-fade-in">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {activity.user[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">
                              <span className="font-medium">{activity.user}</span>{" "}
                              {activity.action}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatTimestamp(activity.timestamp)}
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
                <h3 className="text-sm font-medium text-foreground mb-2">Add to card</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start hover:bg-secondary">
                    <Users className="w-4 h-4 mr-2" />
                    Members
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-secondary">
                    <Tag className="w-4 h-4 mr-2" />
                    Labels
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-secondary">
                    <Calendar className="w-4 h-4 mr-2" />
                    Dates
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-secondary">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attachment
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-secondary">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </Button>
                </div>
              </div>

              <Separator className="bg-border" />

              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">Actions</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start hover:bg-secondary">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-secondary">
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
