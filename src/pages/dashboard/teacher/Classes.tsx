
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Search, 
  Filter, 
  MoreHorizontal,
  Users,
  Clock,
  CalendarClock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockStudents } from "@/utils/mockData";
import { Student } from "@/types/dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const classes = [
  { id: 1, name: "10A", subject: "Mathematics", students: 28, schedule: "Mon, Wed, Fri - 10:00 AM", room: "101" },
  { id: 2, name: "10B", subject: "Mathematics", students: 30, schedule: "Tue, Thu - 11:30 AM", room: "101" },
  { id: 3, name: "11A", subject: "Mathematics", students: 25, schedule: "Mon, Wed, Fri - 02:00 PM", room: "203" },
  { id: 4, name: "11B", subject: "Mathematics", students: 27, schedule: "Tue, Thu - 09:00 AM", room: "203" },
];

const Classes = () => {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>(mockStudents);
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAttendance = (studentId: string, present: boolean) => {
    // In a real app, this would update attendance records
    console.log(`Student ${studentId} marked as ${present ? 'present' : 'absent'}`);
  };
  
  return (
    <DashboardLayout>
      <DashboardHeader title="My Classes" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {classes.map((cls) => (
            <Card 
              key={cls.id} 
              className={`cursor-pointer transition-all ${
                selectedClass.id === cls.id 
                  ? 'border-school-primary shadow-md' 
                  : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedClass(cls)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>Class {cls.name}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{cls.students} Students</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{cls.schedule}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Room {cls.room}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Class {selectedClass.name} - {selectedClass.subject}</CardTitle>
              <Button>Take Attendance</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="students">
              <TabsList>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
              </TabsList>
              
              <div className="my-4 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="sm:w-auto w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
              
              <TabsContent value="students">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map(student => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>{student.attendance}%</TableCell>
                        <TableCell>{student.performanceGrade}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleAttendance(student.id, true)}>
                                Mark Present
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAttendance(student.id, false)}>
                                Mark Absent
                              </DropdownMenuItem>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Send Message</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="attendance">
                <div className="p-8 text-center">
                  <h3 className="text-lg font-medium">Attendance Records</h3>
                  <p className="text-muted-foreground">View and manage class attendance records here.</p>
                  <Button className="mt-4">Take Today's Attendance</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="assignments">
                <div className="p-8 text-center">
                  <h3 className="text-lg font-medium">Class Assignments</h3>
                  <p className="text-muted-foreground">Create and manage assignments for this class.</p>
                  <Button className="mt-4">Create New Assignment</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="grades">
                <div className="p-8 text-center">
                  <h3 className="text-lg font-medium">Grade Management</h3>
                  <p className="text-muted-foreground">Record and manage student grades for this class.</p>
                  <Button className="mt-4">Enter New Grades</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Classes;
