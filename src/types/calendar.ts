
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO format date string
  time?: string; // Format: "HH:MM AM/PM"
  endDate?: string;
  endTime?: string;
  allDay?: boolean;
  userId?: string;
  color?: string;
  recurring?: boolean;
  recurringPattern?: string;
  attendees?: string[];
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CalendarViewOptions {
  view: 'month' | 'week' | 'day' | 'agenda';
  date: Date;
}

export interface EventAction {
  type: 'add' | 'update' | 'delete';
  event: CalendarEvent;
}

