
import { ChevronRight, Users, Clock, CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClassCardProps {
  classData: any;
  isSelected: boolean;
  onClick: () => void;
}

const ClassCard = ({ classData, isSelected, onClick }: ClassCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all ${
        isSelected 
          ? 'border-school-primary shadow-md' 
          : 'hover:border-gray-300 dark:hover:border-gray-700'
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Class {classData.name}</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{classData.students || 0} Students</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{classData.schedule || "No schedule"}</span>
          </div>
          <div className="flex items-center text-sm">
            <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Room {classData.room || "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
