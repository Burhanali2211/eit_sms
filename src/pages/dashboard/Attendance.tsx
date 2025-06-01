
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, Calendar as CalendarIcon } from "lucide-react";

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const attendanceData = [
    {
      id: "1",
      subject: "Mathematics",
      date: "2024-01-15",
      status: "present",
      time: "9:00 AM - 10:00 AM",
      instructor: "Dr. Smith"
    },
    {
      id: "2", 
      subject: "Physics",
      date: "2024-01-15",
      status: "present",
      time: "11:00 AM - 12:00 PM",
      instructor: "Prof. Johnson"
    },
    {
      id: "3",
      subject: "Chemistry", 
      date: "2024-01-14",
      status: "absent",
      time: "2:00 PM - 3:00 PM",
      instructor: "Dr. Williams"
    },
    {
      id: "4",
      subject: "English",
      date: "2024-01-14", 
      status: "present",
      time: "3:00 PM - 4:00 PM",
      instructor: "Ms. Brown"
    },
    {
      id: "5",
      subject: "Mathematics",
      date: "2024-01-13",
      status: "late",
      time: "9:00 AM - 10:00 AM", 
      instructor: "Dr. Smith"
    }
  ];

  const totalClasses = attendanceData.length;
  const presentClasses = attendanceData.filter(record => record.status === "present").length;
  const absentClasses = attendanceData.filter(record => record.status === "absent").length;
  const lateClasses = attendanceData.filter(record => record.status === "late").length;
  const attendancePercentage = Math.round((presentClasses / totalClasses) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "late":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      present: "default",
      absent: "destructive", 
      late: "secondary"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Attendance" description="Track your class attendance" />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <div className="grid gap-6 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClasses}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{presentClasses}</div>
              <p className="text-xs text-muted-foreground">Classes attended</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{absentClasses}</div>
              <p className="text-xs text-muted-foreground">Classes missed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendancePercentage}%</div>
              <p className="text-xs text-muted-foreground">Overall percentage</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>Your recent class attendance history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.subject}</TableCell>
                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                        <TableCell>{record.time}</TableCell>
                        <TableCell>{record.instructor}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.status)}
                            {getStatusBadge(record.status)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Calendar
                </CardTitle>
                <CardDescription>Select a date to view attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  Request Leave
                </Button>
                <Button className="w-full" variant="outline">
                  View Full Report
                </Button>
                <Button className="w-full" variant="outline">
                  Download Certificate
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
