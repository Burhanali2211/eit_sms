import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Activity,
  HardDrive,
  Server,
  Database,
  Cpu,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  ArrowUpCircle,
  Clock8
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Types
interface SystemStatus {
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  lastChecked: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  services: {
    name: string;
    status: 'online' | 'offline' | 'degraded';
    responseTime: number;
    lastIncident?: string;
  }[];
}

interface PerformanceMetric {
  name: string;
  value: number;
  limit?: number;
}

interface UsageData {
  time: string;
  cpu: number;
  memory: number;
  network: number;
}

const mockSystemStatus: SystemStatus = {
  status: 'healthy',
  uptime: '25 days, 14 hours, 12 minutes',
  lastChecked: '2 minutes ago',
  cpuUsage: 32,
  memoryUsage: 45,
  diskUsage: 65,
  services: [
    { name: 'Database', status: 'online', responseTime: 12 },
    { name: 'Authentication', status: 'online', responseTime: 8 },
    { name: 'Storage', status: 'online', responseTime: 15 },
    { name: 'Email', status: 'degraded', responseTime: 450, lastIncident: '2 hours ago' },
    { name: 'API Gateway', status: 'online', responseTime: 22 },
    { name: 'Backup Service', status: 'online', responseTime: 30 },
    { name: 'Search', status: 'online', responseTime: 25 },
    { name: 'Notification', status: 'online', responseTime: 18 },
  ]
};

const performanceMetrics: PerformanceMetric[] = [
  { name: 'Database Queries', value: 2345, limit: 5000 },
  { name: 'API Calls', value: 12500, limit: 20000 },
  { name: 'Active Users', value: 185, limit: 500 },
  { name: 'File Storage', value: 45, limit: 100 },
  { name: 'Cache Hit Rate', value: 92 },
  { name: 'Average Response Time', value: 120 }
];

// Usage history mock data (last 24 hours)
const generateUsageData = () => {
  const data: UsageData[] = [];
  const now = new Date();

  for (let i = 0; i < 24; i++) {
    const time = new Date(now);
    time.setHours(now.getHours() - 24 + i);
    const hour = time.getHours();
    const timeString = `${hour}:00`;

    // Generate some pattern based on time of day
    const baseValue = (hour >= 8 && hour <= 17) ? 40 : 20;
    const randomFactor = Math.random() * 30;

    data.push({
      time: timeString,
      cpu: Math.min(95, baseValue + randomFactor),
      memory: Math.min(95, (baseValue + 10) + randomFactor * 0.8),
      network: Math.min(95, (baseValue - 5) + randomFactor * 1.2),
    });
  }

  return data;
};

const usageHistory = generateUsageData();

// Component for resource usage
const ResourceUsage = ({ title, usage, icon }: { title: string; usage: number; icon: React.ReactNode }) => {
  const { isDarkMode } = useTheme();

  const getColorClass = (value: number) => {
    if (value < 50) return cn('text-emerald-500 dark:text-emerald-400');
    if (value < 80) return cn('text-amber-500 dark:text-amber-400');
    return cn('text-rose-500 dark:text-rose-400');
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <span className={getColorClass(usage)}>{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{usage}%</div>
        <Progress
          value={usage}
          className={cn("mt-2 h-2")}
          indicatorClassName={cn(
            usage < 50
              ? "bg-emerald-500 dark:bg-emerald-400"
              : usage < 80
                ? "bg-amber-500 dark:bg-amber-400"
                : "bg-rose-500 dark:bg-rose-400"
          )}
        />
      </CardContent>
    </Card>
  );
};

// Service status component
const ServiceStatus = ({ service }: { service: SystemStatus['services'][0] }) => {

  const getResponseTimeClass = () => {
    if (service.responseTime < 100) return cn('text-emerald-500 dark:text-emerald-400');
    if (service.responseTime < 300) return cn('text-amber-500 dark:text-amber-400');
    return cn('text-rose-500 dark:text-rose-400');
  };

  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="flex justify-between items-center">
        <div className="font-medium">{service.name}</div>
        <StatusBadge status={service.status} />
      </div>
      <div className="mt-2 flex items-center text-sm">
        <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
        <span className={getResponseTimeClass()}>{service.responseTime}ms</span>
      </div>
      {service.lastIncident && (
        <div className="mt-1 text-xs text-muted-foreground">
          Last incident: {service.lastIncident}
        </div>
      )}
    </div>
  );
};

