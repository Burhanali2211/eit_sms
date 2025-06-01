
import React, { useEffect, useRef, useState } from 'react';
import { BusRoute, BusLocation } from '@/types/transportation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus, MapPin, Phone, Users } from 'lucide-react';

interface BusTrackingMapProps {
  routes: BusRoute[];
  onLocationUpdate: (location: BusLocation) => void;
}

const BusTrackingMap: React.FC<BusTrackingMapProps> = ({ routes, onLocationUpdate }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [mapboxgl, setMapboxgl] = useState<any>(null);

  // Dynamically import mapbox-gl to avoid build issues
  useEffect(() => {
    const loadMapbox = async () => {
      try {
        const mapboxModule = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');
        setMapboxgl(mapboxModule.default);
      } catch (error) {
        console.error('Failed to load Mapbox GL:', error);
      }
    };

    if (mapboxToken && !mapboxgl) {
      loadMapbox();
    }
  }, [mapboxToken, mapboxgl]);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || !mapboxgl) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.006, 40.7128], // Default to NYC, should be configurable
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add bus routes and stops
    routes.forEach(route => {
      // Add bus stops
      route.stops.forEach(stop => {
        const el = document.createElement('div');
        el.className = 'bus-stop-marker';
        el.innerHTML = `
          <div class="bg-blue-500 rounded-full p-2 shadow-lg">
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
            </svg>
          </div>
        `;

        new mapboxgl.Marker(el)
          .setLngLat([stop.longitude, stop.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-semibold">${stop.name}</h3>
              <p class="text-sm text-gray-600">Route: ${route.routeName}</p>
              <p class="text-sm">Students: ${stop.students.length}</p>
            </div>
          `))
          .addTo(map.current!);
      });

      // Add bus location if available
      if (route.currentLocation) {
        const busEl = document.createElement('div');
        busEl.className = 'bus-marker';
        busEl.innerHTML = `
          <div class="bg-yellow-500 rounded-full p-3 shadow-lg animate-pulse">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M4 16C4 16.88 4.39 17.67 5 18.22V20C5 20.55 5.45 21 6 21H7C7.55 21 8 20.55 8 20V19H16V20C16 20.55 16.45 21 17 21H18C18.55 21 19 20.55 19 20V18.22C19.61 17.67 20 16.88 20 16V6C20 5.07 19.16 4.09 18 4L17.83 3.83C17.42 3.42 16.86 3.19 16.3 3.19H7.7C7.14 3.19 6.58 3.42 6.17 3.83L6 4C4.84 4.09 4 5.07 4 6V16M6.5 5H17.5C17.78 5 18 5.22 18 5.5V15.5C18 15.78 17.78 16 17.5 16H6.5C6.22 16 6 15.78 6 15.5V5.5C6 5.22 6.22 5 6.5 5M7.5 6.5V14.5H16.5V6.5H7.5Z"/>
            </svg>
          </div>
        `;

        new mapboxgl.Marker(busEl)
          .setLngLat([route.currentLocation.longitude, route.currentLocation.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <div class="p-3">
              <h3 class="font-semibold">${route.routeName}</h3>
              <p class="text-sm">Driver: ${route.driverName}</p>
              <p class="text-sm">Vehicle: ${route.vehicleNumber}</p>
              <p class="text-sm text-green-600">Status: Active</p>
            </div>
          `))
          .addTo(map.current!);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [routes, mapboxToken, mapboxgl]);

  const simulateLocationUpdate = (routeId: string) => {
    const route = routes.find(r => r.id === routeId);
    if (!route || !route.currentLocation) return;

    // Simulate GPS movement
    const newLocation: BusLocation = {
      routeId,
      latitude: route.currentLocation.latitude + (Math.random() - 0.5) * 0.001,
      longitude: route.currentLocation.longitude + (Math.random() - 0.5) * 0.001,
      speed: Math.random() * 50 + 10,
      heading: Math.random() * 360,
      timestamp: new Date().toISOString(),
      driverStatus: 'on-route'
    };

    onLocationUpdate(newLocation);
  };

  if (!mapboxToken) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Bus Tracking Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Please enter your Mapbox token to enable the bus tracking map.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter Mapbox public token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <Button onClick={() => window.open('https://mapbox.com/', '_blank')}>
                Get Token
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bus className="h-6 w-6" />
          Live Bus Tracking
        </h2>
        <div className="flex gap-2">
          {routes.map(route => (
            <Button
              key={route.id}
              variant={selectedRoute === route.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
            >
              {route.routeName}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div ref={mapContainer} className="h-[500px] w-full rounded-lg" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Routes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {routes.map(route => (
                <div key={route.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{route.routeName}</h4>
                    <Badge variant={route.isActive ? "default" : "secondary"}>
                      {route.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Driver: {route.driverName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{route.driverContact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4" />
                      <span>{route.vehicleNumber}</span>
                    </div>
                  </div>
                  {route.isActive && (
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => simulateLocationUpdate(route.id)}
                    >
                      Simulate GPS Update
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusTrackingMap;
