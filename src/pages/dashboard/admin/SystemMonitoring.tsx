
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Cpu,
  HardDrive,
  Database,
  Network,
  RefreshCw,
  Users,
  Zap,
  Gauge,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Types
interface ResourceUsage {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

interface ServiceMetric {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  metric: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface HistoricalDataPoint {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  activeSessions: number;
  responseTime: number;
}

// Generate mock data
const generateHistoricalData = (): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  const now = new Date();
  let cpuBase = 40;
  let memoryBase = 50;
  let diskBase = 65;
  let networkBase = 30;
  let sessionsBase = 120;
  let responseBase = 180;
  
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    const hour = time.getHours();
    
    // Create some variation based on "working hours"
    const isWorkingHours = hour >= 9 && hour <= 18;
    const variation = isWorkingHours ? 20 : 8;
    
    // Add some random noise
    const cpuNoise = Math.random() * variation - variation / 2;
    const memoryNoise = Math.random() * variation - variation / 2;
    const diskNoise = Math.random() * (variation / 4) - variation / 8;
    const networkNoise = Math.random() * variation - variation / 2;
    const sessionsNoise = Math.random() * (isWorkingHours ? 50 : 15);
    const responseNoise = Math.random() * (isWorkingHours ? 40 : 20);
    
    // Make some basic trends
    cpuBase += Math.random() > 0.7 ? Math.random() * 2 - 1 : 0;
    memoryBase += Math.random() > 0.8 ? Math.random() * 2 - 0.5 : 0;
    diskBase += 0.1; // Disk usage slowly increases
    networkBase = Math.max(20, Math.min(80, networkBase + (Math.random() * 6 - 3)));
    
    data.push({
      timestamp: time.toISOString(),
      cpu: Math.max(5, Math.min(95, cpuBase + cpuNoise)),
      memory: Math.max(10, Math.min(95, memoryBase + memoryNoise)),
      disk: Math.max(40, Math.min(95, diskBase + diskNoise)),
      network: Math.max(5, Math.min(95, networkBase + networkNoise)),
      activeSessions: Math.max(5, Math.min(250, sessionsBase + sessionsNoise)),
      responseTime: Math.max(50, Math.min(500, responseBase + responseNoise)),
    });
  }
  
  return data;
};

const historicalData = generateHistoricalData();

// Mock current resource usage
const currentUsage: ResourceUsage = {
  cpu: historicalData[historicalData.length - 1].cpu,
  memory: historicalData[historicalData.length - 1].memory,
  disk: historicalData[historicalData.length - 1].disk,
  network: historicalData[historicalData.length - 1].network,
};

// Mock services metrics
const servicesMetrics: ServiceMetric[] = [
  {
    name: "API Gateway",
    status: "healthy",
    metric: 205,
    unit: "ms",
    trend: "stable",
    change: 0.2
  },
  {
    name: "Authentication",
    status: "healthy",
    metric: 95,
    unit: "ms",
    trend: "down",
    change: -5.4
  },
  {
    name: "Database",
    status: "warning",
    metric: 350,
    unit: "ms",
    trend: "up",
    change: 12.8
  },
  {
    name: "Storage Service",
    status: "healthy",
    metric: 87,
    unit: "%",
    trend: "stable",
    change: 0.5
  },
  {
    name: "Web Server",
    status: "healthy",
    metric: 145,
    unit: "req/s",
    trend: "up",
    change: 8.3
  },
  {
    name: "Email Service",
    status: "critical",
    metric: 450,
    unit: "ms",
    trend: "up",
    change: 45.2
  }
];

// Format timestamp for display
const formatTimestamp = (timestamp: string, format: 'time' | 'hour' | 'datetime' = 'hour') => {
  const date = new Date(timestamp);
  
  if (format === 'time') {
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  } else if (format === 'hour') {
    return `${date.getHours()}:00`;
  } else {
    return date.toLocaleString();
  }
};

// Format historical data for charts
const formatHistoricalDataForCharts = (data: HistoricalDataPoint[]) => {
  return data.map(point => ({
    ...point,
    time: formatTimestamp(point.timestamp, 'hour'),
  }));
};

// Get color based on value
const getColorForValue = (value: number) => {
  if (value < 60) return "text-green-500";
  if (value < 80) return "text-amber-500";
  return "text-red-500";
};

// Get color for chart
const getChartColor = (value: number) => {
  if (value < 60) return "#22c55e";
  if (value < 80) return "#f59e0b";
  return "#ef4444";
};

