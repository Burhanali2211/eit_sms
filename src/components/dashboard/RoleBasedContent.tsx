
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types/dashboard";

interface RoleBasedContentProps {
  role: UserRole;
}

const RoleBasedContent = ({ role }: RoleBasedContentProps) => {
  if (role === 'student') {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted">
              <div className="flex items-center">
                <div className="w-2 h-10 bg-school-primary rounded-full mr-4"></div>
                <div>
                  <h3 className="font-medium">Please check database connection</h3>
                  <p className="text-sm text-muted-foreground">No courses found</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (role === 'teacher') {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>My Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['10A - Mathematics', '10B - Mathematics', '11A - Mathematics', '11B - Mathematics'].map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-2 h-10 bg-school-secondary rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-medium">{course}</h3>
                    <p className="text-sm text-muted-foreground">Next class: Tomorrow, 11:00 AM</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (role === 'principal' || role === 'admin' || role === 'super-admin') {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>School Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <h3 className="text-xl font-bold">1,250</h3>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <h3 className="text-xl font-bold">85</h3>
              <p className="text-sm text-muted-foreground">Faculty &amp; Staff</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <h3 className="text-xl font-bold">40</h3>
              <p className="text-sm text-muted-foreground">Classrooms</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <h3 className="text-xl font-bold">12</h3>
              <p className="text-sm text-muted-foreground">Labs &amp; Facilities</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default RoleBasedContent;
