
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Book, Download, Users, Clock, Check, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { handleMockResponse } from "@/utils/mock";

const courseData = [
  {
    id: 1,
    name: "Mathematics",
    teacher: "Professor Smith",
    progress: 65,
    nextClass: "Tomorrow, 10:00 AM",
    room: "Room 101",
    materials: [
      { id: "m1", name: "Algebra Fundamentals", type: "PDF", size: "1.2 MB" },
      { id: "m2", name: "Calculus Introduction", type: "PDF", size: "2.5 MB" },
      { id: "m3", name: "Weekly Problems Set", type: "PDF", size: "0.8 MB" },
    ],
    assignments: [
      { id: "a1", name: "Assignment 1: Problem Set", due: "Next Monday", status: "pending" },
      { id: "a2", name: "Assignment 2: Essay", due: "Next Friday", status: "not-started" },
      { id: "a3", name: "Quiz: Chapter 3", due: "", grade: "85%", status: "completed" },
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
      { id: "m4", name: "Shakespeare Analysis", type: "PDF", size: "3.1 MB" },
      { id: "m5", name: "Essay Guidelines", type: "DOC", size: "0.5 MB" },
    ],
    assignments: [
      { id: "a4", name: "Essay: Modern Literature", due: "In 2 weeks", status: "not-started" },
      { id: "a5", name: "Reading Assignment", due: "Tomorrow", status: "pending" },
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
      { id: "m6", name: "Mechanics Notes", type: "PDF", size: "2.4 MB" },
      { id: "m7", name: "Lab Experiment Guide", type: "PDF", size: "1.6 MB" },
      { id: "m8", name: "Formula Sheet", type: "PDF", size: "0.3 MB" },
    ],
    assignments: [
      { id: "a6", name: "Lab Report", due: "Next Thursday", status: "not-started" },
      { id: "a7", name: "Chapter Questions", due: "Friday", status: "pending" },
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
      { id: "m9", name: "Algorithm Basics", type: "PDF", size: "1.8 MB" },
      { id: "m10", name: "Programming Exercises", type: "ZIP", size: "4.2 MB" },
      { id: "m11", name: "Project Guidelines", type: "DOC", size: "0.7 MB" },
    ],
    assignments: [
      { id: "a8", name: "Programming Project", due: "Next Wednesday", status: "pending" },
      { id: "a9", name: "Algorithm Analysis", due: "Two days ago", status: "completed", grade: "92%" },
      { id: "a10", name: "Coding Quiz", due: "Today", status: "pending" },
    ]
  },
];

const CourseCard = ({ course }: { course: typeof courseData[0] }) => {
  const [downloading, setDownloading] = useState<string | null>(null);
  
  // Handle material download
  const handleDownload = (materialId: string, materialName: string) => {
    setDownloading(materialId);
    
    // Simulate API call to download material
    setTimeout(() => {
      setDownloading(null);
      toast({
        title: "Download Started",
        description: `${materialName} is now downloading.`,
      });
    }, 1000);
  };

  // Handle view schedule
  const handleViewSchedule = () => {
    toast({
      title: "Viewing Schedule",
      description: `Loading full schedule for ${course.name}.`,
    });
  };
  
  // Handle view all materials
  const handleViewAllMaterials = () => {
    toast({
      title: "All Materials",
      description: `Viewing all materials for ${course.name}.`,
    });
  };
  
  // Handle view all assignments
  const handleViewAllAssignments = () => {
    toast({
      title: "All Assignments",
      description: `Viewing all assignments for ${course.name}.`,
    });
  };

  return (
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
            <Button variant="outline" className="w-full mt-4" onClick={handleViewSchedule}>View Full Schedule</Button>
          </TabsContent>
          
          <TabsContent value="materials" className="mt-4">
            <div className="space-y-2">
              {course.materials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{material.name}</p>
                      <p className="text-xs text-muted-foreground">{material.type} • {material.size}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDownload(material.id, material.name)}
                    disabled={downloading === material.id}
                  >
                    {downloading === material.id ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={handleViewAllMaterials}>View All Materials</Button>
          </TabsContent>
          
          <TabsContent value="assignments" className="mt-4">
            <div className="space-y-2">
              {course.assignments.map((assignment) => (
                <div key={assignment.id} className="p-3 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{assignment.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {assignment.status === 'completed' 
                          ? `Grade: ${assignment.grade}` 
                          : `Due: ${assignment.due}`}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      assignment.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : assignment.status === 'pending'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {assignment.status === 'completed' ? (
                        <div className="flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          <span>Completed</span>
                        </div>
                      ) : assignment.status === 'pending' ? (
                        <div className="flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          <span>Pending</span>
                        </div>
                      ) : (
                        <span>Not Started</span>
                      )}
                    </span>
                  </div>
                  {assignment.status !== 'completed' && (
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => {
                          toast({
                            title: "Assignment Action",
                            description: assignment.status === 'pending' 
                              ? `Submitting ${assignment.name}` 
                              : `Starting ${assignment.name}`,
                          });
                        }}
                      >
                        {assignment.status === 'pending' ? 'Submit Assignment' : 'Start Assignment'}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={handleViewAllAssignments}>View All Assignments</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const Courses = () => {
  return (
    <DashboardLayout>
      <DashboardHeader title="My Courses" />
      <div className="flex-1 overflow-auto p-6">
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
