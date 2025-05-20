
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { CalendarEvent } from "@/types/calendar";
import { useDatabaseTable } from "@/hooks/database/use-database-table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { mockCalendarEvents } from "@/utils/mockData";

const Calendar = () => {
  // State for managing date and UI
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isViewEventOpen, setIsViewEventOpen] = useState(false);
  
  // Form state for new event
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    time: "",
    location: "",
    allDay: false
  });

  // Use our database hook to get and manage events
  const {
    data: events,
    isLoading,
    create: createEvent,
    update: updateEvent,
    remove: deleteEvent
  } = useDatabaseTable<CalendarEvent>(
    'calendar_events',
    mockCalendarEvents, // Fallback mock data
    { orderBy: { column: 'date', ascending: true } }
  );
  
  // Get day names for the calendar header
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Get the current month and year
  const month = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  
  // Get the first day of the month and the number of days in the month
  const firstDayOfMonth = new Date(year, currentMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, currentMonth.getMonth() + 1, 0).getDate();
  
  // Calculate the number of days from the previous month we need to display
  const prevMonthDays = firstDayOfMonth;
  
  // Generate array of days for the current month
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  // Previous and next month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(year, currentMonth.getMonth() - 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(year, currentMonth.getMonth() + 1));
  };
  
  // Check if a day has events
  const getEventsForDay = (day: number) => {
    const targetDate = new Date(year, currentMonth.getMonth(), day);
    const formattedDate = targetDate.toISOString().split('T')[0]; // YYYY-MM-DD
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === targetDate.getFullYear() &&
             eventDate.getMonth() === targetDate.getMonth() &&
             eventDate.getDate() === targetDate.getDate();
    });
  };

  // Today's date for highlighting
  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  // Event handlers for the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setNewEvent(prev => ({ ...prev, allDay: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Format the date properly
      const eventToSave = {
        ...newEvent,
        id: `event-${Date.now()}`, // Generate a temporary ID
        date: new Date(newEvent.date || '').toISOString(),
      };
      
      await createEvent(eventToSave as CalendarEvent);
      
      toast({
        title: "Event Created",
        description: "Your event has been added to the calendar.",
      });
      
      // Reset form and close dialog
      setNewEvent({
        title: "",
        description: "",
        date: new Date().toISOString().split('T')[0],
        time: "",
        location: "",
        allDay: false
      });
      setIsAddEventOpen(false);
    } catch (error) {
      console.error("Failed to create event:", error);
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsViewEventOpen(true);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    
    try {
      await deleteEvent(selectedEvent.id);
      
      toast({
        title: "Event Deleted",
        description: "The event has been removed from your calendar.",
      });
      
      setSelectedEvent(null);
      setIsViewEventOpen(false);
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Calendar" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {month} {year}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Weekday headers */}
                  {weekdays.map((day) => (
                    <div key={day} className="text-center font-medium p-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Empty cells for previous month */}
                  {Array(prevMonthDays)
                    .fill(null)
                    .map((_, index) => (
                      <div key={`prev-${index}`} className="text-center p-2 text-gray-300">
                        {new Date(year, currentMonth.getMonth() - 1, new Date(year, currentMonth.getMonth(), 0).getDate() - prevMonthDays + index + 1).getDate()}
                      </div>
                    ))}
                  
                  {/* Current month days */}
                  {days.map((day) => {
                    const dayEvents = getEventsForDay(day);
                    return (
                      <div
                        key={day}
                        className={`min-h-20 border p-1 text-center relative ${
                          isToday(day) ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="text-sm mb-1">{day}</div>
                        {dayEvents.length > 0 && (
                          <div className="absolute bottom-1 left-0 right-0 px-1">
                            {dayEvents.map((event) => (
                              <div 
                                key={event.id} 
                                className={`text-xs p-1 mb-1 text-white rounded truncate cursor-pointer`}
                                style={{ backgroundColor: event.color || '#4f46e5' }}
                                onClick={() => handleViewEvent(event)}
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming events */}
          <div>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Events</CardTitle>
                  <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              name="title"
                              value={newEvent.title}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                              id="date"
                              name="date"
                              type="date"
                              value={newEvent.date?.toString().split('T')[0]}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="allDay"
                              checked={newEvent.allDay}
                              onCheckedChange={handleCheckboxChange}
                            />
                            <label
                              htmlFor="allDay"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              All-day event
                            </label>
                          </div>
                          
                          {!newEvent.allDay && (
                            <div className="grid gap-2">
                              <Label htmlFor="time">Time</Label>
                              <Input
                                id="time"
                                name="time"
                                type="time"
                                value={newEvent.time}
                                onChange={handleInputChange}
                              />
                            </div>
                          )}
                          
                          <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              name="location"
                              value={newEvent.location}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              name="description"
                              value={newEvent.description}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button type="submit">Save Event</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <p className="text-center text-muted-foreground">Loading events...</p>
                  ) : events.length === 0 ? (
                    <p className="text-center text-muted-foreground">No upcoming events</p>
                  ) : (
                    events
                      .filter(event => {
                        const eventDate = new Date(event.date);
                        const today = new Date();
                        return eventDate >= today;
                      })
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .slice(0, 5) // Show only the next 5 events
                      .map((event) => (
                        <div
                          key={event.id}
                          className="p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleViewEvent(event)}
                        >
                          <h3 className="font-medium">{event.title}</h3>
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <span>{event.time || 'All day'}</span>
                          </div>
                          {event.location && (
                            <div className="text-xs text-muted-foreground mt-1">
                              📍 {event.location}
                            </div>
                          )}
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* View Event Dialog */}
      <Dialog open={isViewEventOpen} onOpenChange={setIsViewEventOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{selectedEvent?.title}</span>
              <Button
                variant="ghost" 
                size="icon"
                className="h-6 w-6 rounded-full"
                onClick={handleDeleteEvent}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Date & Time</h4>
                <p>
                  {selectedEvent && new Date(selectedEvent.date).toLocaleDateString()}
                  {selectedEvent?.time && !selectedEvent?.allDay && ` at ${selectedEvent.time}`}
                  {selectedEvent?.allDay && ' (All day)'}
                </p>
              </div>
              
              {selectedEvent?.location && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                  <p>{selectedEvent.location}</p>
                </div>
              )}
              
              {selectedEvent?.description && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                  <p className="whitespace-pre-wrap">{selectedEvent.description}</p>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewEventOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Calendar;
