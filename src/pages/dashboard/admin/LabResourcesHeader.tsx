
import { Monitor, Microscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
  totalResources: number;
  totalItems: number;
  availableItems: number;
  inUseItems: number;
  needsMaintenance: number;
}

const LabResourcesHeader = ({
  totalResources,
  totalItems,
  availableItems,
  inUseItems,
  needsMaintenance
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Total Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalResources} types</div>
          <p className="text-xs text-muted-foreground mt-1">
            {totalItems} total items
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Available Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {availableItems} items
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Ready for use
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            In Use
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {inUseItems} items
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Currently checked out
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Needs Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {needsMaintenance} items
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Over 3 months since last check
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabResourcesHeader;
