
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { SearchIcon, FilterIcon, PlusCircle, Save, Download } from "lucide-react";

// Mock data for grades
const studentsList = [
  { id: "ST001", name: "Alice Johnson", grades: { midterm: 85, final: 90, project: 92, participation: 88 }, average: 89 },
  { id: "ST002", name: "Bob Smith", grades: { midterm: 78, final: 82, project: 85, participation: 90 }, average: 84 },
  { id: "ST003", name: "Charlie Brown", grades: { midterm: 92, final: 94, project: 88, participation: 95 }, average: 92 },
  { id: "ST004", name: "Diana Prince", grades: { midterm: 75, final: 80, project: 82, participation: 78 }, average: 79 },
  { id: "ST005", name: "Edward Jones", grades: { midterm: 88, final: 91, project: 85, participation: 92 }, average: 89 },
  { id: "ST006", name: "Francis Miller", grades: { midterm: 95, final: 97, project: 94, participation: 96 }, average: 96 },
  { id: "ST007", name: "Grace Lee", grades: { midterm: 82, final: 85, project: 80, participation: 84 }, average: 83 },
  { id: "ST008", name: "Henry Wilson", grades: { midterm: 76, final: 79, project: 75, participation: 80 }, average: 78 },
];

// Mock course list
const coursesList = [
  { id: "MATH101", name: "Algebra I" },
  { id: "MATH201", name: "Algebra II" },
  { id: "ENG101", name: "English Literature" },
  { id: "SCI101", name: "Biology" },
  { id: "SCI201", name: "Chemistry" },
  { id: "HIST101", name: "World History" },
  { id: "CS101", name: "Introduction to Programming" },
  { id: "ART101", name: "Art History" },
];

