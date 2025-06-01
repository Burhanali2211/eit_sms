
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bus, MapPin, Users, AlertTriangle, Navigation } from 'lucide-react';
import BusTrackingMap from '@/components/transportation/BusTrackingMap';
import { BusRoute, BusLocation } from '@/types/transportation';
import { useBusRoutes } from '@/hooks/use-api';
import { apiClient } from '@/utils/api/client';
import { toast } from '@/hooks/use-toast';

interface TransportationDashboardProps {
  routes?: BusRoute[];
}

const TransportationDashboard: React.FC<TransportationDashboardProps> = ({ routes: propRoutes }) => {
  const { data: apiRoutes, loading, error, refetch } = useBusRoutes();
  const [routes, setRoutes] = useState<BusRoute[]>(propRoutes || []);

  // Use API data if available, fallback to props
  useEffect(() => {
    if (apiRoutes && Array.isArray(apiRoutes)) {
      setRoutes(apiRoutes);
    } else if (propRoutes) {
      setRoutes(propRoutes);
    }
  }, [apiRoutes, propRoutes]);

  const handleLocationUpdate = async (location: BusLocation) => {
    try {
      const response = await apiClient.updateBusLocation(location);
      if (response.error) {
        toast({
          title: 'Error',
          description: 'Failed to update bus location',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Location Updated',
          description: 'Bus location has been updated successfully',
        });
        // Refresh routes data
        refetch();
      }
    } catch (error) {
      console.error('Error updating bus location:', error);
      toast({
        title: 'Error', 
        description: 'Failed to update bus location',
        variant: 'destructive',
      });
    }
  };

  const activeRoutes = routes.filter(route => route.isActive);
  const totalStudents = routes.reduce((sum, route) => 
    sum + route.stops.reduce((stopSum, stop) => stopSum + stop.students.length, 0), 0
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Failed to Load Transportation Data</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={refetch}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bus className="h-4 w-4" />
              Active Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRoutes.length}</div>
            <p className="text-xs text-muted-foreground">
              {routes.length - activeRoutes.length} inactive
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students Transported
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across all routes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Bus Stops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {routes.reduce((sum, route) => sum + route.stops.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total stops
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              GPS Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">LIVE</div>
            <p className="text-xs text-muted-foreground">
              Real-time updates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bus Tracking Map */}
      <BusTrackingMap routes={routes} onLocationUpdate={handleLocationUpdate} />
      
      {/* Routes Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        {routes.map((route) => (
          <Card key={route.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{route.routeName}</CardTitle>
                <Badge variant={route.isActive ? "default" : "secondary"}>
                  {route.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Driver:</span>
                  <span>{route.driverName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vehicle:</span>
                  <span>{route.vehicleNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Capacity:</span>
                  <span>{route.capacity} students</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stops:</span>
                  <span>{route.stops.length}</span>
                </div>
                {route.estimatedArrival && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">ETA:</span>
                    <span className="font-medium">{route.estimatedArrival}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TransportationDashboard;
