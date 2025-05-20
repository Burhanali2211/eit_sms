
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  TrendingUp,
  TrendingDown,
  Briefcase
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockFinancialRecords } from "@/utils/mockData";
import { useDatabaseTable } from "@/hooks/use-database-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

interface FinancialRecord {
  id: string;
  description: string;
  amount: number;
  type: "fee" | "expense" | "salary";
  date: string;
  status: "paid" | "pending" | "overdue";
}

const Finance = () => {
  const { data: records, isLoading, insert: addRecord } = useDatabaseTable<FinancialRecord>(
    "financial_records", 
    { mockData: mockFinancialRecords }
  );
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRecord, setNewRecord] = useState<Partial<FinancialRecord>>({
    description: "",
    amount: 0,
    type: "fee",
    date: new Date().toISOString().split('T')[0],
    status: "pending"
  });
  const [isExporting, setIsExporting] = useState(false);
  
  // Filter records based on search, filter and active tab
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? record.type === filterType : true;
    const matchesTab = activeTab === "all" ? true : record.type === activeTab;
    return matchesSearch && matchesType && matchesTab;
  });
  
  // Calculate financial metrics
  const totalRevenue = records
    .filter(record => record.type === 'fee')
    .reduce((sum, record) => sum + record.amount, 0);
  
  const totalExpenses = records
    .filter(record => record.type === 'expense' || record.type === 'salary')
    .reduce((sum, record) => sum + record.amount, 0);
  
  const balance = totalRevenue - totalExpenses;
  
  const pendingFees = records
    .filter(record => record.type === 'fee' && record.status !== 'paid')
    .reduce((sum, record) => sum + record.amount, 0);

  // Handle adding a new record
  const handleAddRecord = async () => {
    if (!newRecord.description || !newRecord.amount) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Description and amount are required.",
      });
      return;
    }

    try {
      await addRecord(newRecord);
      setIsAddDialogOpen(false);
      setNewRecord({
        description: "",
        amount: 0,
        type: "fee",
        date: new Date().toISOString().split('T')[0],
        status: "pending"
      });
    } catch (error) {
      console.error("Failed to add record:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add financial record.",
      });
    }
  };

  // Handle export
  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Export Complete",
        description: "Financial records have been exported to CSV.",
      });
    }, 1500);
  };

  // Handle filter button click
  const handleFilterClick = () => {
    toast({
      title: "Advanced Filters",
      description: "Opening advanced filtering options.",
    });
  };
  
  return (
    <DashboardLayout>
      <DashboardHeader title="Financial Management" />
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This Academic Year
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
                <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This Academic Year
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                <div className="text-2xl font-bold">${balance.toLocaleString()}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Available Funds
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pendingFees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                To be collected
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Financial Records</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={handleExport}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </>
                  )}
                </Button>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Record
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Financial Record</DialogTitle>
                      <DialogDescription>
                        Add a new financial record to the system.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={newRecord.description}
                          onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                          placeholder="e.g., Tuition Fee - Grade 10"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="amount">Amount ($)</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={newRecord.amount || ""}
                          onChange={(e) => setNewRecord({...newRecord, amount: Number(e.target.value)})}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="type">Type</Label>
                          <Select
                            value={newRecord.type}
                            onValueChange={(value: any) => setNewRecord({...newRecord, type: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fee">Fee</SelectItem>
                              <SelectItem value="expense">Expense</SelectItem>
                              <SelectItem value="salary">Salary</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={newRecord.status}
                            onValueChange={(value: any) => setNewRecord({...newRecord, status: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="overdue">Overdue</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newRecord.date}
                          onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddRecord}>
                        Add Record
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Records</TabsTrigger>
                <TabsTrigger value="fee">Fees</TabsTrigger>
                <TabsTrigger value="expense">Expenses</TabsTrigger>
                <TabsTrigger value="salary">Salaries</TabsTrigger>
              </TabsList>
              
              <div className="my-4 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search records..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="sm:w-[180px]">
                  <Select
                    onValueChange={(value) => setFilterType(value === "all" ? null : value)}
                    defaultValue="all"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="fee">Fees</SelectItem>
                      <SelectItem value="expense">Expenses</SelectItem>
                      <SelectItem value="salary">Salaries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="sm:w-auto w-full" onClick={handleFilterClick}>
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        No records found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecords.map(record => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.description}</TableCell>
                        <TableCell className="capitalize">{record.type}</TableCell>
                        <TableCell>${record.amount.toLocaleString()}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            record.status === 'paid' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : record.status === 'pending'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Record Actions",
                                description: "Opening record options menu",
                              });
                            }}
                          >
                            <span className="sr-only">Open menu</span>
                            ⋯
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Finance;
