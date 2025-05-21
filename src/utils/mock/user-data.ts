import { CalendarEvent } from "@/types/dashboard";

// Mock calendar events data
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Parent-Teacher Meeting",
    description: "Quarterly meeting with parents to discuss student progress",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString(),
    time: "3:00 PM",
    endTime: "5:00 PM",
    location: "Main Conference Room",
    color: "#4f46e5"
  },
  {
    id: "event-2",
    title: "Science Fair",
    description: "Annual science fair for all grades",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20).toISOString(),
    time: "10:00 AM",
    endTime: "2:00 PM",
    allDay: true,
    location: "School Gymnasium",
    color: "#059669"
  },
  {
    id: "event-3",
    title: "Staff Development Day",
    description: "Professional development workshop for teachers",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 10).toISOString(),
    allDay: true,
    location: "Training Center",
    color: "#d97706"
  },
  {
    id: "event-4",
    title: "School Board Meeting",
    description: "Monthly school board meeting",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2).toISOString(),
    time: "6:00 PM",
    endTime: "8:00 PM",
    location: "Administration Building",
    color: "#7c3aed"
  }
];
