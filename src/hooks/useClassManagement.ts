
import { useState, useEffect } from "react";
import { useDatabaseTable } from "@/hooks/use-database-connection";
import { toast } from "@/hooks/use-toast";
import { Student } from "@/types/dashboard";

export const useClassManagement = () => {
  const { 
    data: classesData, 
    isLoading: classesLoading, 
    error: classesError 
  } = useDatabaseTable<any>("classes", {
    refreshInterval: 30000
  });

  const defaultClass = classesData?.[0] || { 
    id: 0, 
    name: "", 
    subject: "", 
    students: 0, 
    schedule: "", 
    room: "" 
  };
  
  const [selectedClass, setSelectedClass] = useState(defaultClass);
  
  useEffect(() => {
    if (classesData && classesData.length > 0) {
      setSelectedClass(classesData[0]);
    }
  }, [classesData]);

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
      const student = students.find(s => s.id === studentId);
      if (!student) return;
      
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

  return {
    classesData,
    classesLoading,
    classesError,
    selectedClass,
    setSelectedClass,
    students,
    studentsLoading,
    studentsError,
    handleAttendance
  };
};
