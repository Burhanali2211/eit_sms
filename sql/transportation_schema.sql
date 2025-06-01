
-- Transportation Management Tables
-- This script adds comprehensive transportation tracking tables

-- Bus Routes Table
CREATE TABLE IF NOT EXISTS bus_routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_name VARCHAR(255) NOT NULL,
  route_code VARCHAR(50) UNIQUE NOT NULL,
  vehicle_number VARCHAR(100) NOT NULL,
  driver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  driver_name VARCHAR(255) NOT NULL,
  driver_contact VARCHAR(100) NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 40,
  is_active BOOLEAN DEFAULT TRUE,
  estimated_arrival_time TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bus Stops Table
CREATE TABLE IF NOT EXISTS bus_stops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID REFERENCES bus_routes(id) ON DELETE CASCADE,
  stop_name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  stop_order INTEGER NOT NULL,
  estimated_time TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(route_id, stop_order)
);

-- Student Transportation Assignment
CREATE TABLE IF NOT EXISTS student_transportation (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  route_id UUID REFERENCES bus_routes(id) ON DELETE CASCADE,
  stop_id UUID REFERENCES bus_stops(id) ON DELETE CASCADE,
  parent_contact VARCHAR(100),
  emergency_contact VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, route_id)
);

-- Bus Location Tracking (GPS Data)
CREATE TABLE IF NOT EXISTS bus_location_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID REFERENCES bus_routes(id) ON DELETE CASCADE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  speed DECIMAL(5, 2) DEFAULT 0,
  heading DECIMAL(5, 2) DEFAULT 0,
  driver_status VARCHAR(50) DEFAULT 'on-route' CHECK (driver_status IN ('on-route', 'at-stop', 'delayed', 'emergency', 'off-duty')),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transportation Alerts and Notifications
CREATE TABLE IF NOT EXISTS transportation_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID REFERENCES bus_routes(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('delay', 'breakdown', 'emergency', 'arrival', 'departure')),
  message TEXT NOT NULL,
  severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical', 'emergency')),
  is_resolved BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Transportation Dashboard View
CREATE OR REPLACE VIEW transportation_dashboard_view AS
SELECT
    (SELECT COUNT(*) FROM bus_routes WHERE is_active = TRUE) as active_routes,
    (SELECT COUNT(*) FROM student_transportation WHERE is_active = TRUE) as students_using_transport,
    (SELECT COUNT(*) FROM bus_stops) as total_stops,
    (SELECT COUNT(*) FROM transportation_alerts WHERE is_resolved = FALSE) as active_alerts,
    (SELECT jsonb_object_agg(br.route_name, 
        (SELECT COUNT(*) FROM student_transportation st WHERE st.route_id = br.id AND st.is_active = TRUE)
    ) FROM bus_routes br WHERE br.is_active = TRUE) as students_per_route,
    (SELECT jsonb_object_agg(alert_type, count(*)) 
     FROM transportation_alerts 
     WHERE created_at >= CURRENT_DATE - INTERVAL '7 days' 
     GROUP BY alert_type) as alerts_by_type;

-- Live Bus Locations View
CREATE OR REPLACE VIEW live_bus_locations AS
SELECT DISTINCT ON (blt.route_id)
    br.id as route_id,
    br.route_name,
    br.vehicle_number,
    br.driver_name,
    br.driver_contact,
    blt.latitude,
    blt.longitude,
    blt.speed,
    blt.heading,
    blt.driver_status,
    blt.recorded_at as last_update,
    (SELECT COUNT(*) FROM student_transportation st WHERE st.route_id = br.id AND st.is_active = TRUE) as student_count
FROM bus_location_tracking blt
JOIN bus_routes br ON blt.route_id = br.id
WHERE br.is_active = TRUE
ORDER BY blt.route_id, blt.recorded_at DESC;

