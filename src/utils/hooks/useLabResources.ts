
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { LabResource } from "@/pages/dashboard/admin/LabResourceTable";
import { NewResource } from "@/pages/dashboard/admin/AddResourceDialog";
import { useDatabaseTable, useDatabaseView } from "@/hooks/use-database-connection";

export function useLabResources() {
  // Get lab resources from database
  const { 
    data: resources, 
    isLoading: resourcesLoading, 
    error: resourcesError,
    create: createResource,
    update: updateResource,
    remove: removeResource,
    refresh: refreshResources
  } = useDatabaseTable<LabResource>("lab_resources");
  
  // Get additional dashboard stats from database view
  const {
    data: dashboardStats,
    isLoading: statsLoading,
    error: statsError
  } = useDatabaseView("lab_resources_dashboard_view", {}, {}, 60000);

  // Calculate dashboard stats
  const totalResources = resources ? resources.length : 0;
  const totalItems = resources ? resources.reduce((sum, r) => sum + r.quantity, 0) : 0;
  const availableItems = resources ? resources.reduce((sum, r) => sum + r.available, 0) : 0;
  const inUseItems = resources ? resources.reduce((sum, r) => sum + (r.quantity - r.available), 0) : 0;
  const needsMaintenance = resources ? resources.filter(r => {
    const lastMaintenance = new Date(r.lastMaintenance || "");
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return lastMaintenance < threeMonthsAgo;
  }).length : 0;
  
  // Resource types
  const resourceTypes = ["Science", "Technology", "Art", "Sports", "Music"];
  
  // Add new resource handler
  const handleAddResource = async (newResource: NewResource) => {
    try {
      await createResource(newResource);
      toast({
        title: "Success",
        description: "Resource added successfully",
      });
      return Promise.resolve();
    } catch (error) {
      console.error("Error adding resource:", error);
      return Promise.reject(error);
    }
  };
  
  // Delete resource handler
  const handleDeleteResource = async (id: string) => {
    try {
      await removeResource(id);
      return Promise.resolve();
    } catch (error) {
      console.error("Error deleting resource:", error);
      return Promise.reject(error);
    }
  };
  
  // Schedule maintenance handler
  const handleScheduleMaintenance = async (id: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await updateResource(id, { lastMaintenance: today });
      toast({
        title: "Maintenance Scheduled",
        description: "Maintenance has been scheduled for today.",
      });
      return Promise.resolve();
    } catch (error) {
      console.error("Error scheduling maintenance:", error);
      return Promise.reject(error);
    }
  };
  
  return {
    resources,
    resourcesLoading,
    resourcesError,
    dashboardStats,
    statsLoading,
    statsError,
    totalResources,
    totalItems,
    availableItems,
    inUseItems,
    needsMaintenance,
    resourceTypes,
    handleAddResource,
    handleDeleteResource,
    handleScheduleMaintenance,
    refreshResources
  };
}
