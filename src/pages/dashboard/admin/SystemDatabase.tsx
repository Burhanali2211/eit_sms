
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  Database,
  Server,
  HardDrive,
  BarChart,
  RefreshCw,
  AlertTriangle,
  Search,
  Table as TableIcon,
  Download,
  FileCode,
  ArrowUpDown,
} from "lucide-react";

const mockTables = [
  { name: "users", rows: 1254, size: "12.8 MB", lastUpdate: "2023-05-12 09:15 AM" },
  { name: "courses", rows: 87, size: "4.2 MB", lastUpdate: "2023-05-11 02:30 PM" },
  { name: "enrollments", rows: 3421, size: "24.6 MB", lastUpdate: "2023-05-12 10:45 AM" },
  { name: "classes", rows: 156, size: "3.1 MB", lastUpdate: "2023-05-10 04:15 PM" },
  { name: "attendance", rows: 25789, size: "64.3 MB", lastUpdate: "2023-05-12 11:00 AM" },
  { name: "grades", rows: 18542, size: "42.7 MB", lastUpdate: "2023-05-12 08:30 AM" },
  { name: "payments", rows: 8754, size: "28.9 MB", lastUpdate: "2023-05-12 09:45 AM" },
  { name: "notifications", rows: 36521, size: "78.2 MB", lastUpdate: "2023-05-12 11:15 AM" },
  { name: "calendar_events", rows: 1245, size: "8.4 MB", lastUpdate: "2023-05-11 01:00 PM" },
  { name: "system_logs", rows: 245678, size: "156.8 MB", lastUpdate: "2023-05-12 11:30 AM" },
];

const mockQueries = [
  { id: 1, query: "SELECT * FROM users WHERE role = 'student';", duration: "12ms", executed: "2023-05-12 09:15 AM" },
  { id: 2, query: "SELECT COUNT(*) FROM attendance WHERE date = CURRENT_DATE;", duration: "8ms", executed: "2023-05-12 10:45 AM" },
  { id: 3, query: "SELECT AVG(score) FROM grades GROUP BY course_id;", duration: "45ms", executed: "2023-05-12 11:00 AM" },
  { id: 4, query: "UPDATE system_settings SET value = 'true' WHERE key = 'maintenance_mode';", duration: "6ms", executed: "2023-05-12 09:30 AM" },
  { id: 5, query: "SELECT users.name, courses.title FROM users JOIN enrollments ON users.id = enrollments.user_id JOIN courses ON enrollments.course_id = courses.id;", duration: "89ms", executed: "2023-05-11 02:30 PM" },
];

const mockBackups = [
  { id: 1, filename: "edusync_backup_20230512_020000.sql", size: "342.6 MB", created: "2023-05-12 02:00 AM", status: "Completed" },
  { id: 2, filename: "edusync_backup_20230511_020000.sql", size: "339.2 MB", created: "2023-05-11 02:00 AM", status: "Completed" },
  { id: 3, filename: "edusync_backup_20230510_020000.sql", size: "336.8 MB", created: "2023-05-10 02:00 AM", status: "Completed" },
  { id: 4, filename: "edusync_backup_20230509_020000.sql", size: "335.1 MB", created: "2023-05-09 02:00 AM", status: "Completed" },
  { id: 5, filename: "edusync_backup_20230508_020000.sql", size: "334.5 MB", created: "2023-05-08 02:00 AM", status: "Completed" },
];

const SystemDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryResult, setQueryResult] = useState<any>(null);

  const filteredTables = mockTables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRunQuery = () => {
    if (!sqlQuery.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a SQL query to run.",
      });
      return;
    }

    // Mock query execution
    toast({
      title: "Query Executed",
      description: "Your query has been executed successfully.",
    });

    // Mock result for SELECT queries
    if (sqlQuery.toLowerCase().trim().startsWith("select")) {
      setQueryResult({
        columns: ["id", "name", "email", "role", "created_at"],
        rows: [
          { id: 1, name: "Alex Student", email: "student@edusync.com", role: "student", created_at: "2023-01-15" },
          { id: 2, name: "Taylor Teacher", email: "teacher@edusync.com", role: "teacher", created_at: "2022-08-22" },
          { id: 3, name: "Pat Principal", email: "principal@edusync.com", role: "principal", created_at: "2022-06-10" },
          { id: 4, name: "Admin User", email: "admin@edusync.com", role: "admin", created_at: "2022-05-05" },
        ],
        rowCount: 4,
        executionTime: "32ms",
      });
    } else {
      // Mock result for non-SELECT queries
      setQueryResult({
        message: "Query executed successfully",
        rowsAffected: 1,
        executionTime: "18ms",
      });
    }
  };

  const handleDownloadBackup = (id: number) => {
    toast({
      title: "Backup Download Started",
      description: "Your database backup file is being downloaded.",
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="System Database" />
      <div className="flex-1 overflow-auto dashboard-content p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="h-5 w-5 mr-2 text-blue-500" />
                Database Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">768.2 MB</div>
              <p className="text-sm text-muted-foreground">12% increase from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TableIcon className="h-5 w-5 mr-2 text-purple-500" />
                Total Tables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-sm text-muted-foreground">3 new tables this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <HardDrive className="h-5 w-5 mr-2 text-green-500" />
                Storage Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-1">
                <div className="text-3xl font-bold">72%</div>
                <span className="text-sm text-green-600 font-medium">23.4 GB free</span>
              </div>
              <Progress value={72} className="h-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tables" className="mb-6">
          <TabsList className="w-full grid grid-cols-4 max-w-2xl">
            <TabsTrigger value="tables">
              <TableIcon className="h-4 w-4 mr-2" />
              Tables
            </TabsTrigger>
            <TabsTrigger value="query">
              <FileCode className="h-4 w-4 mr-2" />
              SQL Query
            </TabsTrigger>
            <TabsTrigger value="backups">
              <HardDrive className="h-4 w-4 mr-2" />
              Backups
            </TabsTrigger>
            <TabsTrigger value="performance">
              <BarChart className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Database Tables</CardTitle>
                  <CardDescription>
                    View all tables in the system database
                  </CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tables..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Table Name</TableHead>
                      <TableHead className="text-right">Rows</TableHead>
                      <TableHead className="text-right">Size</TableHead>
                      <TableHead className="text-right">Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTables.map((table) => (
                      <TableRow key={table.name}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <TableIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            {table.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{table.rows.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{table.size}</TableCell>
                        <TableCell className="text-right">{table.lastUpdate}</TableCell>
                      </TableRow>
                    ))}
                    {filteredTables.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6">
                          No tables found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="query" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>SQL Query Tool</CardTitle>
                <CardDescription>
                  Execute SQL queries directly on the database
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Use with caution</h3>
                    <p className="text-yellow-700 text-sm">Changes made through direct SQL queries can affect system integrity. Make sure you know what you're doing.</p>
                  </div>
                </div>

                <div className="border rounded-md">
                  <textarea
                    className="w-full h-40 p-3 font-mono text-sm focus:outline-none"
                    placeholder="Enter your SQL query here..."
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleRunQuery}>
                    Run Query
                  </Button>
                </div>

                {queryResult && (
                  <div className="mt-6 border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Query Result</h3>
                      <div className="text-sm text-muted-foreground">
                        Execution time: {queryResult.executionTime}
                      </div>
                    </div>

                    {queryResult.message ? (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3">
                        <p className="text-green-800">{queryResult.message}</p>
                        <p className="text-sm text-green-700">Rows affected: {queryResult.rowsAffected}</p>
                      </div>
                    ) : (
                      <>
                        <div className="text-sm text-muted-foreground mb-2">
                          {queryResult.rowCount} rows returned
                        </div>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                {queryResult.columns.map((column: string) => (
                                  <TableHead key={column}>{column}</TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {queryResult.rows.map((row: any, index: number) => (
                                <TableRow key={index}>
                                  {queryResult.columns.map((column: string) => (
                                    <TableCell key={`${index}-${column}`}>{row[column]}</TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Recent Queries</h3>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Query</TableHead>
                          <TableHead className="text-right">Duration</TableHead>
                          <TableHead className="text-right">Executed</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockQueries.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="font-mono text-xs truncate max-w-md">
                                {item.query}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{item.duration}</TableCell>
                            <TableCell className="text-right">{item.executed}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backups" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Database Backups</CardTitle>
                <CardDescription>
                  Manage system database backups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Backup Schedule</h3>
                    <p className="text-sm text-muted-foreground">
                      Daily automatic backups at 2:00 AM
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Manual Backup Started",
                        description: "A new database backup has been initiated.",
                      });
                    }}
                  >
                    Create Backup Now
                  </Button>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Recent Backups</h3>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Filename</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockBackups.map((backup) => (
                          <TableRow key={backup.id}>
                            <TableCell className="font-medium">{backup.filename}</TableCell>
                            <TableCell>{backup.size}</TableCell>
                            <TableCell>{backup.created}</TableCell>
                            <TableCell>
                              <div
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${backup.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                  }`}
                              >
                                {backup.status}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownloadBackup(backup.id)}
                              >
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Database Performance</CardTitle>
                  <CardDescription>
                    Monitor and optimize database performance
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  toast({
                    title: "Refreshing Statistics",
                    description: "Performance statistics are being updated.",
                  });
                }}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Query Response Time</div>
                    <div className="text-2xl font-bold">24ms</div>
                    <div className="text-xs text-green-600">12% faster than last week</div>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Active Connections</div>
                    <div className="text-2xl font-bold">18</div>
                    <div className="text-xs text-muted-foreground">Peak today: 42</div>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Cache Hit Ratio</div>
                    <div className="text-2xl font-bold">94.2%</div>
                    <div className="text-xs text-green-600">2.1% improvement</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Slow Queries</h3>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Query</TableHead>
                          <TableHead className="text-right">Average Time</TableHead>
                          <TableHead className="text-right">Executions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="font-mono text-xs truncate max-w-md">
                              SELECT * FROM attendance JOIN users ON attendance.user_id = users.id WHERE date &gt; '2023-04-01';
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-amber-600 font-medium">240ms</TableCell>
                          <TableCell className="text-right">152</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-mono text-xs truncate max-w-md">
                              SELECT courses.*, COUNT(enrollments.id) FROM courses LEFT JOIN enrollments ON courses.id = enrollments.course_id GROUP BY courses.id;
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-amber-600 font-medium">185ms</TableCell>
                          <TableCell className="text-right">47</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-mono text-xs truncate max-w-md">
                              SELECT * FROM system_logs WHERE created_at &gt; CURRENT_DATE - INTERVAL '7 days' ORDER BY created_at DESC;
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-amber-600 font-medium">164ms</TableCell>
                          <TableCell className="text-right">284</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Table Growth</h3>
                    <div className="border rounded-md p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">system_logs</span>
                            <span className="text-sm text-muted-foreground">156.8 MB</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">notifications</span>
                            <span className="text-sm text-muted-foreground">78.2 MB</span>
                          </div>
                          <Progress value={48} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">attendance</span>
                            <span className="text-sm text-muted-foreground">64.3 MB</span>
                          </div>
                          <Progress value={38} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">grades</span>
                            <span className="text-sm text-muted-foreground">42.7 MB</span>
                          </div>
                          <Progress value={26} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Index Usage</h3>
                    <div className="border rounded-md p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">users_email_idx</span>
                            <span className="text-sm text-green-600">High</span>
                          </div>
                          <Progress value={94} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">grades_course_id_idx</span>
                            <span className="text-sm text-green-600">High</span>
                          </div>
                          <Progress value={86} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">attendance_date_idx</span>
                            <span className="text-sm text-amber-600">Medium</span>
                          </div>
                          <Progress value={58} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">payments_user_id_idx</span>
                            <span className="text-sm text-red-600">Low</span>
                          </div>
                          <Progress value={12} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Optimization Started",
                        description: "Database optimization process has been initiated.",
                      });
                    }}
                  >
                    Optimize Database
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SystemDatabase;