const Grades = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("MATH101");
  const [students, setStudents] = useState(studentsList);
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [editedGrades, setEditedGrades] = useState<Record<string, number>>({});
  const [gradingScale, setGradingScale] = useState({
    A: 90,
    B: 80,
    C: 70,
    D: 60,
    F: 0
  });

  // Filter students based on search
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Start editing a student's grades
  const handleEditStudent = (studentId: string, grades: Record<string, number>) => {
    setEditingStudent(studentId);
    setEditedGrades(grades);
  };

  // Save edited grades
  const handleSaveGrades = (studentId: string) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        const average = Object.values(editedGrades).reduce((sum, grade) => sum + grade, 0) / Object.values(editedGrades).length;
        
        return {
          ...student,
          grades: editedGrades,
          average: Math.round(average)
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    setEditingStudent(null);
    
    toast({
      title: "Grades Saved",
      description: "Student grades have been updated successfully",
      duration: 3000,
    });
  };

  // Get letter grade based on number grade
  const getLetterGrade = (grade: number) => {
    if (grade >= gradingScale.A) return "A";
    if (grade >= gradingScale.B) return "B";
    if (grade >= gradingScale.C) return "C";
    if (grade >= gradingScale.D) return "D";
    return "F";
  };

  // Export grades as CSV
  const exportGradesCSV = () => {
    const headers = ["Student ID", "Name", "Midterm", "Final", "Project", "Participation", "Average", "Grade"];
    
    const csvContent = [
      headers.join(","),
      ...students.map(student => {
        return [
          student.id,
          student.name,
          student.grades.midterm,
          student.grades.final,
          student.grades.project,
          student.grades.participation,
          student.average,
          getLetterGrade(student.average)
        ].join(",");
      })
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${selectedCourse}_grades.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Grades Exported",
      description: "Grades have been exported as a CSV file",
      duration: 3000,
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Student Grades" />
      
      <main className="flex-1 overflow-auto bg-background p-6">
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <CardTitle>Grades Management</CardTitle>
                <CardDescription>View and manage student grades</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {coursesList.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={exportGradesCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                      <DialogDescription>
                        Enter the student details and initial grades
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-id">Student ID</Label>
                        <Input id="student-id" placeholder="e.g. ST009" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-name">Full Name</Label>
                        <Input id="student-name" placeholder="Student name" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="midterm">Midterm Grade</Label>
                          <Input id="midterm" type="number" min="0" max="100" placeholder="0-100" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="final">Final Grade</Label>
                          <Input id="final" type="number" min="0" max="100" placeholder="0-100" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="project">Project Grade</Label>
                          <Input id="project" type="number" min="0" max="100" placeholder="0-100" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="participation">Participation</Label>
                          <Input id="participation" type="number" min="0" max="100" placeholder="0-100" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea id="notes" placeholder="Additional comments or notes" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>Add Student</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-[300px]">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search students..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <FilterIcon className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="a">Grade A</SelectItem>
                <SelectItem value="b">Grade B</SelectItem>
                <SelectItem value="c">Grade C</SelectItem>
                <SelectItem value="d">Grade D</SelectItem>
                <SelectItem value="f">Grade F</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Grading Scale</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Grading Scale</DialogTitle>
                <DialogDescription>
                  Set the minimum scores for each letter grade
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade-a">A Grade (minimum)</Label>
                    <Input 
                      id="grade-a" 
                      type="number" 
                      min="0" 
                      max="100" 
                      value={gradingScale.A}
                      onChange={(e) => setGradingScale({...gradingScale, A: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade-b">B Grade (minimum)</Label>
                    <Input 
                      id="grade-b" 
                      type="number" 
                      min="0" 
                      max="100" 
                      value={gradingScale.B}
                      onChange={(e) => setGradingScale({...gradingScale, B: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade-c">C Grade (minimum)</Label>
                    <Input 
                      id="grade-c" 
                      type="number" 
                      min="0" 
                      max="100" 
                      value={gradingScale.C}
                      onChange={(e) => setGradingScale({...gradingScale, C: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade-d">D Grade (minimum)</Label>
                    <Input 
                      id="grade-d" 
                      type="number" 
                      min="0" 
                      max="100" 
                      value={gradingScale.D}
                      onChange={(e) => setGradingScale({...gradingScale, D: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button>Save Scale</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="grades" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead className="w-[100px] text-center">Midterm</TableHead>
                        <TableHead className="w-[100px] text-center">Final</TableHead>
                        <TableHead className="w-[100px] text-center">Project</TableHead>
                        <TableHead className="w-[100px] text-center">Participation</TableHead>
                        <TableHead className="w-[100px] text-center">Average</TableHead>
                        <TableHead className="w-[100px] text-center">Grade</TableHead>
                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-mono">{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          
                          {editingStudent === student.id ? (
                            // Edit mode
                            <>
                              <TableCell>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  max="100"
                                  className="w-16 h-8 text-center mx-auto"
                                  value={editedGrades.midterm}
                                  onChange={(e) => setEditedGrades({
                                    ...editedGrades,
                                    midterm: parseInt(e.target.value) || 0
                                  })}
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  max="100"
                                  className="w-16 h-8 text-center mx-auto"
                                  value={editedGrades.final}
                                  onChange={(e) => setEditedGrades({
                                    ...editedGrades,
                                    final: parseInt(e.target.value) || 0
                                  })}
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  max="100"
                                  className="w-16 h-8 text-center mx-auto"
                                  value={editedGrades.project}
                                  onChange={(e) => setEditedGrades({
                                    ...editedGrades,
                                    project: parseInt(e.target.value) || 0
                                  })}
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  max="100"
                                  className="w-16 h-8 text-center mx-auto"
                                  value={editedGrades.participation}
                                  onChange={(e) => setEditedGrades({
                                    ...editedGrades,
                                    participation: parseInt(e.target.value) || 0
                                  })}
                                />
                              </TableCell>
                              <TableCell className="text-center">-</TableCell>
                              <TableCell className="text-center">-</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  size="sm"
                                  onClick={() => handleSaveGrades(student.id)}
                                >
                                  <Save className="h-4 w-4 mr-1" />
                                  Save
                                </Button>
                              </TableCell>
                            </>
                          ) : (
                            // View mode
                            <>
                              <TableCell className="text-center">{student.grades.midterm}</TableCell>
                              <TableCell className="text-center">{student.grades.final}</TableCell>
                              <TableCell className="text-center">{student.grades.project}</TableCell>
                              <TableCell className="text-center">{student.grades.participation}</TableCell>
                              <TableCell className="text-center font-medium">{student.average}</TableCell>
                              <TableCell className="text-center">
                                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full 
                                  ${getLetterGrade(student.average) === 'A' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                                  getLetterGrade(student.average) === 'B' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 
                                  getLetterGrade(student.average) === 'C' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                  getLetterGrade(student.average) === 'D' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' : 
                                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}
                                >
                                  {getLetterGrade(student.average)}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditStudent(student.id, student.grades)}
                                >
                                  Edit
                                </Button>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Analytics of student performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <p className="text-muted-foreground">Grade distribution charts will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle>Student Comments</CardTitle>
                <CardDescription>Add comments and feedback for students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 text-center">
                  <p className="text-muted-foreground">This feature is coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </DashboardLayout>
  );
};

export default Grades;
