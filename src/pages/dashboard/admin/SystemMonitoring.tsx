
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Clock8,
  Network,
  Router
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
  networkUsage: number;
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
  networkUsage: 28,
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
  const getColorClass = (value: number) => {
    if (value < 50) return 'text-green-500';
    if (value < 80) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <span className={`${getColorClass(usage)}`}>{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{usage}%</div>
        <Progress
          value={usage}
          className={`mt-2 h-2 ${usage < 50 ? 'bg-green-100' : usage < 80 ? 'bg-amber-100' : 'bg-red-100'
            } ${usage < 50 ? 'bg-green-500' : usage < 80 ? 'bg-amber-500' : 'bg-red-500'
            }`}
        />
      </CardContent>
    </Card>
  );
};

// Service status component
const ServiceStatus = ({ service }: { service: SystemStatus['services'][0] }) => {

  const getResponseTimeClass = () => {
    if (service.responseTime < 100) return 'text-emerald-500 dark:text-emerald-400';
    if (service.responseTime < 300) return 'text-amber-500 dark:text-amber-400';
    return 'text-rose-500 dark:text-rose-400';
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-center">
        <div className="font-medium">{service.name}</div>
        <StatusBadge status={service.status} />
      </div>
      <div className="mt-2 flex items-center text-sm">
        <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
        <span className={`${getResponseTimeClass()}`}>{service.responseTime}ms</span>
      </div>
      {service.lastIncident && (
        <div className="mt-1 text-xs text-muted-foreground">
          Last incident: {service.lastIncident}
        </div>
      )}
    </div>
  );
};

const SystemMonitoring = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

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
        title="System Monitoring"
        description="Real-time monitoring of system resources and services"
      />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mockSystemStatus.status === 'healthy' ? (
              <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
            ) : mockSystemStatus.status === 'warning' ? (
              <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-rose-500 dark:text-rose-400" />
            )}
            <span className="font-medium">
              System Status:
              <span className={
                mockSystemStatus.status === 'healthy'
                  ? 'text-emerald-500 dark:text-emerald-400'
                  : mockSystemStatus.status === 'warning'
                    ? 'text-amber-500 dark:text-amber-400'
                    : 'text-rose-500 dark:text-rose-400'
              }> {mockSystemStatus.status.charAt(0).toUpperCase() + mockSystemStatus.status.slice(1)}</span>
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
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                title="Network Usage"
                usage={mockSystemStatus.networkUsage}
                icon={<Network className="h-5 w-5" />}
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
                      <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="memory" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="network" stackId="3" stroke="#ffc658" fill="#ffc658" />
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
                  <CardTitle>Key Performance Indicators</CardTitle>
                  <CardDescription>Real-time performance metrics</CardDescription>
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
                                  className={
                                    metric.value / metric.limit < 0.7
                                      ? 'text-emerald-500 dark:text-emerald-400'
                                      : metric.value / metric.limit < 0.9
                                        ? 'text-amber-500 dark:text-amber-400'
                                        : 'text-rose-500 dark:text-rose-400'
                                  }
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
                    onClick={() => setActiveTab("resources")}
                    className="w-full"
                  >
                    View All Resources
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>CPU Usage</CardTitle>
                  <CardDescription>Current CPU utilization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSystemStatus.cpuUsage}%</div>
                  <Progress
                    value={mockSystemStatus.cpuUsage}
                    className="h-2"
                    indicatorClassName={
                      mockSystemStatus.cpuUsage < 50 ? 'bg-emerald-500 dark:bg-emerald-400' :
                        mockSystemStatus.cpuUsage < 80 ? 'bg-amber-500 dark:bg-amber-400' :
                          'bg-rose-500 dark:bg-rose-400'
                    }
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Memory Usage</CardTitle>
                  <CardDescription>Current memory utilization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSystemStatus.memoryUsage}%</div>
                  <Progress
                    value={mockSystemStatus.memoryUsage}
                    className="h-2"
                    indicatorClassName={
                      mockSystemStatus.memoryUsage < 50 ? 'bg-emerald-500 dark:bg-emerald-400' :
                        mockSystemStatus.memoryUsage < 80 ? 'bg-amber-500 dark:bg-amber-400' :
                          'bg-rose-500 dark:bg-rose-400'
                    }
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Disk Usage</CardTitle>
                  <CardDescription>Current disk utilization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSystemStatus.diskUsage}%</div>
                  <Progress
                    value={mockSystemStatus.diskUsage}
                    className="h-2"
                    indicatorClassName={
                      mockSystemStatus.diskUsage < 50 ? 'bg-emerald-500 dark:bg-emerald-400' :
                        mockSystemStatus.diskUsage < 80 ? 'bg-amber-500 dark:bg-amber-400' :
                          'bg-rose-500 dark:bg-rose-400'
                    }
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resource Trends</CardTitle>
                <CardDescription>Historical resource usage</CardDescription>
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
                      <Line type="monotone" dataKey="cpu" stroke="#8884d8" activeDot={{ r: 8 }} name="CPU (%)" />
                      <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory (%)" />
                      <Line type="monotone" dataKey="network" stroke="#ffc658" name="Network (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Network Throughput</CardTitle>
                  <CardDescription>Inbound and outbound network traffic</CardDescription>
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
                        <Area type="monotone" dataKey="network" stroke="#FF7300" fill="#FF7300" name="Network Traffic" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Connections</CardTitle>
                  <CardDescription>Number of active network connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">457</div>
                  <p className="text-sm text-muted-foreground mt-1">Connections to the server</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Network Devices</CardTitle>
                <CardDescription>Connected network devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4">
                    <Router className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    <div>
                      <p className="text-sm font-medium">Router</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Server className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    <div>
                      <p className="text-sm font-medium">Firewall</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
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
                        fill="#8884d8"
                        background={{ fill: '#eee' }}
                      />
                    </BarChart>
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

export default SystemMonitoring;