const SystemMonitoring = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [timeRange, setTimeRange] = useState<string>("24h");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [currentUsageState, setCurrentUsageState] = useState<ResourceUsage>(currentUsage);
  const [liveData, setLiveData] = useState(formatHistoricalDataForCharts(historicalData));

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      // Simulate updating data
      const updatedUsage = {
        cpu: Math.max(5, Math.min(95, currentUsageState.cpu + (Math.random() * 10 - 5))),
        memory: Math.max(10, Math.min(95, currentUsageState.memory + (Math.random() * 6 - 3))),
        disk: Math.max(40, Math.min(95, currentUsageState.disk + (Math.random() * 2 - 0.5))),
        network: Math.max(5, Math.min(95, currentUsageState.network + (Math.random() * 15 - 7.5))),
      };
      
      setCurrentUsageState(updatedUsage);
      
      // Add new data point
      const now = new Date();
      const newDataPoint = {
        timestamp: now.toISOString(),
        time: formatTimestamp(now.toISOString(), 'hour'),
        cpu: updatedUsage.cpu,
        memory: updatedUsage.memory,
        disk: updatedUsage.disk,
        network: updatedUsage.network,
        activeSessions: Math.max(5, Math.min(250, liveData[liveData.length - 1].activeSessions + (Math.random() * 20 - 10))),
        responseTime: Math.max(50, Math.min(500, liveData[liveData.length - 1].responseTime + (Math.random() * 40 - 20)))
      };
      
      setLiveData([...liveData.slice(1), newDataPoint]);
      setRefreshing(false);
      
      toast({
        title: "Monitoring Data Updated",
        description: `Last refresh: ${now.toLocaleTimeString()}`,
      });
    }, 1500);
  };

  // Metrics for user sessions section
  const userMetrics = {
    activeSessions: liveData[liveData.length - 1].activeSessions.toFixed(0),
    responseTime: liveData[liveData.length - 1].responseTime.toFixed(1),
    totalUsers: "1,245",
    activeUsers: "185",
  };

  // Pie chart data for resource distribution
  const resourceDistribution = [
    { name: "System", value: 25 },
    { name: "Applications", value: 45 },
    { name: "Database", value: 20 },
    { name: "Other", value: 10 },
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="System Monitoring" 
        description="Real-time system performance and status monitoring"
      />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="mr-2 p-1.5 bg-green-100 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm">All systems operational</span>
            <span className="text-sm text-muted-foreground ml-4">Last updated: {currentTime}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {/* CPU Usage */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      CPU Usage
                    </CardTitle>
                    <Cpu className={`h-4 w-4 ${getColorForValue(currentUsageState.cpu)}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getColorForValue(currentUsageState.cpu)}`}>
                    {currentUsageState.cpu.toFixed(1)}%
                  </div>
                  <Progress 
                    value={currentUsageState.cpu} 
                    className="h-2 mt-2"
                    indicatorClassName={
                      currentUsageState.cpu < 60 
                        ? "bg-green-600" 
                        : currentUsageState.cpu < 80 
                        ? "bg-amber-500" 
                        : "bg-red-500"
                    }
                  />
                </CardContent>
              </Card>
              
              {/* Memory Usage */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      Memory Usage
                    </CardTitle>
                    <HardDrive className={`h-4 w-4 ${getColorForValue(currentUsageState.memory)}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getColorForValue(currentUsageState.memory)}`}>
                    {currentUsageState.memory.toFixed(1)}%
                  </div>
                  <Progress 
                    value={currentUsageState.memory} 
                    className="h-2 mt-2"
                    indicatorClassName={
                      currentUsageState.memory < 60 
                        ? "bg-green-600" 
                        : currentUsageState.memory < 80 
                        ? "bg-amber-500" 
                        : "bg-red-500"
                    }
                  />
                </CardContent>
              </Card>
              
              {/* Disk Usage */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      Disk Usage
                    </CardTitle>
                    <Database className={`h-4 w-4 ${getColorForValue(currentUsageState.disk)}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getColorForValue(currentUsageState.disk)}`}>
                    {currentUsageState.disk.toFixed(1)}%
                  </div>
                  <Progress 
                    value={currentUsageState.disk} 
                    className="h-2 mt-2"
                    indicatorClassName={
                      currentUsageState.disk < 60 
                        ? "bg-green-600" 
                        : currentUsageState.disk < 80 
                        ? "bg-amber-500" 
                        : "bg-red-500"
                    }
                  />
                </CardContent>
              </Card>
              
              {/* Network Usage */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      Network Usage
                    </CardTitle>
                    <Network className={`h-4 w-4 ${getColorForValue(currentUsageState.network)}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getColorForValue(currentUsageState.network)}`}>
                    {currentUsageState.network.toFixed(1)}%
                  </div>
                  <Progress 
                    value={currentUsageState.network} 
                    className="h-2 mt-2"
                    indicatorClassName={
                      currentUsageState.network < 60 
                        ? "bg-green-600" 
                        : currentUsageState.network < 80 
                        ? "bg-amber-500" 
                        : "bg-red-500"
                    }
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Resource trends chart */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>System Resource Trends</CardTitle>
                    <CardDescription>Resource usage over time</CardDescription>
                  </div>
                  <Badge variant="outline" className="mr-2">
                    {timeRange === '1h' ? 'Last Hour' : 
                     timeRange === '6h' ? 'Last 6 Hours' : 
                     timeRange === '24h' ? 'Last 24 Hours' : 'Last 7 Days'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={liveData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip
                        formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="cpu"
                        name="CPU"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="memory"
                        name="Memory"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="disk"
                        name="Disk"
                        stroke="#ffc658"
                        fill="#ffc658"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="network"
                        name="Network"
                        stroke="#ff7300"
                        fill="#ff7300"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Services overview and user sessions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Services Health</CardTitle>
                  <CardDescription>Status of critical system services</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="space-y-4">
                    {servicesMetrics.slice(0, 4).map((service, idx) => (
                      <div key={idx} className="px-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {service.status === "healthy" ? (
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                            ) : service.status === "warning" ? (
                              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2" />
                            ) : (
                              <div className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                            )}
                            <span className="font-medium">{service.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2">
                              {service.metric} {service.unit}
                            </span>
                            <span className={
                              service.trend === "up" 
                                ? "text-amber-500" 
                                : service.trend === "down" 
                                ? "text-green-500"
                                : "text-gray-500"
                            }>
                              {service.trend === "up" ? (
                                <ArrowUpRight className="h-4 w-4" />
                              ) : service.trend === "down" ? (
                                <ArrowDownRight className="h-4 w-4" />
                              ) : (
                                "—"
                              )}
                            </span>
                          </div>
                        </div>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button 
                      variant="ghost" 
                      onClick={() => setActiveTab("services")}
                    >
                      View All Services
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>User Sessions</CardTitle>
                  <CardDescription>Current active users and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Active Sessions</div>
                      <div className="text-2xl font-bold">{userMetrics.activeSessions}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Avg Response Time</div>
                      <div className="text-2xl font-bold">{userMetrics.responseTime} ms</div>
                    </div>
                  </div>
                  
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={liveData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="activeSessions"
                          name="Active Sessions"
                          stroke="#8884d8"
                          dot={false}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="responseTime"
                          name="Response Time (ms)"
                          stroke="#82ca9d"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>CPU Utilization</CardTitle>
                  <CardDescription>Detailed CPU usage metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Current Usage</div>
                      <div className={`text-2xl font-bold ${getColorForValue(currentUsageState.cpu)}`}>
                        {currentUsageState.cpu.toFixed(1)}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Average (24h)</div>
                      <div className="text-2xl font-bold">
                        {(liveData.reduce((sum, point) => sum + point.cpu, 0) / liveData.length).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={liveData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, 'CPU Usage']} />
                        <Area
                          type="monotone"
                          dataKey="cpu"
                          name="CPU"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Memory Usage</CardTitle>
                  <CardDescription>RAM utilization over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Current Usage</div>
                      <div className={`text-2xl font-bold ${getColorForValue(currentUsageState.memory)}`}>
                        {currentUsageState.memory.toFixed(1)}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Available</div>
                      <div className="text-2xl font-bold">
                        {(16 * (1 - currentUsageState.memory / 100)).toFixed(1)} GB
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={liveData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Memory Usage']} />
                        <Area
                          type="monotone"
                          dataKey="memory"
                          name="Memory"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Disk Usage</CardTitle>
                  <CardDescription>Storage utilization and metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Current Usage</div>
                      <div className={`text-2xl font-bold ${getColorForValue(currentUsageState.disk)}`}>
                        {currentUsageState.disk.toFixed(1)}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Free Space</div>
                      <div className="text-2xl font-bold">
                        {(500 * (1 - currentUsageState.disk / 100)).toFixed(1)} GB
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resourceDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {resourceDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, '']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Network Activity</CardTitle>
                  <CardDescription>Network throughput and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Bandwidth Usage</div>
                      <div className={`text-2xl font-bold ${getColorForValue(currentUsageState.network)}`}>
                        {currentUsageState.network.toFixed(1)}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Data Transfer</div>
                      <div className="text-2xl font-bold">
                        {(2.5 * currentUsageState.network / 100).toFixed(2)} MB/s
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={liveData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Network Usage']} />
                        <Line 
                          type="monotone" 
                          dataKey="network" 
                          name="Network" 
                          stroke="#ff7300"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Resource Correlation Analysis</CardTitle>
                <CardDescription>Relationships between different system resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={liveData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="cpu" 
                        name="CPU (%)" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="memory" 
                        name="Memory (%)" 
                        stroke="#82ca9d" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="disk" 
                        name="Disk (%)" 
                        stroke="#ffc658" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="network" 
                        name="Network (%)" 
                        stroke="#ff7300" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="activeSessions" 
                        name="Active Sessions" 
                        stroke="#00C49F" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="services" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {servicesMetrics.map((service, idx) => (
                <Card key={idx} className={
                  service.status === "critical" 
                    ? "border-red-300"
                    : service.status === "warning"
                    ? "border-amber-300"
                    : ""
                }>
                  <CardHeader className={
                    service.status === "critical" 
                      ? "bg-red-50"
                      : service.status === "warning"
                      ? "bg-amber-50"
                      : ""
                  }>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center">
                        {service.status === "healthy" ? (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        ) : service.status === "warning" ? (
                          <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        )}
                        {service.name}
                      </CardTitle>
                      <Badge variant={
                        service.status === "healthy" 
                          ? "outline"
                          : service.status === "warning"
                          ? "secondary"
                          : "destructive"
                      }>
                        {service.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {service.unit === "ms" ? "Response Time" : 
                       service.unit === "%" ? "Utilization" : 
                       service.unit === "req/s" ? "Request Rate" : 
                       "Performance Metric"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="text-2xl font-bold">
                        {service.metric} {service.unit}
                      </div>
                      <div className={
                        service.trend === "up" 
                          ? service.unit === "ms" ? "text-red-500" : "text-green-500"
                          : service.trend === "down"
                          ? service.unit === "ms" ? "text-green-500" : "text-amber-500"
                          : "text-muted-foreground"
                      }>
                        <div className="flex items-center">
                          {service.trend === "up" ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : service.trend === "down" ? (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          ) : null}
                          {Math.abs(service.change)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-[100px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={Array(12).fill(0).map((_, i) => ({
                            time: i,
                            value: service.metric * (1 + (Math.sin(i / 2) * 0.1) - (i === 11 ? 0 : service.change / 200 * (11 - i)))
                          }))}
                          margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <defs>
                            <linearGradient id={`colorService${idx}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={getChartColor(service.status === "healthy" ? 30 : service.status === "warning" ? 70 : 90)} stopOpacity={0.8}/>
                              <stop offset="95%" stopColor={getChartColor(service.status === "healthy" ? 30 : service.status === "warning" ? 70 : 90)} stopOpacity={0.2}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={getChartColor(service.status === "healthy" ? 30 : service.status === "warning" ? 70 : 90)} 
                            fillOpacity={1} 
                            fill={`url(#colorService${idx})`}
                            dot={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Service Response Times</CardTitle>
                <CardDescription>Performance comparison across all services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={servicesMetrics.map(service => ({
                        name: service.name,
                        value: service.unit === "ms" ? service.metric : 0,
                        status: service.status
                      })).filter(item => item.value > 0)}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Response Time (ms)"
                        barSize={40}
                      >
                        {servicesMetrics.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={
                              entry.status === "healthy" ? "#22c55e" : 
                              entry.status === "warning" ? "#f59e0b" : "#ef4444"
                            } 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userMetrics.activeSessions}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Current connected users
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userMetrics.responseTime} ms</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Average page load time
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Registered Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userMetrics.totalUsers}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across all user roles
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session Trends</CardTitle>
                  <CardDescription>Active user sessions over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={liveData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip formatter={(value) => [value, 'Active Sessions']} />
                        <Area
                          type="monotone"
                          dataKey="activeSessions"
                          name="Active Sessions"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Analysis</CardTitle>
                  <CardDescription>System response time metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={liveData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip formatter={(value) => [`${value} ms`, 'Response Time']} />
                        <Line
                          type="monotone"
                          dataKey="responseTime"
                          name="Response Time (ms)"
                          stroke="#82ca9d"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>User Distribution by Role</CardTitle>
                <CardDescription>Breakdown of system users by role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Student', value: 950 },
                          { name: 'Teacher', value: 85 },
                          { name: 'Admin', value: 15 },
                          { name: 'Principal', value: 3 },
                          { name: 'Staff', value: 25 },
                          { name: 'Parent', value: 167 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          '#0088FE', 
                          '#00C49F', 
                          '#FFBB28', 
                          '#FF8042',
                          '#8884d8',
                          '#82ca9d'
                        ].map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} users`, '']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Import missing Bell component to avoid TypeScript errors
const Bell = Gauge;

export default SystemMonitoring;
