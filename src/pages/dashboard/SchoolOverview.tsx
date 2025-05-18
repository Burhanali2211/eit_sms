
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const SchoolOverview = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  return (
    <DashboardLayout>
      <DashboardHeader title="School Overview" />
      <div className={cn(
        "flex-1 overflow-auto p-6 transition-colors duration-300",
        "dashboard-content"
      )}>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Student Enrollment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,250</div>
                  <div className="text-xs text-muted-foreground">Current academic year</div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Primary</span>
                      <span>450 students</span>
                    </div>
                    <Progress
                      value={36}
                      className="h-1"
                      indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>Middle</span>
                      <span>400 students</span>
                    </div>
                    <Progress
                      value={32}
                      className="h-1"
                      indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>High School</span>
                      <span>400 students</span>
                    </div>
                    <Progress
                      value={32}
                      className="h-1"
                      indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Academic Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-xs text-muted-foreground">Average pass rate</div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>A Grade</span>
                      <span>30%</span>
                    </div>
                    <Progress
                      value={30}
                      className="h-1"
                      indicatorClassName={cn("bg-emerald-500 dark:bg-emerald-400")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>B Grade</span>
                      <span>40%</span>
                    </div>
                    <Progress
                      value={40}
                      className="h-1"
                      indicatorClassName={cn("bg-blue-500 dark:bg-blue-400")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>C Grade</span>
                      <span>30%</span>
                    </div>
                    <Progress
                      value={30}
                      className="h-1"
                      indicatorClassName={cn("bg-amber-500 dark:bg-amber-400")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85</div>
                  <div className="text-xs text-muted-foreground">Total staff members</div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Teachers</span>
                      <span>50</span>
                    </div>
                    <Progress
                      value={59}
                      className="h-1"
                      indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>Administration</span>
                      <span>15</span>
                    </div>
                    <Progress
                      value={18}
                      className="h-1"
                      indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>Support Staff</span>
                      <span>20</span>
                    </div>
                    <Progress
                      value={23}
                      className="h-1"
                      indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Attendance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-xs text-muted-foreground">Average daily attendance</div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Present</span>
                      <span>92%</span>
                    </div>
                    <Progress
                      value={92}
                      className="h-1"
                      indicatorClassName={cn("bg-emerald-500 dark:bg-emerald-400")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>Absent</span>
                      <span>5%</span>
                    </div>
                    <Progress
                      value={5}
                      className="h-1"
                      indicatorClassName={cn("bg-rose-500 dark:bg-rose-400")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>Leave</span>
                      <span>3%</span>
                    </div>
                    <Progress
                      value={3}
                      className="h-1"
                      indicatorClassName={cn("bg-amber-500 dark:bg-amber-400")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Facilities Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">75%</div>
                  <div className="text-xs text-muted-foreground">Average facility utilization</div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Classrooms</span>
                      <span>90%</span>
                    </div>
                    <Progress
                      value={90}
                      className="h-1"
                      indicatorClassName={cn("bg-blue-500 dark:bg-blue-400")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>Labs</span>
                      <span>65%</span>
                    </div>
                    <Progress
                      value={65}
                      className="h-1"
                      indicatorClassName={cn("bg-purple-500 dark:bg-purple-400")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>Library</span>
                      <span>70%</span>
                    </div>
                    <Progress
                      value={70}
                      className="h-1"
                      indicatorClassName={cn("bg-indigo-500 dark:bg-indigo-400")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Financial Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.5M</div>
                  <div className="text-xs text-muted-foreground">Annual budget</div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Salaries</span>
                      <span>60%</span>
                    </div>
                    <Progress
                      value={60}
                      className="h-1"
                      indicatorClassName={cn("bg-green-500 dark:bg-green-400")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>Infrastructure</span>
                      <span>20%</span>
                    </div>
                    <Progress
                      value={20}
                      className="h-1"
                      indicatorClassName={cn("bg-cyan-500 dark:bg-cyan-400")}
                    />

                    <div className="flex items-center justify-between text-xs">
                      <span>Operations</span>
                      <span>20%</span>
                    </div>
                    <Progress
                      value={20}
                      className="h-1"
                      indicatorClassName={cn("bg-orange-500 dark:bg-orange-400")}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academics">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Performance by Grade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((grade) => (
                      <div key={grade} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{grade}</h3>
                          <span className="text-sm text-muted-foreground">
                            Average: {Math.floor(Math.random() * 15) + 75}%
                          </span>
                        </div>
                        <Progress
                          value={Math.floor(Math.random() * 20) + 75}
                          className="h-2"
                          indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Subjects Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Mathematics", "English", "Science", "History", "Languages"].map((subject) => (
                        <div key={subject} className="flex items-center justify-between">
                          <span>{subject}</span>
                          <span className="font-medium">{Math.floor(Math.random() * 15) + 75}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Extracurricular Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Sports", "Music", "Arts", "Debate", "Technology"].map((activity) => (
                        <div key={activity} className="flex items-center justify-between">
                          <span>{activity}</span>
                          <span className="font-medium">{Math.floor(Math.random() * 15) + 75}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Student Behavior</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Excellent</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Good</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Satisfactory</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Needs Improvement</span>
                        <span className="font-medium">5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="staff">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={cn(
                      "p-4 rounded-lg text-center",
                      "bg-muted text-foreground transition-colors duration-300"
                    )}>
                      <h3 className="text-xl font-bold">50</h3>
                      <p className="text-sm text-muted-foreground">Teachers</p>
                    </div>
                    <div className={cn(
                      "p-4 rounded-lg text-center",
                      "bg-muted text-foreground transition-colors duration-300"
                    )}>
                      <h3 className="text-xl font-bold">15</h3>
                      <p className="text-sm text-muted-foreground">Administration</p>
                    </div>
                    <div className={cn(
                      "p-4 rounded-lg text-center",
                      "bg-muted text-foreground transition-colors duration-300"
                    )}>
                      <h3 className="text-xl font-bold">20</h3>
                      <p className="text-sm text-muted-foreground">Support Staff</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-4">Teacher Distribution by Department</h3>
                    <div className="space-y-2">
                      {["Mathematics", "English", "Science", "Social Studies", "Arts", "Physical Education"].map((dept) => (
                        <div key={dept} className="flex items-center justify-between">
                          <span>{dept}</span>
                          <span className="font-medium">{Math.floor(Math.random() * 7) + 5}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Staff Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>PhD</span>
                      <span className="font-medium">5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Master's Degree</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bachelor's Degree</span>
                      <span className="font-medium">50%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="facilities">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Classroom Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Classrooms</span>
                      <span className="font-medium">40</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Smart Classrooms</span>
                      <span className="font-medium">25</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Regular Classrooms</span>
                      <span className="font-medium">15</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Capacity</span>
                      <span className="font-medium">30 students</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Specialized Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Science Labs</span>
                      <span className="font-medium">4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Computer Labs</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Library</span>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Auditorium</span>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sports Fields</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Excellent Condition</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-2 mb-4" />

                    <div className="flex items-center justify-between">
                      <span>Good Condition</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <Progress value={30} className="h-2 mb-4" />

                    <div className="flex items-center justify-between">
                      <span>Needs Maintenance</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Improvements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <h3 className="font-medium">Science Lab Renovation</h3>
                      <p className="text-sm text-muted-foreground">Scheduled for next semester</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h3 className="font-medium">New Computer Lab</h3>
                      <p className="text-sm text-muted-foreground">Planned for next academic year</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h3 className="font-medium">Sports Field Expansion</h3>
                      <p className="text-sm text-muted-foreground">In planning phase</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SchoolOverview;
