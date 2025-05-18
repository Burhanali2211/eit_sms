
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Filter, Search, AlertTriangle, Info, CheckCircle, Bug, Archive, Download, RefreshCw } from "lucide-react";

// Types for logs
interface SystemLog {
  id: string;
  timestamp: string;
  type: 'error' | 'info' | 'warning' | 'success';
  message: string;
  details: string;
  source: string;
  user?: string;
}

// Mock log data
const mockLogs: SystemLog[] = [
  {
    id: '1',
    timestamp: '2025-05-18T10:15:23Z',
    type: 'error',
    message: 'Failed to connect to database',
    details: 'Connection timeout after 30s',
    source: 'Database Service',
    user: 'system'
  },
  {
    id: '2',
    timestamp: '2025-05-18T10:14:12Z',
    type: 'info',
    message: 'User login successful',
    details: 'IP: 192.168.1.145',
    source: 'Authentication Service',
    user: 'john.doe'
  },
  {
    id: '3',
    timestamp: '2025-05-18T10:13:45Z',
    type: 'warning',
    message: 'High memory usage detected',
    details: 'Memory usage at 85%',
    source: 'System Monitor',
  },
  {
    id: '4',
    timestamp: '2025-05-18T10:10:22Z',
    type: 'success',
    message: 'Database backup completed',
    details: 'Backup size: 1.2GB',
    source: 'Backup Service',
    user: 'system'
  },
  {
    id: '5',
    timestamp: '2025-05-18T10:05:11Z',
    type: 'error',
    message: 'API rate limit exceeded',
    details: 'Too many requests from client',
    source: 'API Gateway',
    user: 'mobile-app'
  },
  {
    id: '6',
    timestamp: '2025-05-18T10:01:54Z',
    type: 'info',
    message: 'System update available',
    details: 'Version 2.3.4 ready to install',
    source: 'Update Service',
  },
  {
    id: '7',
    timestamp: '2025-05-18T09:58:32Z',
    type: 'warning',
    message: 'Slow query detected',
    details: 'Query took 4.5s to execute',
    source: 'Database Monitor',
  },
  {
    id: '8',
    timestamp: '2025-05-18T09:45:19Z',
    type: 'success',
    message: 'Email notifications sent',
    details: 'Sent to 245 recipients',
    source: 'Notification Service',
    user: 'system'
  },
  {
    id: '9',
    timestamp: '2025-05-18T09:30:05Z',
    type: 'error',
    message: 'Failed to process payment',
    details: 'Invalid credit card information',
    source: 'Payment Gateway',
    user: 'jane.smith'
  },
  {
    id: '10',
    timestamp: '2025-05-18T09:25:43Z',
    type: 'info',
    message: 'New user registered',
    details: 'User: mark.johnson',
    source: 'User Service',
  },
  {
    id: '11',
    timestamp: '2025-05-17T18:15:23Z',
    type: 'error',
    message: 'File upload failed',
    details: 'File size exceeds maximum limit',
    source: 'Storage Service',
    user: 'robert.brown'
  },
  {
    id: '12',
    timestamp: '2025-05-17T16:14:12Z',
    type: 'info',
    message: 'Scheduled maintenance completed',
    details: 'Duration: 15 minutes',
    source: 'System Service',
    user: 'admin'
  },
];

// Get log type badge
const getLogTypeBadge = (type: SystemLog['type']) => {
  return <StatusBadge status={type} />;
};

const SystemLogs = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [logTypeFilter, setLogTypeFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const logsPerPage = 10;

  // Get unique sources for filter
  const sources = ['all', ...Array.from(new Set(mockLogs.map(log => log.source)))];

  // Filter logs based on tab, search, and filters
  const filteredLogs = mockLogs.filter(log => {
    // Filter by tab
    if (activeTab !== 'all' && log.type !== activeTab) {
      return false;
    }

    // Filter by search term
    if (
      searchTerm &&
      !log.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !log.source.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false;
    }

    // Filter by log type
    if (logTypeFilter !== 'all' && log.type !== logTypeFilter) {
      return false;
    }

    // Filter by source
    if (sourceFilter !== 'all' && log.source !== sourceFilter) {
      return false;
    }

    return true;
  });

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  // Stats
  const errorCount = mockLogs.filter(log => log.type === 'error').length;
  const warningCount = mockLogs.filter(log => log.type === 'warning').length;
  const infoCount = mockLogs.filter(log => log.type === 'info').length;
  const successCount = mockLogs.filter(log => log.type === 'success').length;

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        title="System Logs"
        description="View and manage system logs and activities"
      />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-rose-600 dark:text-rose-400">
                Errors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{errorCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{warningCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Potential issues
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{infoCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Informational logs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Completed operations
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>All system events and activities</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
                <Button variant="default" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList>
                <TabsTrigger value="all">All Logs</TabsTrigger>
                <TabsTrigger value="error">
                  <AlertTriangle className="h-4 w-4 mr-1 text-rose-600 dark:text-rose-400" />
                  Errors
                </TabsTrigger>
                <TabsTrigger value="warning">
                  <AlertTriangle className="h-4 w-4 mr-1 text-amber-600 dark:text-amber-400" />
                  Warnings
                </TabsTrigger>
                <TabsTrigger value="info">
                  <Info className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                  Info
                </TabsTrigger>
                <TabsTrigger value="success">
                  <CheckCircle className="h-4 w-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                  Success
                </TabsTrigger>
              </TabsList>

              <div className="mb-4 mt-4 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    value={logTypeFilter}
                    onValueChange={setLogTypeFilter}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Log type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={sourceFilter}
                    onValueChange={setSourceFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      {sources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source === 'all' ? 'All Sources' : source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <TabsContent value={activeTab}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>User</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentLogs.map((log) => (
                      <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="whitespace-nowrap">
                          {formatTimestamp(log.timestamp)}
                        </TableCell>
                        <TableCell>
                          {getLogTypeBadge(log.type)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{log.message}</p>
                            <p className="text-sm text-muted-foreground">{log.details}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {log.source}
                        </TableCell>
                        <TableCell>
                          {log.user || '—'}
                        </TableCell>
                      </TableRow>
                    ))}

                    {currentLogs.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          No logs found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {filteredLogs.length > logsPerPage && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationPrevious
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                          .map((page, idx, array) => (
                            <React.Fragment key={page}>
                              {idx > 0 && array[idx - 1] !== page - 1 && (
                                <PaginationItem>
                                  <span className="px-2">...</span>
                                </PaginationItem>
                              )}
                              <PaginationItem>
                                <PaginationLink
                                  onClick={() => setCurrentPage(page)}
                                  isActive={page === currentPage}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            </React.Fragment>
                          ))}

                        <PaginationNext
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SystemLogs;
