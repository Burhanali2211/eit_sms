
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Book, Download, Users, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const courseData = [
  {
    id: 1,
    name: "Mathematics",
    teacher: "Professor Smith",
    progress: 65,
    nextClass: "Tomorrow, 10:00 AM",
    room: "Room 101",
    materials: [
      { name: "Algebra Fundamentals", type: "PDF", size: "1.2 MB" },
      { name: "Calculus Introduction", type: "PDF", size: "2.5 MB" },
      { name: "Weekly Problems Set", type: "PDF", size: "0.8 MB" },
    ]
  },
  {
    id: 2,
    name: "English Literature",
    teacher: "Ms. Johnson",
    progress: 78,
    nextClass: "Wednesday, 11:30 AM",
    room: "Room 203",
    materials: [
      { name: "Shakespeare Analysis", type: "PDF", size: "3.1 MB" },
      { name: "Essay Guidelines", type: "DOC", size: "0.5 MB" },
    ]
  },
  {
    id: 3,
    name: "Physics",
    teacher: "Dr. Williams",
    progress: 42,
    nextClass: "Thursday, 09:15 AM",
    room: "Lab 3",
    materials: [
      { name: "Mechanics Notes", type: "PDF", size: "2.4 MB" },
      { name: "Lab Experiment Guide", type: "PDF", size: "1.6 MB" },
      { name: "Formula Sheet", type: "PDF", size: "0.3 MB" },
    ]
  },
  {
    id: 4,
    name: "Computer Science",
    teacher: "Mrs. Thompson",
    progress: 89,
    nextClass: "Friday, 02:00 PM",
    room: "Computer Lab",
    materials: [
      { name: "Algorithm Basics", type: "PDF", size: "1.8 MB" },
      { name: "Programming Exercises", type: "ZIP", size: "4.2 MB" },
      { name: "Project Guidelines", type: "DOC", size: "0.7 MB" },
    ]
  },
];

const CourseCard = ({ course }: { course: typeof courseData[0] }) => (
  <Card className="mb-6">
    <CardHeader className="pb-3">
      <div className="flex justify-between items-center">
        <CardTitle>{course.name}</CardTitle>
        <span className="text-sm text-muted-foreground">
          Teacher: {course.teacher}
        </span>
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1 text-sm">
          <span>Course Progress</span>
          <span className="font-medium">{course.progress}%</span>
        </div>
        <Progress value={course.progress} className="h-2" />
      </div>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="info">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Course Info</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Next Class</p>
                <p className="text-sm text-muted-foreground">{course.nextClass}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Classroom</p>
                <p className="text-sm text-muted-foreground">{course.room}</p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">View Full Schedule</Button>
        </TabsContent>
        
        <TabsContent value="materials" className="mt-4">
          <div className="space-y-2">
            {course.materials.map((material, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{material.name}</p>
                    <p className="text-xs text-muted-foreground">{material.type} • {material.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">View All Materials</Button>
        </TabsContent>
        
        <TabsContent value="assignments" className="mt-4">
          <div className="space-y-2">
            <div className="p-3 border rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Assignment 1: Problem Set</p>
                  <p className="text-sm text-muted-foreground">Due: Next Monday</p>
                </div>
                <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Pending</span>
              </div>
            </div>
            <div className="p-3 border rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Assignment 2: Essay</p>
                  <p className="text-sm text-muted-foreground">Due: Next Friday</p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Not Started</span>
              </div>
            </div>
            <div className="p-3 border rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Quiz: Chapter 3</p>
                  <p className="text-sm text-muted-foreground">Grade: 85%</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">View All Assignments</Button>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

const Courses = () => {
  return (
    <DashboardLayout>
      <DashboardHeader title="My Courses" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {courseData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
