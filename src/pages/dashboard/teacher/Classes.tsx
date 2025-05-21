
import { useState, useEffect } from "react";
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
import { useDatabaseTable } from "@/hooks/use-database-connection";
import { toast } from "@/hooks/use-toast";

const Classes = () => {
  // Fetch classes from database
  const { 
    data: classesData, 
    isLoading: classesLoading, 
    error: classesError 
  } = useDatabaseTable<any>("classes", {
    refreshInterval: 30000 // refresh every 30 seconds
  });

  // Use first class as default, or empty if none available
  const defaultClass = classesData?.[0] || { 
    id: 0, 
    name: "", 
    subject: "", 
    students: 0, 
    schedule: "", 
    room: "" 
  };
  
  const [selectedClass, setSelectedClass] = useState(defaultClass);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Update selected class when data loads
  useEffect(() => {
    if (classesData && classesData.length > 0) {
      setSelectedClass(classesData[0]);
    }
  }, [classesData]);

  // Fetch students for the selected class
  const { 
    data: studentsData, 
    isLoading: studentsLoading, 
    error: studentsError,
    update: updateStudent
  } = useDatabaseTable<Student>("students", {
    filter: { 
      grade: selectedClass?.grade || "",
      section: selectedClass?.section || ""
    }
  });

  const students = studentsData || [];
  
  const filteredStudents = students.filter(student => 
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAttendance = async (studentId: string, present: boolean) => {
    try {
      // Calculate new attendance percentage
      const student = students.find(s => s.id === studentId);
      if (!student) return;
      
      // Update attendance in the database
      const newAttendance = present ? 
        Math.min(100, student.attendance + 1) : 
        Math.max(0, student.attendance - 1);
        
      await updateStudent(studentId, { 
        attendance: newAttendance,
        // You might want to add more fields like date, class_id, etc.
      });
      
      toast({
        title: `Attendance Updated`,
        description: `Student marked as ${present ? 'present' : 'absent'}`,
      });
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast({
        title: "Error",
        description: "Failed to update attendance",
        variant: "destructive"
      });
    }
  };
  
  if (classesLoading) {
    return (
      <DashboardLayout>
        <DashboardHeader title="My Classes" />
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading classes...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (classesError) {
    return (
      <DashboardLayout>
        <DashboardHeader title="My Classes" />
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">Error loading classes. Please try again later.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <DashboardHeader title="My Classes" />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {classesData && classesData.length > 0 ? (
            classesData.map((cls: any) => (
              <Card 
                key={cls.id} 
                className={`cursor-pointer transition-all ${
                  selectedClass.id === cls.id 
                    ? 'border-school-primary shadow-md' 
                    : 'hover:border-gray-300 dark:hover:border-gray-700'
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
                      <span>{cls.students || 0} Students</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.schedule || "No schedule"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Room {cls.room || "N/A"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-3">
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">No classes found. Please check your database connection.</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Class {selectedClass.name} - {selectedClass.subject}</CardTitle>
              <Button onClick={() => {
                toast({
                  title: "Taking Attendance",
                  description: "Attendance module loaded"
                });
              }}>Take Attendance</Button>
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
                {studentsLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground">Loading students...</p>
                  </div>
                ) : studentsError ? (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-red-500">Error loading students</p>
                  </div>
                ) : (
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
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
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
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6">
                            {searchTerm ? 'No students found matching your search.' : 'No students in this class.'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
              
              <TabsContent value="attendance">
                <div className="p-8 text-center">
                  <h3 className="text-lg font-medium">Attendance Records</h3>
                  <p className="text-muted-foreground">View and manage class attendance records here.</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => {
                      toast({
                        title: "Attendance Module",
                        description: "Taking today's attendance"
                      });
                    }}
                  >
                    Take Today's Attendance
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="assignments">
                <div className="p-8 text-center">
                  <h3 className="text-lg font-medium">Class Assignments</h3>
                  <p className="text-muted-foreground">Create and manage assignments for this class.</p>
                  <Button 
                    className="mt-4"
                    onClick={() => {
                      toast({
                        title: "Assignments",
                        description: "Create new assignment module opened"
                      });
                    }}
                  >
                    Create New Assignment
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="grades">
                <div className="p-8 text-center">
                  <h3 className="text-lg font-medium">Grade Management</h3>
                  <p className="text-muted-foreground">Record and manage student grades for this class.</p>
                  <Button 
                    className="mt-4"
                    onClick={() => {
                      toast({
                        title: "Grades",
                        description: "Grade entry module opened"
                      });
                    }}
                  >
                    Enter New Grades
                  </Button>
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
