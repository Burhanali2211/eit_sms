
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bus, MapPin, Clock, Users, Phone, AlertTriangle } from 'lucide-react';
import { BusRoute } from '@/types/transportation';

interface TransportationDashboardProps {
  routes: BusRoute[];
}

const TransportationDashboard: React.FC<TransportationDashboardProps> = ({ routes }) => {
  const activeRoutes = routes.filter(route => route.isActive);
  const totalStudents = routes.reduce((acc, route) => 
    acc + route.stops.reduce((stopAcc, stop) => stopAcc + stop.students.length, 0), 0
  );

  return (
    <div className="space-y-6">
      {/* Transportation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bus className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-xl font-bold">{activeRoutes.length}</p>
                <p className="text-sm text-gray-600">Active Routes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-xl font-bold">{totalStudents}</p>
                <p className="text-sm text-gray-600">Students on Transport</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-orange-600" />
              <div>
                <p className="text-xl font-bold">{routes.reduce((acc, route) => acc + route.stops.length, 0)}</p>
                <p className="text-sm text-gray-600">Total Stops</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-purple-600" />
              <div>
                <p className="text-xl font-bold">98%</p>
                <p className="text-sm text-gray-600">On-Time Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Route Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bus className="h-5 w-5" />
            Live Route Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map(route => (
              <div key={route.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${route.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  <div>
                    <h4 className="font-semibold">{route.routeName}</h4>
                    <p className="text-sm text-gray-600">{route.driverName} • {route.vehicleNumber}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={route.isActive ? "default" : "secondary"}>
                    {route.isActive ? "On Route" : "Inactive"}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">ETA: {route.estimatedArrival}</p>
                    <p className="text-sm text-gray-600">{route.stops.reduce((acc, stop) => acc + stop.students.length, 0)} students</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <MapPin className="h-6 w-6" />
              <span>View Live Map</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Phone className="h-6 w-6" />
              <span>Contact Drivers</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Emergency Alert</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportationDashboard;
