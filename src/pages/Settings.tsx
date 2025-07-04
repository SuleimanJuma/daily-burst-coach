
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Bell, BookOpen, CreditCard, Shield, HelpCircle, Volume2, Vibrate } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotifications } from "@/contexts/NotificationContext";


const Settings = () => {
  const { preferences, updatePreferences } = useNotifications();
  const [profile, setProfile] = useState({
    name: "John Doe",
    whatsapp: "+1234567890",
    timezone: "UTC-5"
  });
  const [learning, setLearning] = useState({
    topics: ["Business", "English"],
    length: "5-min"
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        </div>

        <div className="space-y-8">
          {/* Profile Section */}
          <Card className="p-6 shadow-card bg-gradient-card">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-whatsapp" />
              <h2 className="text-xl font-semibold text-foreground">Profile</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={profile.whatsapp}
                    onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={profile.timezone} onValueChange={(value) => setProfile({ ...profile, timezone: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="UTC+0">UTC</SelectItem>
                    <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                    <SelectItem value="UTC+8">China Standard Time (UTC+8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-whatsapp hover:bg-whatsapp-dark text-white">
                Save Profile
              </Button>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card className="p-6 shadow-card bg-gradient-card">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-learning" />
              <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
            </div>
            <div className="space-y-6">
              {/* WhatsApp Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">WhatsApp Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive lessons via WhatsApp</p>
                </div>
                <Switch
                  checked={preferences.whatsappNotifications}
                  onCheckedChange={(checked) => updatePreferences({ whatsappNotifications: checked })}
                />
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">Browser and desktop notifications</p>
                </div>
                <Switch
                  checked={preferences.pushNotifications}
                  onCheckedChange={(checked) => updatePreferences({ pushNotifications: checked })}
                />
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) => updatePreferences({ emailNotifications: checked })}
                />
              </div>

              {/* Sound & Vibration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium text-foreground">Sound</h3>
                      <p className="text-sm text-muted-foreground">Notification sounds</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.soundEnabled}
                    onCheckedChange={(checked) => updatePreferences({ soundEnabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Vibrate className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium text-foreground">Vibration</h3>
                      <p className="text-sm text-muted-foreground">Device vibration</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.vibrationEnabled}
                    onCheckedChange={(checked) => updatePreferences({ vibrationEnabled: checked })}
                  />
                </div>
              </div>
              
              {/* Delivery Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time">Delivery Time</Label>
                  <Select value={preferences.deliveryTime} onValueChange={(value) => updatePreferences({ deliveryTime: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={preferences.frequency} onValueChange={(value) => updatePreferences({ frequency: value as 'daily' | 'weekdays' | 'weekly' })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekdays">Weekdays only</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                className="bg-learning hover:bg-learning-dark text-white"
                onClick={() => {
                  // Save preferences logic here
                  console.log('Notification preferences saved:', preferences);
                }}
              >
                Save Preferences
              </Button>
            </div>
          </Card>

          {/* Learning Preferences */}
          <Card className="p-6 shadow-card bg-gradient-card">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-success" />
              <h2 className="text-xl font-semibold text-foreground">Learning Preferences</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Preferred Topics</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Business", "English", "Marketing", "Technology", "Finance", "Leadership"].map((topic) => (
                    <Badge
                      key={topic}
                      variant={learning.topics.includes(topic) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        learning.topics.includes(topic) 
                          ? "bg-success text-white" 
                          : "hover:bg-success hover:text-white"
                      }`}
                      onClick={() => {
                        const newTopics = learning.topics.includes(topic)
                          ? learning.topics.filter(t => t !== topic)
                          : [...learning.topics, topic];
                        setLearning({ ...learning, topics: newTopics });
                      }}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="length">Lesson Length</Label>
                <Select value={learning.length} onValueChange={(value) => setLearning({ ...learning, length: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-min">3 minutes</SelectItem>
                    <SelectItem value="5-min">5 minutes</SelectItem>
                    <SelectItem value="10-min">10 minutes</SelectItem>
                    <SelectItem value="15-min">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="bg-success hover:bg-success text-white">
                Save Learning Preferences
              </Button>
            </div>
          </Card>

          {/* Subscription Details */}
          <Card className="p-6 shadow-card bg-gradient-card">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-5 h-5 text-streak" />
              <h2 className="text-xl font-semibold text-foreground">Subscription Details</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h3 className="font-medium text-foreground">Pro Plan</h3>
                  <p className="text-sm text-muted-foreground">Unlimited lessons • Advanced analytics • Priority support</p>
                </div>
                <Badge className="bg-streak text-white">Active</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next billing date:</span>
                  <span className="text-foreground">March 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="text-foreground">$29.99/month</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline">Manage Billing</Button>
                <Button variant="outline">Change Plan</Button>
              </div>
            </div>
          </Card>

          {/* Data & Privacy */}
          <Card className="p-6 shadow-card bg-gradient-card">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-warning" />
              <h2 className="text-xl font-semibold text-foreground">Data & Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Data Analytics</h3>
                    <p className="text-sm text-muted-foreground">Allow us to analyze your learning patterns</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Marketing Communications</h3>
                    <p className="text-sm text-muted-foreground">Receive updates about new features</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Download My Data
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>

          {/* Support */}
          <Card className="p-6 shadow-card bg-gradient-card">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Support</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-16">
                  <div className="text-left">
                    <div className="font-medium">Help Center</div>
                    <div className="text-xs text-muted-foreground">Browse articles and guides</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-16">
                  <div className="text-left">
                    <div className="font-medium">Contact Support</div>
                    <div className="text-xs text-muted-foreground">Get help from our team</div>
                  </div>
                </Button>
              </div>
              
              <div>
                <Label htmlFor="feedback">Send Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what you think..."
                  className="mt-1"
                  rows={3}
                />
                <Button className="mt-2 bg-primary hover:bg-primary/90 text-white">
                  Send Feedback
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
