import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, Send, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();

  // Mock data for messages
  const recentMessages = [
    {
      id: 1,
      recipient: "All Students",
      message: "Today's lesson: English Basics - Greetings & Introductions",
      timestamp: "2024-07-03 09:00",
      status: "sent",
      recipients: 234
    },
    {
      id: 2,
      recipient: "Marketing Group",
      message: "Digital Marketing: Social Media Basics lesson is ready!",
      timestamp: "2024-07-02 14:30",
      status: "delivered",
      recipients: 187
    },
    {
      id: 3,
      recipient: "New Students",
      message: "Welcome to Daily Burst Coach! Your learning journey starts now.",
      timestamp: "2024-07-02 10:15",
      status: "read",
      recipients: 45
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-blue-500";
      case "delivered": return "bg-green-500";
      case "read": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            WhatsApp Messages Hub
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <MessageSquare className="w-8 h-8 text-whatsapp" />
                <div>
                  <p className="text-2xl font-bold text-foreground">2,847</p>
                  <p className="text-sm text-muted-foreground">Messages sent today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-learning" />
                <div>
                  <p className="text-2xl font-bold text-foreground">892</p>
                  <p className="text-sm text-muted-foreground">Active recipients</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Send className="w-8 h-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-foreground">94%</p>
                  <p className="text-sm text-muted-foreground">Delivery rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Messages
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{message.recipient}</p>
                        <p className="text-sm text-muted-foreground mt-1">{message.message}</p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(message.status)} mr-2`} />
                        {message.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{message.timestamp}</span>
                      <span>{message.recipients} recipients</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="whatsapp" className="w-full justify-start h-12">
                  <MessageSquare className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Send Broadcast Message</div>
                    <div className="text-xs opacity-90">Reach all active students</div>
                  </div>
                </Button>
                
                <Button variant="learning" className="w-full justify-start h-12">
                  <Users className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Manage Student Groups</div>
                    <div className="text-xs opacity-90">Organize your audience</div>
                  </div>
                </Button>
                
                <Button variant="success" className="w-full justify-start h-12">
                  <Send className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Schedule Messages</div>
                    <div className="text-xs opacity-90">Plan ahead communications</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
