
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import BusTrackingMap from '@/components/transportation/BusTrackingMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BusRoute, BusLocation, Student } from '@/types/transportation';
import { Bus, Users, MapPin, Clock, Phone, AlertTriangle } from 'lucide-react';

const Transportation = () => {
  const { user } = useAuth();
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [emergencyAlerts, setEmergencyAlerts] = useState<any[]>([]);

  // Mock data initialization
  useEffect(() => {
    const mockRoutes: BusRoute[] = [
      {
        id: '1',
        routeName: 'Route A - Downtown',
        driverName: 'John Smith',
        driverContact: '+1-555-0101',
        vehicleNumber: 'SCH-001',
        capacity: 40,
        currentLocation: {
          latitude: 40.7128,
          longitude: -74.0060,
          timestamp: new Date().toISOString()
        },
        stops: [
          {
            id: '1',
            name: 'Main Street',
            latitude: 40.7138,
            longitude: -74.0050,
            estimatedTime: '08:15 AM',
            students: ['student1', 'student2']
          },
          {
            id: '2',
            name: 'Park Avenue',
            latitude: 40.7118,
            longitude: -74.0070,
            estimatedTime: '08:25 AM',
            students: ['student3', 'student4', 'student5']
          }
        ],
        isActive: true,
        estimatedArrival: '08:35 AM'
      },
      {
        id: '2',
        routeName: 'Route B - Suburbs',
        driverName: 'Sarah Johnson',
        driverContact: '+1-555-0102',
        vehicleNumber: 'SCH-002',
        capacity: 35,
        currentLocation: {
          latitude: 40.7058,
          longitude: -74.0100,
          timestamp: new Date().toISOString()
        },
        stops: [
          {
            id: '3',
            name: 'Oak Street',
            latitude: 40.7068,
            longitude: -74.0110,
            estimatedTime: '08:20 AM',
            students: ['student6']
          },
          {
            id: '4',
            name: 'Elm Avenue',
            latitude: 40.7048,
            longitude: -74.0120,
            estimatedTime: '08:30 AM',
            students: ['student7', 'student8']
          }
        ],
        isActive: true,
        estimatedArrival: '08:40 AM'
      }
    ];

    const mockStudents: Student[] = [
      { id: 'student1', name: 'Alice Johnson', grade: '10', section: 'A', routeId: '1', stopId: '1', parentContact: '+1-555-1001' },
      { id: 'student2', name: 'Bob Smith', grade: '10', section: 'B', routeId: '1', stopId: '1', parentContact: '+1-555-1002' },
      { id: 'student3', name: 'Carol Davis', grade: '11', section: 'A', routeId: '1', stopId: '2', parentContact: '+1-555-1003' },
      { id: 'student4', name: 'David Wilson', grade: '11', section: 'B', routeId: '1', stopId: '2', parentContact: '+1-555-1004' },
      { id: 'student5', name: 'Eva Brown', grade: '12', section: 'A', routeId: '1', stopId: '2', parentContact: '+1-555-1005' },
      { id: 'student6', name: 'Frank Miller', grade: '9', section: 'A', routeId: '2', stopId: '3', parentContact: '+1-555-1006' },
      { id: 'student7', name: 'Grace Lee', grade: '9', section: 'B', routeId: '2', stopId: '4', parentContact: '+1-555-1007' },
      { id: 'student8', name: 'Henry Clark', grade: '10', section: 'C', routeId: '2', stopId: '4', parentContact: '+1-555-1008' }
    ];

    setBusRoutes(mockRoutes);
    setStudents(mockStudents);
  }, []);

  const handleLocationUpdate = (location: BusLocation) => {
    setBusRoutes(prev => prev.map(route => 
      route.id === location.routeId 
        ? {
            ...route,
            currentLocation: {
              latitude: location.latitude,
              longitude: location.longitude,
              timestamp: location.timestamp
            }
          }
        : route
    ));
  };

  const getStudentsForRoute = (routeId: string) => {
    return students.filter(student => student.routeId === routeId);
  };

  const getTotalStudentsOnRoute = (routeId: string) => {
    return getStudentsForRoute(routeId).length;
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Transportation Management" />
      
      <main className="flex-1 overflow-auto p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Bus className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{busRoutes.length}</p>
                  <p className="text-sm text-gray-600">Active Routes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{students.length}</p>
                  <p className="text-sm text-gray-600">Students Using Transport</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MapPin className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{busRoutes.reduce((acc, route) => acc + route.stops.length, 0)}</p>
                  <p className="text-sm text-gray-600">Total Stops</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-gray-600">On-Time Performance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="map" className="space-y-4">
          <TabsList>
            <TabsTrigger value="map">Live Tracking</TabsTrigger>
            <TabsTrigger value="routes">Route Management</TabsTrigger>
            <TabsTrigger value="students">Student Assignment</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <BusTrackingMap routes={busRoutes} onLocationUpdate={handleLocationUpdate} />
          </TabsContent>

          <TabsContent value="routes">
            <Card>
              <CardHeader>
                <CardTitle>Route Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {busRoutes.map(route => (
                    <div key={route.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">{route.routeName}</h3>
                        <Badge variant={route.isActive ? "default" : "secondary"}>
                          {route.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Driver</p>
                          <p className="text-gray-600">{route.driverName}</p>
                          <p className="text-gray-600">{route.driverContact}</p>
                        </div>
                        <div>
                          <p className="font-medium">Vehicle</p>
                          <p className="text-gray-600">{route.vehicleNumber}</p>
                          <p className="text-gray-600">Capacity: {route.capacity}</p>
                        </div>
                        <div>
                          <p className="font-medium">Students</p>
                          <p className="text-gray-600">{getTotalStudentsOnRoute(route.id)} assigned</p>
                          <p className="text-gray-600">{route.capacity - getTotalStudentsOnRoute(route.id)} seats available</p>
                        </div>
                        <div>
                          <p className="font-medium">ETA</p>
                          <p className="text-gray-600">{route.estimatedArrival}</p>
                          <p className="text-gray-600">{route.stops.length} stops</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Transportation Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {busRoutes.map(route => (
                    <div key={route.id} className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-3">{route.routeName}</h3>
                      <div className="space-y-2">
                        {route.stops.map(stop => (
                          <div key={stop.id} className="bg-gray-50 rounded p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{stop.name}</h4>
                              <Badge variant="outline">{stop.estimatedTime}</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {getStudentsForRoute(route.id)
                                .filter(student => student.stopId === stop.id)
                                .map(student => (
                                <div key={student.id} className="bg-white rounded p-2 text-sm">
                                  <p className="font-medium">{student.name}</p>
                                  <p className="text-gray-600">Grade {student.grade}{student.section}</p>
                                  <p className="text-gray-600 flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {student.parentContact}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800">All Routes Operating Normally</h4>
                    <p className="text-green-600 text-sm mt-1">All buses are on schedule and operating as expected.</p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800">Route B - Minor Delay</h4>
                    <p className="text-yellow-600 text-sm mt-1">Expected 5-minute delay due to traffic. Parents notified automatically.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Recent Notifications</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>Parents notified: Route A arriving in 10 minutes</span>
                        <span className="text-gray-500">2 min ago</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>Bus SCH-002 completed morning route</span>
                        <span className="text-gray-500">15 min ago</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>Daily safety check completed for all vehicles</span>
                        <span className="text-gray-500">1 hour ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </DashboardLayout>
  );
};

export default Transportation;
