
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDatabaseTable } from "@/hooks/use-database-connection";
import { toast } from "@/hooks/use-toast";
import ClassCard from "@/components/teacher/ClassCard";
import ClassTabs from "@/components/teacher/ClassTabs";
import { Student } from "@/types/dashboard";

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
              <ClassCard 
                key={cls.id}
                classData={cls}
                isSelected={selectedClass.id === cls.id}
                onClick={() => setSelectedClass(cls)}
              />
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
            <ClassTabs
              selectedClass={selectedClass}
              students={students}
              studentsLoading={studentsLoading}
              studentsError={studentsError}
              onAttendance={handleAttendance}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Classes;
