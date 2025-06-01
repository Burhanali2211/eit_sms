
export interface BusRoute {
  id: string;
  routeName: string;
  driverName: string;
  driverContact: string;
  vehicleNumber: string;
  capacity: number;
  currentLocation?: {
    latitude: number;
    longitude: number;
    timestamp: string;
  };
  stops: BusStop[];
  isActive: boolean;
  estimatedArrival?: string;
}

export interface BusStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  estimatedTime?: string;
  students: string[];
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  routeId?: string;
  stopId?: string;
  parentContact: string;
}

export interface BusLocation {
  routeId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: string;
  driverStatus: 'on-route' | 'at-stop' | 'delayed' | 'emergency';
}
