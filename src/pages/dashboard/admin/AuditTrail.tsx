
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
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, History, User, Undo, AlertCircle, Calendar, DownloadCloud, Trash, PenLine, Plus, FilePlus, FileX, UserPlus, UserMinus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

// Types for audit events
interface AuditEvent {
  id: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  action: 'create' | 'update' | 'delete' | 'restore' | 'login' | 'logout' | 'add-user' | 'remove-user';
  entityType: string;
  entityId: string;
  entityName: string;
  details?: string;
  canRevert: boolean;
}

// Mock audit events
const mockAuditEvents: AuditEvent[] = [
  {
    id: '1',
    timestamp: '2025-05-18T11:23:45Z',
    user: {
      id: '101',
      name: 'John Admin',
      avatar: '/placeholder.svg'
    },
    action: 'update',
    entityType: 'settings',
    entityId: 'sys-001',
    entityName: 'System Settings',
    details: 'Updated email notification settings',
    canRevert: true
  },
  {
    id: '2',
    timestamp: '2025-05-18T10:42:20Z',
    user: {
      id: '102',
      name: 'Sarah Manager',
      avatar: '/placeholder.svg'
    },
    action: 'create',
    entityType: 'class',
    entityId: 'cls-432',
    entityName: 'Advanced Mathematics',
    details: 'Created new class with 25 students',
    canRevert: false
  },
  {
    id: '3',
    timestamp: '2025-05-18T09:30:10Z',
    user: {
      id: '103',
      name: 'Mike Librarian',
      avatar: '/placeholder.svg'
    },
    action: 'delete',
    entityType: 'book',
    entityId: 'book-221',
    entityName: 'Pride and Prejudice',
    details: 'Removed from library catalog - damaged copy',
    canRevert: true
  },
  {
    id: '4',
    timestamp: '2025-05-18T08:15:33Z',
    user: {
      id: '101',
      name: 'John Admin',
      avatar: '/placeholder.svg'
    },
    action: 'add-user',
    entityType: 'user',
    entityId: 'usr-556',
    entityName: 'Emily Teacher',
    details: 'Added with role: Teacher',
    canRevert: false
  },
  {
    id: '5',
    timestamp: '2025-05-17T17:22:19Z',
    user: {
      id: '104',
      name: 'Alex Principal',
      avatar: '/placeholder.svg'
    },
    action: 'update',
    entityType: 'schedule',
    entityId: 'sch-987',
    entityName: 'Fall Semester Schedule',
    details: 'Updated exam dates for all classes',
    canRevert: true
  },
  {
    id: '6',
    timestamp: '2025-05-17T16:05:45Z',
    user: {
      id: '102',
      name: 'Sarah Manager',
      avatar: '/placeholder.svg'
    },
    action: 'login',
    entityType: 'system',
    entityId: 'sys-auth',
    entityName: 'System Login',
    details: 'Login from IP: 192.168.1.25',
    canRevert: false
  },
  {
    id: '7',
    timestamp: '2025-05-17T14:33:22Z',
    user: {
      id: '103',
      name: 'Mike Librarian',
      avatar: '/placeholder.svg'
    },
    action: 'restore',
    entityType: 'book',
    entityId: 'book-118',
    entityName: 'To Kill a Mockingbird',
    details: 'Restored to library catalog',
    canRevert: false
  },
  {
    id: '8',
    timestamp: '2025-05-17T12:11:05Z',
    user: {
      id: '101',
      name: 'John Admin',
      avatar: '/placeholder.svg'
    },
    action: 'remove-user',
    entityType: 'user',
    entityId: 'usr-332',
    entityName: 'Robert Smith',
    details: 'Removed role: Student (graduated)',
    canRevert: true
  },
  {
    id: '9',
    timestamp: '2025-05-17T10:55:30Z',
    user: {
      id: '104',
      name: 'Alex Principal',
      avatar: '/placeholder.svg'
    },
    action: 'create',
    entityType: 'policy',
    entityId: 'pol-45',
    entityName: 'Attendance Policy',
    details: 'Created new attendance policy for 2025-2026',
    canRevert: false
  },
  {
    id: '10',
    timestamp: '2025-05-17T09:40:12Z',
    user: {
      id: '102',
      name: 'Sarah Manager',
      avatar: '/placeholder.svg'
    },
    action: 'logout',
    entityType: 'system',
    entityId: 'sys-auth',
    entityName: 'System Logout',
    details: 'Session timeout',
    canRevert: false
  },
];

