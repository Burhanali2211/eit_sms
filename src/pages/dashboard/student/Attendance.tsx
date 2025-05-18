
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, Check, X, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock data for attendance records
const attendanceData = [
  { date: "2025-05-10", status: "present", subject: "Mathematics", time: "9:00 AM" },
  { date: "2025-05-09", status: "present", subject: "English", time: "11:00 AM" },
  { date: "2025-05-08", status: "absent", subject: "Science", time: "2:00 PM" },
  { date: "2025-05-07", status: "present", subject: "History", time: "10:00 AM" },
  { date: "2025-05-06", status: "late", subject: "Geography", time: "1:00 PM" },
  { date: "2025-05-05", status: "present", subject: "Physical Education", time: "3:00 PM" },
  { date: "2025-05-04", status: "present", subject: "Art", time: "9:00 AM" },
  { date: "2025-05-03", status: "absent", subject: "Music", time: "11:00 AM" },
];

// Type definitions
type AttendanceStatus = "present" | "absent" | "late";

interface AttendanceRecord {
  date: string;
  status: AttendanceStatus;
  subject: string;
  time: string;
}

// Mock subjects with attendance percentage
const subjectAttendance = [
  { subject: "Mathematics", present: 22, total: 25, percentage: 88 },
  { subject: "English", present: 24, total: 25, percentage: 96 },
  { subject: "Science", present: 20, total: 25, percentage: 80 },
  { subject: "History", present: 21, total: 25, percentage: 84 },
  { subject: "Geography", present: 23, total: 25, percentage: 92 },
  { subject: "Physical Education", present: 20, total: 25, percentage: 80 },
  { subject: "Art", present: 19, total: 20, percentage: 95 },
  { subject: "Music", present: 17, total: 20, percentage: 85 },
];

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dateAttendance, setDateAttendance] = useState<AttendanceRecord[]>([]);
  const [date, setDate] = useState<Date>();

  // Filter attendance records for the selected date
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const records = attendanceData.filter(record => record.date === formattedDate);
      setDateAttendance(records as AttendanceRecord[]);
    }
  }, [selectedDate]);

  // Calculate overall attendance percentage
  const totalClasses = subjectAttendance.reduce((sum, subject) => sum + subject.total, 0);
  const presentClasses = subjectAttendance.reduce((sum, subject) => sum + subject.present, 0);
  const overallPercentage = Math.round((presentClasses / totalClasses) * 100);

  return (
    <DashboardLayout>
      <DashboardHeader title="Attendance" />
      
      <main className="flex-1 overflow-auto bg-background p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Overall Attendance</CardTitle>
              <CardDescription>Your attendance across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="relative h-40 w-40 flex items-center justify-center">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className={cn(
                        "stroke-current",
                        overallPercentage > 90 ? "text-green-500" : 
                        overallPercentage > 75 ? "text-amber-500" : "text-red-500"
                      )}
                      strokeWidth="10"
                      strokeDasharray={`${overallPercentage * 2.512} 251.2`}
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-3xl font-bold">{overallPercentage}%</p>
                    <p className="text-sm text-muted-foreground">Attendance</p>
                  </div>
                </div>
                
                <div className="w-full pt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Present</span>
                    <span className="text-sm font-medium">{presentClasses}/{totalClasses} classes</span>
                  </div>
                  <Progress value={(presentClasses / totalClasses) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Today's Status</CardTitle>
              <CardDescription>Your attendance for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dateAttendance.length > 0 ? (
                  dateAttendance.map((record, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{record.subject}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3.5 w-3.5" />
                          <span>{record.time}</span>
                        </div>
                      </div>
                      <div className={cn(
                        "flex items-center px-3 py-1 rounded-full text-sm",
                        record.status === "present" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                        record.status === "absent" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                      )}>
                        {record.status === "present" ? (
                          <Check className="mr-1 h-3.5 w-3.5" />
                        ) : record.status === "absent" ? (
                          <X className="mr-1 h-3.5 w-3.5" />
                        ) : (
                          <AlertCircle className="mr-1 h-3.5 w-3.5" />
                        )}
                        <span className="capitalize">{record.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <p className="text-muted-foreground">No attendance records for the selected date</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSelectedDate(new Date())}
                    >
                      View Today's Attendance
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Attendance Calendar</CardTitle>
              <CardDescription>View your attendance by date</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-center mb-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : "Pick a date"}
                      <CalendarIcon className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setDate(date);
                      }}
                      className="rounded-md border"
                      disabled={(date) => date > new Date() || date < new Date("2025-01-01")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="subject" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="subject">Subject Wise</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="history">Attendance History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subject" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjectAttendance.map((subject, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{subject.subject}</CardTitle>
                    <CardDescription>{subject.present} of {subject.total} classes attended</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{subject.percentage}%</span>
                        <span className={cn(
                          "text-sm font-medium",
                          subject.percentage >= 85 ? "text-green-600 dark:text-green-400" :
                          subject.percentage >= 75 ? "text-amber-600 dark:text-amber-400" :
                          "text-red-600 dark:text-red-400"
                        )}>
                          {subject.percentage >= 85 ? "Excellent" :
                           subject.percentage >= 75 ? "Good" : "At Risk"}
                        </span>
                      </div>
                      <Progress value={subject.percentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance</CardTitle>
                <CardDescription>View your attendance records by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <p className="text-muted-foreground">Monthly attendance chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>Complete record of your attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Subject</th>
                        <th className="px-4 py-2 text-left">Time</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {attendanceData.map((record, index) => (
                        <tr key={index} className="hover:bg-muted/50">
                          <td className="px-4 py-2">
                            {format(new Date(record.date), "PP")}
                          </td>
                          <td className="px-4 py-2">{record.subject}</td>
                          <td className="px-4 py-2">{record.time}</td>
                          <td className="px-4 py-2">
                            <span className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              record.status === "present" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                              record.status === "absent" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                              "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            )}>
                              <span className="capitalize">{record.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </DashboardLayout>
  );
};

export default Attendance;
