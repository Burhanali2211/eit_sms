
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  type: 'class' | 'meeting' | 'event' | 'deadline';
  attendees?: number;
}

const EnhancedCalendarWidget = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Mock upcoming events
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Math Class',
        date: new Date().toISOString().split('T')[0],
        time: '09:00 AM',
        location: 'Room 101',
        type: 'class',
        attendees: 25
      },
      {
        id: '2',
        title: 'Parent-Teacher Meeting',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '02:00 PM',
        location: 'Conference Room',
        type: 'meeting',
        attendees: 12
      },
      {
        id: '3',
        title: 'Science Project Deadline',
        date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        time: '11:59 PM',
        type: 'deadline'
      },
      {
        id: '4',
        title: 'School Sports Day',
        date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
        time: '08:00 AM',
        location: 'Sports Ground',
        type: 'event',
        attendees: 200
      }
    ];

    setEvents(mockEvents);
  }, []);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'meeting': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'deadline': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'event': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Event
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No upcoming events</p>
            </div>
          ) : (
            upcomingEvents.map(event => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-lg border hover:shadow-sm transition-all cursor-pointer"
                onClick={() => toast({ title: `Event: ${event.title}`, description: 'Event details opened' })}
              >
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium">{event.title}</h4>
                    <Badge variant="outline" className={getEventColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                  </div>
                  
                  {event.location && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                  )}
                  
                  {event.attendees && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {event.attendees} attendees
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          
          <Button variant="outline" className="w-full mt-4">
            View Full Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCalendarWidget;