const SystemHealth = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { isDarkMode } = useTheme();

  // Refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "System Status Updated",
        description: "All metrics refreshed successfully."
      });
    }, 1500);
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        title="System Health"
        description="Monitor system performance and status"
      />
      <div className={cn("flex-1 overflow-auto dashboard-content bg-gray-50 dark:bg-gray-900 p-6")}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mockSystemStatus.status === 'healthy' ? (
              <CheckCircle className={cn("h-5 w-5 text-emerald-500 dark:text-emerald-400")} />
            ) : mockSystemStatus.status === 'warning' ? (
              <AlertTriangle className={cn("h-5 w-5 text-amber-500 dark:text-amber-400")} />
            ) : (
              <AlertTriangle className={cn("h-5 w-5 text-rose-500 dark:text-rose-400")} />
            )}
            <span className="font-medium">
              System Status:
              <span className={cn(
                mockSystemStatus.status === 'healthy'
                  ? 'text-emerald-500 dark:text-emerald-400'
                  : mockSystemStatus.status === 'warning'
                    ? 'text-amber-500 dark:text-amber-400'
                    : 'text-rose-500 dark:text-rose-400'
              )}> {mockSystemStatus.status.charAt(0).toUpperCase() + mockSystemStatus.status.slice(1)}</span>
            </span>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <ArrowUpCircle className="h-4 w-4 mr-1" />
              <span>Uptime: {mockSystemStatus.uptime}</span>
            </div>
            <div className="flex items-center">
              <Clock8 className="h-4 w-4 mr-1" />
              <span>Last checked: {mockSystemStatus.lastChecked}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <ResourceUsage
                title="CPU Usage"
                usage={mockSystemStatus.cpuUsage}
                icon={<Cpu className="h-5 w-5" />}
              />
              <ResourceUsage
                title="Memory Usage"
                usage={mockSystemStatus.memoryUsage}
                icon={<HardDrive className="h-5 w-5" />}
              />
              <ResourceUsage
                title="Disk Usage"
                usage={mockSystemStatus.diskUsage}
                icon={<Database className="h-5 w-5" />}
              />
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>System Resource Usage (24 Hours)</CardTitle>
                <CardDescription>Historical view of system resource utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={usageHistory}
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
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="cpu"
                        stackId="1"
                        stroke={isDarkMode ? "#a78bfa" : "#8884d8"}
                        fill={isDarkMode ? "#a78bfa" : "#8884d8"}
                      />
                      <Area
                        type="monotone"
                        dataKey="memory"
                        stackId="2"
                        stroke={isDarkMode ? "#6ee7b7" : "#82ca9d"}
                        fill={isDarkMode ? "#6ee7b7" : "#82ca9d"}
                      />
                      <Area
                        type="monotone"
                        dataKey="network"
                        stackId="3"
                        stroke={isDarkMode ? "#fcd34d" : "#ffc658"}
                        fill={isDarkMode ? "#fcd34d" : "#ffc658"}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Health</CardTitle>
                  <CardDescription>Current status of critical services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {mockSystemStatus.services
                      .filter((_, idx) => idx < 4)
                      .map((service, idx) => (
                        <ServiceStatus key={idx} service={service} />
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("services")}
                    className="w-full"
                  >
                    View All Services
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {performanceMetrics
                      .filter((_, idx) => idx < 4)
                      .map((metric, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{metric.name}</span>
                          <div className="flex items-center">
                            {metric.limit ? (
                              <span className="text-sm">
                                <span
                                  className={cn(
                                    metric.value / metric.limit < 0.7
                                      ? 'text-emerald-500 dark:text-emerald-400'
                                      : metric.value / metric.limit < 0.9
                                        ? 'text-amber-500 dark:text-amber-400'
                                        : 'text-rose-500 dark:text-rose-400'
                                  )}
                                >
                                  {metric.value.toLocaleString()}
                                </span>
                                <span className="text-muted-foreground"> / {metric.limit.toLocaleString()}</span>
                              </span>
                            ) : (
                              <span className="text-sm">
                                {metric.name.includes('Time')
                                  ? `${metric.value}ms`
                                  : `${metric.value}%`
                                }
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("performance")}
                    className="w-full"
                  >
                    View Full Performance
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                  <CardDescription>Critical performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceMetrics.map((metric, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{metric.name}</span>
                          <div className="flex items-center">
                            {metric.limit ? (
                              <span className="text-sm">
                                <span
                                  className={cn(
                                    metric.value / metric.limit < 0.7
                                      ? 'text-emerald-500 dark:text-emerald-400'
                                      : metric.value / metric.limit < 0.9
                                        ? 'text-amber-500 dark:text-amber-400'
                                        : 'text-rose-500 dark:text-rose-400'
                                  )}
                                >
                                  {metric.value.toLocaleString()}
                                </span>
                                <span className="text-muted-foreground"> / {metric.limit.toLocaleString()}</span>
                              </span>
                            ) : (
                              <span className="text-sm">
                                {metric.name.includes('Time')
                                  ? `${metric.value}ms`
                                  : `${metric.value}%`
                                }
                              </span>
                            )}
                          </div>
                        </div>
                        {metric.limit && (
                          <Progress
                            value={(metric.value / metric.limit) * 100}
                            className={cn("h-2")}
                            indicatorClassName={cn(
                              metric.value / metric.limit < 0.7
                                ? "bg-emerald-500 dark:bg-emerald-400"
                                : metric.value / metric.limit < 0.9
                                  ? "bg-amber-500 dark:bg-amber-400"
                                  : "bg-rose-500 dark:bg-rose-400"
                            )}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Times</CardTitle>
                  <CardDescription>Service response time analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mockSystemStatus.services.map(s => ({
                          name: s.name,
                          responseTime: s.responseTime
                        }))}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value}ms`} />
                        <Legend />
                        <Bar
                          dataKey="responseTime"
                          name="Response Time (ms)"
                          fill={isDarkMode ? "#a78bfa" : "#8884d8"}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>CPU & Memory Trends</CardTitle>
                <CardDescription>Resource usage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={usageHistory}
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
                        stroke={isDarkMode ? "#a78bfa" : "#8884d8"}
                        activeDot={{ r: 8 }}
                        name="CPU (%)"
                      />
                      <Line
                        type="monotone"
                        dataKey="memory"
                        stroke={isDarkMode ? "#6ee7b7" : "#82ca9d"}
                        name="Memory (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockSystemStatus.services.map((service, idx) => (
                <ServiceStatus key={idx} service={service} />
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Service Response Time Comparison</CardTitle>
                <CardDescription>Performance across all system services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mockSystemStatus.services.map(s => ({
                        name: s.name,
                        responseTime: s.responseTime,
                        status: s.status
                      }))}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      barSize={20}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value}ms`} />
                      <Legend />
                      <Bar
                        dataKey="responseTime"
                        name="Response Time (ms)"
                        fill={isDarkMode ? "#a78bfa" : "#8884d8"}
                        background={{ fill: isDarkMode ? '#333' : '#eee' }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout >
  );
};

export default SystemHealth;
