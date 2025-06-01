
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Book, Clock, User, Calendar } from "lucide-react";

const Courses = () => {
  const enrolledCourses = [
    {
      id: "1",
      name: "Mathematics",
      code: "MATH101",
      instructor: "Dr. Smith",
      progress: 75,
      schedule: "Mon, Wed, Fri 9:00 AM",
      nextClass: "Tomorrow 9:00 AM",
      status: "active"
    },
    {
      id: "2",
      name: "Physics",
      code: "PHY201",
      instructor: "Prof. Johnson",
      progress: 60,
      schedule: "Tue, Thu 11:00 AM",
      nextClass: "Today 11:00 AM",
      status: "active"
    },
    {
      id: "3",
      name: "Chemistry",
      code: "CHEM101",
      instructor: "Dr. Williams",
      progress: 45,
      schedule: "Mon, Wed 2:00 PM",
      nextClass: "Wednesday 2:00 PM",
      status: "active"
    },
    {
      id: "4",
      name: "English Literature",
      code: "ENG301",
      instructor: "Ms. Brown",
      progress: 90,
      schedule: "Tue, Thu 3:00 PM",
      nextClass: "Thursday 3:00 PM",
      status: "active"
    }
  ];

  return (
    <DashboardLayout>
      <DashboardHeader title="My Courses" description="Track your enrolled courses and progress" />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              <p className="text-xs text-muted-foreground">Currently enrolled</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Next Class</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">Physics</div>
              <p className="text-xs text-muted-foreground">Today 11:00 AM</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="h-5 w-5" />
                      {course.name}
                      <Badge variant="outline">{course.code}</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {course.instructor}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {course.schedule}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge variant={course.status === "active" ? "default" : "secondary"}>
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Next class: {course.nextClass}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Materials
                      </Button>
                      <Button size="sm">
                        Join Class
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
