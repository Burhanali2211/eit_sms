
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar as CalendarIcon } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: Date;
  type: "exam" | "event" | "holiday";
}

interface Notification {
  id: number;
  title: string;
  content: string;
  date: Date;
  isNew: boolean;
}

const CalendarNotifications = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("all");

  // Mock events data
  const events: Event[] = [
    { 
      id: 1, 
      title: "Final Exams Begin", 
      date: new Date(2025, 4, 15), 
      type: "exam" 
    },
    { 
      id: 2, 
      title: "Annual Sports Day", 
      date: new Date(2025, 4, 20), 
      type: "event" 
    },
    { 
      id: 3, 
      title: "Summer Break", 
      date: new Date(2025, 5, 5), 
      type: "holiday" 
    },
    { 
      id: 4, 
      title: "Science Fair", 
      date: new Date(2025, 5, 2), 
      type: "event" 
    },
  ];

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      content: "Parent-teacher meeting scheduled for next week. Please check your email for details.",
      date: new Date(2025, 4, 12),
      isNew: true,
    },
    {
      id: 2,
      title: "Library Notice",
      content: "New books are available in the library. Visit to explore the collection.",
      date: new Date(2025, 4, 10),
      isNew: false,
    },
    {
      id: 3,
      title: "School Trip Registration",
      content: "Registration for the annual school trip is now open. Limited spots available.",
      date: new Date(2025, 4, 8),
      isNew: true,
    },
    {
      id: 4,
      title: "Holiday Announcement",
      content: "School will remain closed on May 5th due to local elections.",
      date: new Date(2025, 4, 5),
      isNew: false,
    },
    {
      id: 5,
      title: "Exam Schedule Update",
      content: "The final exam schedule has been updated. Please check the calendar.",
      date: new Date(2025, 4, 3),
      isNew: false,
    },
  ];

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return notification.isNew;
    return false;
  });

  // Check if a date has events
  const hasEvent = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };

  // Get event for a specific date
  const getEventsForDate = (day: Date) => {
    return events.filter(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };

  return (
    <div className="container-section">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-school-primary" />
              School Calendar
            </CardTitle>
            <CardDescription>Upcoming events, exams, and holidays</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                event: (day) => hasEvent(day),
              }}
              modifiersClassNames={{
                event: "border-b-2 border-school-accent",
              }}
            />
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Events on Selected Date</h4>
              {date && getEventsForDate(date).length > 0 ? (
                <ul className="space-y-2">
                  {getEventsForDate(date).map(event => (
                    <li key={event.id} className="p-3 rounded-md bg-muted flex items-start">
                      <div className={`w-2 h-2 rounded-full mr-2 mt-1.5 ${
                        event.type === 'exam' 
                          ? 'bg-rose-500' 
                          : event.type === 'event' 
                            ? 'bg-school-secondary' 
                            : 'bg-school-accent'
                      }`} />
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No events scheduled for this day.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-school-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Stay updated with the latest announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setActiveTab("all")}
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="new" 
                  onClick={() => setActiveTab("new")}
                  className="relative"
                >
                  New
                  {notifications.some(n => n.isNew) && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications.filter(n => n.isNew).length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="m-0">
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-md border ${notification.isNew ? 'border-school-primary/30 bg-school-primary/5' : 'border-gray-200'}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-sm">
                          {notification.title}
                          {notification.isNew && (
                            <span className="ml-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">New</span>
                          )}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {notification.date.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.content}</p>
                    </div>
                  ))}
                  
                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No notifications to display.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="new" className="m-0">
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-3 rounded-md border border-school-primary/30 bg-school-primary/5"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-sm">
                          {notification.title}
                          <span className="ml-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">New</span>
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {notification.date.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.content}</p>
                    </div>
                  ))}
                  
                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No new notifications.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarNotifications;
