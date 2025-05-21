
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LabResourcesHeader from "./LabResourcesHeader";
import LabResourceTable from "./LabResourceTable";
import AddResourceDialog from "./AddResourceDialog";
import { useLabResources } from "@/utils/hooks/useLabResources";

const LabResources = () => {
  const {
    resources,
    resourcesLoading,
    resourceTypes,
    totalResources,
    totalItems,
    availableItems,
    inUseItems,
    needsMaintenance,
    handleAddResource,
    handleDeleteResource,
    handleScheduleMaintenance
  } = useLabResources();
  
  if (resourcesLoading) {
    return (
      <DashboardLayout>
        <DashboardHeader title="Lab Resources" />
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading resources...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="Lab Resources" />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <LabResourcesHeader 
          totalResources={totalResources}
          totalItems={totalItems}
          availableItems={availableItems}
          inUseItems={inUseItems}
          needsMaintenance={needsMaintenance}
        />
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Lab Resources Inventory</CardTitle>
                <CardDescription>Manage equipment and materials for school labs</CardDescription>
              </div>
              <AddResourceDialog 
                resourceTypes={resourceTypes}
                onAddResource={handleAddResource}
              />
            </div>
          </CardHeader>
          <CardContent>
            <LabResourceTable 
              resources={resources || []}
              onScheduleMaintenance={handleScheduleMaintenance}
              onDeleteResource={handleDeleteResource}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LabResources;