-- Route Performance View
CREATE OR REPLACE VIEW route_performance_view AS
SELECT
    br.id,
    br.route_name,
    br.vehicle_number,
    br.capacity,
    (SELECT COUNT(*) FROM student_transportation st WHERE st.route_id = br.id AND st.is_active = TRUE) as students_assigned,
    br.capacity - (SELECT COUNT(*) FROM student_transportation st WHERE st.route_id = br.id AND st.is_active = TRUE) as available_seats,
    (SELECT COUNT(*) FROM bus_stops bs WHERE bs.route_id = br.id) as total_stops,
    (SELECT AVG(EXTRACT(EPOCH FROM (blt.recorded_at - LAG(blt.recorded_at) OVER (ORDER BY blt.recorded_at)))) 
     FROM bus_location_tracking blt 
     WHERE blt.route_id = br.id 
     AND blt.recorded_at >= CURRENT_DATE) as avg_stop_time_seconds,
    (SELECT COUNT(*) FROM transportation_alerts ta 
     WHERE ta.route_id = br.id 
     AND ta.created_at >= CURRENT_DATE - INTERVAL '30 days') as alerts_last_30_days
FROM bus_routes br
WHERE br.is_active = TRUE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bus_location_tracking_route_recorded ON bus_location_tracking(route_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_student_transportation_route ON student_transportation(route_id) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_transportation_alerts_route ON transportation_alerts(route_id, created_at);
CREATE INDEX IF NOT EXISTS idx_bus_stops_route_order ON bus_stops(route_id, stop_order);

-- Add update triggers
CREATE TRIGGER update_bus_routes_timestamp BEFORE UPDATE ON bus_routes FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_bus_stops_timestamp BEFORE UPDATE ON bus_stops FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_student_transportation_timestamp BEFORE UPDATE ON student_transportation FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

-- Add audit trails for critical transportation tables
CREATE TRIGGER bus_routes_audit_trail AFTER INSERT OR UPDATE OR DELETE ON bus_routes
  FOR EACH ROW EXECUTE PROCEDURE log_audit_trail();

CREATE TRIGGER student_transportation_audit_trail AFTER INSERT OR UPDATE OR DELETE ON student_transportation
  FOR EACH ROW EXECUTE PROCEDURE log_audit_trail();

-- Insert sample data for demonstration
INSERT INTO bus_routes (route_name, route_code, vehicle_number, driver_name, driver_contact, capacity, estimated_arrival_time)
VALUES 
('Route A - Downtown', 'RTA', 'SCH-001', 'John Smith', '+1-555-0101', 40, '08:35:00'),
('Route B - Suburbs', 'RTB', 'SCH-002', 'Sarah Johnson', '+1-555-0102', 35, '08:40:00'),
('Route C - North District', 'RTC', 'SCH-003', 'Mike Wilson', '+1-555-0103', 45, '08:30:00')
ON CONFLICT DO NOTHING;

-- Insert sample bus stops
INSERT INTO bus_stops (route_id, stop_name, latitude, longitude, stop_order, estimated_time)
SELECT br.id, stop_data.stop_name, stop_data.latitude, stop_data.longitude, stop_data.stop_order, stop_data.estimated_time
FROM bus_routes br
CROSS JOIN (VALUES
    ('Main Street', 40.7138, -74.0050, 1, '08:15:00'),
    ('Park Avenue', 40.7118, -74.0070, 2, '08:25:00'),
    ('School Entrance', 40.7158, -74.0030, 3, '08:35:00')
) AS stop_data(stop_name, latitude, longitude, stop_order, estimated_time)
WHERE br.route_code = 'RTA'
ON CONFLICT DO NOTHING;

INSERT INTO bus_stops (route_id, stop_name, latitude, longitude, stop_order, estimated_time)
SELECT br.id, stop_data.stop_name, stop_data.latitude, stop_data.longitude, stop_data.stop_order, stop_data.estimated_time
FROM bus_routes br
CROSS JOIN (VALUES
    ('Oak Street', 40.7068, -74.0110, 1, '08:20:00'),
    ('Elm Avenue', 40.7048, -74.0120, 2, '08:30:00'),
    ('School Entrance', 40.7158, -74.0030, 3, '08:40:00')
) AS stop_data(stop_name, latitude, longitude, stop_order, estimated_time)
WHERE br.route_code = 'RTB'
ON CONFLICT DO NOTHING;

-- Insert sample GPS tracking data (simulated)
INSERT INTO bus_location_tracking (route_id, latitude, longitude, speed, heading, driver_status)
SELECT br.id, 40.7128 + (RANDOM() - 0.5) * 0.01, -74.0060 + (RANDOM() - 0.5) * 0.01, 
       RANDOM() * 40 + 10, RANDOM() * 360, 'on-route'
FROM bus_routes br
WHERE br.is_active = TRUE
ON CONFLICT DO NOTHING;
