
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { mockCalendarEvents } from "@/utils/mockData";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
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
    const targetDateStr = targetDate.toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
    
    return mockCalendarEvents.filter(event => {
      // For demo purposes, check if the day number is in the event date
      // In a real app, you would parse and compare actual dates
      return event.date.includes(day.toString());
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
                    const events = getEventsForDay(day);
                    return (
                      <div
                        key={day}
                        className={`min-h-20 border p-1 text-center relative ${
                          isToday(day) ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="text-sm mb-1">{day}</div>
                        {events.length > 0 && (
                          <div className="absolute bottom-1 left-0 right-0 px-1">
                            {events.map((event, index) => (
                              <div 
                                key={index} 
                                className="text-xs p-1 mb-1 bg-school-primary text-white rounded truncate"
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
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCalendarEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
