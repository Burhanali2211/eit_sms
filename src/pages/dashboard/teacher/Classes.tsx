
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import ClassCard from "@/components/teacher/ClassCard";
import ClassTabs from "@/components/teacher/ClassTabs";
import { useClassManagement } from "@/hooks/useClassManagement";

const Classes = () => {
  const {
    classesData,
    classesLoading,
    classesError,
    selectedClass,
    setSelectedClass,
    students,
    studentsLoading,
    studentsError,
    handleAttendance
  } = useClassManagement();
  
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
