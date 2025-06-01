import React from 'react';
import { UserRole } from '@/types/dashboard';
import TransportationDashboard from './TransportationDashboard';
import { BusRoute } from '@/types/transportation';

interface RoleBasedContentProps {
  role: UserRole;
}

const RoleBasedContent = ({ role }: RoleBasedContentProps) => {
  // Mock transportation data for demo
  const mockBusRoutes: BusRoute[] = [
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
          id: '2',
          name: 'Oak Street',
          latitude: 40.7068,
          longitude: -74.0110,
          estimatedTime: '08:20 AM',
          students: ['student3']
        }
      ],
      isActive: true,
      estimatedArrival: '08:40 AM'
    }
  ];

  switch (role) {
    case 'admin':
    case 'school-admin':
    case 'principal':
    case 'super-admin':
      return (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Transportation Overview</h2>
          <TransportationDashboard routes={mockBusRoutes} />
        </div>
      );
      
    case 'student':
      return (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-bold">My Transportation</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800">Route A - Downtown</h3>
            <p className="text-blue-600">Your bus will arrive at Main Street at 08:15 AM</p>
            <p className="text-sm text-blue-600 mt-1">Driver: John Smith • Vehicle: SCH-001</p>
          </div>
        </div>
      );
      
    case 'teacher':
      return (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-bold">Duty Schedule</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800">Bus Duty - Today</h3>
            <p className="text-green-600">Morning duty: 8:00 AM - 8:30 AM at Main Entrance</p>
            <p className="text-sm text-green-600 mt-1">Supervise student boarding for Routes A & B</p>
          </div>
        </div>
      );
      
    default:
      return null;
  }
};

export default RoleBasedContent;
