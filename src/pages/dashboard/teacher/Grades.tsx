
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, Users, BookOpen, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Grades = () => {
  const [selectedClass, setSelectedClass] = useState("math-101");
  const [selectedAssignment, setSelectedAssignment] = useState("all");

  const classes = [
    { id: "math-101", name: "Mathematics 101", students: 25 },
    { id: "math-102", name: "Mathematics 102", students: 20 },
    { id: "algebra", name: "Algebra", students: 18 }
  ];

  const assignments = [
    { id: "midterm", name: "Midterm Exam", type: "exam", maxPoints: 100 },
    { id: "quiz1", name: "Quiz 1", type: "quiz", maxPoints: 50 },
    { id: "homework1", name: "Homework 1", type: "homework", maxPoints: 25 },
    { id: "final", name: "Final Project", type: "project", maxPoints: 150 }
  ];

  const grades = [
    {
      studentId: "1",
      name: "Alice Johnson",
      email: "alice@school.edu",
      midterm: 85,
      quiz1: 42,
      homework1: 23,
      final: 135,
      average: 87.5
    },
    {
      studentId: "2", 
      name: "Bob Smith",
      email: "bob@school.edu",
      midterm: 78,
      quiz1: 38,
      homework1: 25,
      final: 128,
      average: 82.3
    },
    {
      studentId: "3",
      name: "Carol Davis",
      email: "carol@school.edu", 
      midterm: 92,
      quiz1: 47,
      homework1: 24,
      final: 142,
      average: 91.2
    },
    {
      studentId: "4",
      name: "David Wilson",
      email: "david@school.edu",
      midterm: 73,
      quiz1: 35,
      homework1: 20,
      final: 115,
      average: 75.8
    }
  ];

  const getGradeColor = (grade: number, maxPoints: number) => {
    const percentage = (grade / maxPoints) * 100;
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getLetterGrade = (average: number) => {
    if (average >= 90) return "A";
    if (average >= 80) return "B";
    if (average >= 70) return "C";
    if (average >= 60) return "D";
    return "F";
  };

  const handleGradeUpdate = (studentId: string, assignment: string, newGrade: string) => {
    toast({
      title: "Grade Updated",
      description: `Updated grade for student ${studentId}`,
    });
  };

  const classAverage = grades.reduce((sum, student) => sum + student.average, 0) / grades.length;

  return (
    <DashboardLayout>
      <DashboardHeader title="Grades" description="Manage student grades and assessments" />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <div className="grid gap-6 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{grades.length}</div>
              <p className="text-xs text-muted-foreground">In selected class</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Class Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classAverage.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignments.length}</div>
              <p className="text-xs text-muted-foreground">Total graded</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Passing Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((grades.filter(g => g.average >= 70).length / grades.length) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">Students passing</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Grade Management</CardTitle>
                <CardDescription>View and update student grades</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Midterm (100)</TableHead>
                  <TableHead>Quiz 1 (50)</TableHead>
                  <TableHead>Homework 1 (25)</TableHead>
                  <TableHead>Final (150)</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={student.midterm}
                        onChange={(e) => handleGradeUpdate(student.studentId, "midterm", e.target.value)}
                        className={`w-16 ${getGradeColor(student.midterm, 100)}`}
                        max={100}
                        min={0}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={student.quiz1}
                        onChange={(e) => handleGradeUpdate(student.studentId, "quiz1", e.target.value)}
                        className={`w-16 ${getGradeColor(student.quiz1, 50)}`}
                        max={50}
                        min={0}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={student.homework1}
                        onChange={(e) => handleGradeUpdate(student.studentId, "homework1", e.target.value)}
                        className={`w-16 ${getGradeColor(student.homework1, 25)}`}
                        max={25}
                        min={0}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={student.final}
                        onChange={(e) => handleGradeUpdate(student.studentId, "final", e.target.value)}
                        className={`w-16 ${getGradeColor(student.final, 150)}`}
                        max={150}
                        min={0}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {student.average.toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.average >= 70 ? "default" : "destructive"}>
                        {getLetterGrade(student.average)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Grades;
