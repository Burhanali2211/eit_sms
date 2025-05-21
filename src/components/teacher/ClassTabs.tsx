
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import StudentList from "./StudentList";
import { Student } from "@/types/dashboard";

interface ClassTabsProps {
  selectedClass: any;
  students: Student[];
  studentsLoading: boolean;
  studentsError: any;
  onAttendance: (studentId: string, present: boolean) => void;
}

const ClassTabs = ({ 
  selectedClass, 
  students, 
  studentsLoading, 
  studentsError, 
  onAttendance 
}: ClassTabsProps) => {
  return (
    <Tabs defaultValue="students">
      <TabsList>
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="assignments">Assignments</TabsTrigger>
        <TabsTrigger value="grades">Grades</TabsTrigger>
      </TabsList>
      
      <TabsContent value="students">
        <StudentList 
          students={students} 
          isLoading={studentsLoading} 
          error={studentsError}
          onAttendance={onAttendance}
        />
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
  );
};

export default ClassTabs;