// Get action badge
const getActionBadge = (action: AuditEvent['action']) => {
  return <StatusBadge status={action} />;
};

// Format timestamp
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Get initials for avatar
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const AuditTrail = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [userFilter, setUserFilter] = useState<string>('all');
  const [entityFilter, setEntityFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const eventsPerPage = 8;

  // Get unique users, actions, entity types for filters
  const users = [
    { id: 'all', name: 'All Users' },
    ...Array.from(
      new Set(mockAuditEvents.map(event => event.user.id))
    ).map(id => {
      const user = mockAuditEvents.find(event => event.user.id === id)?.user;
      return { id, name: user?.name || '' };
    })
  ];

  const actions = [
    { value: 'all', label: 'All Actions' },
    { value: 'create', label: 'Create' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
    { value: 'restore', label: 'Restore' },
    { value: 'add-user', label: 'Add User' },
    { value: 'remove-user', label: 'Remove User' },
    { value: 'login', label: 'Login' },
    { value: 'logout', label: 'Logout' },
  ];

  const entityTypes = [
    { value: 'all', label: 'All Entities' },
    ...Array.from(
      new Set(mockAuditEvents.map(event => event.entityType))
    ).map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }))
  ];

  // Filter events
  const filteredEvents = mockAuditEvents.filter(event => {
    // Filter by search term
    if (
      searchTerm &&
      !event.entityName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(event.details && event.details.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false;
    }

    // Filter by action
    if (actionFilter !== 'all' && event.action !== actionFilter) {
      return false;
    }

    // Filter by user
    if (userFilter !== 'all' && event.user.id !== userFilter) {
      return false;
    }

    // Filter by entity type
    if (entityFilter !== 'all' && event.entityType !== entityFilter) {
      return false;
    }

    return true;
  });

  // Pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Handle revert
  const handleRevert = (event: AuditEvent) => {
    toast({
      title: "Reverting changes...",
      description: `Changes to "${event.entityName}" are being reverted.`
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Audit Trail"
        description="Track and review all changes made to the system"
      />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Activity History</CardTitle>
                <CardDescription>Track all changes and activities in the system</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
                <Button variant="outline" size="sm">
                  <DownloadCloud className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search audit trail..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select
                  value={actionFilter}
                  onValueChange={setActionFilter}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent>
                    {actions.map((action) => (
                      <SelectItem key={action.value} value={action.value}>
                        {action.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={userFilter}
                  onValueChange={setUserFilter}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="User" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={entityFilter}
                  onValueChange={setEntityFilter}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Entity" />
                  </SelectTrigger>
                  <SelectContent>
                    {entityTypes.map((entity) => (
                      <SelectItem key={entity.value} value={entity.value}>
                        {entity.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="whitespace-nowrap">
                      {formatTimestamp(event.timestamp)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={event.user.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {getInitials(event.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{event.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getActionBadge(event.action)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{event.entityName}</p>
                        <p className="text-xs text-muted-foreground capitalize">{event.entityType}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[250px] truncate">
                      {event.details}
                    </TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" disabled={!event.canRevert}>
                            <History className="h-4 w-4 mr-1" />
                            Revert
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">Confirm Revert</h4>
                              <p className="text-sm text-muted-foreground">
                                Are you sure you want to revert this change? This action cannot be undone.
                              </p>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">Cancel</Button>
                              <Button size="sm" onClick={() => handleRevert(event)}>
                                <Undo className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}

                {currentEvents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No activities found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {filteredEvents.length > eventsPerPage && (
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AuditTrail;
