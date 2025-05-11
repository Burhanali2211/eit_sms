
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
import { FinancialRecord } from "@/types/dashboard";
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

const Finance = () => {
  const [records, setRecords] = useState<FinancialRecord[]>(mockFinancialRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? record.type === filterType : true;
    return matchesSearch && matchesType;
  });
  
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
  
  return (
    <DashboardLayout>
      <DashboardHeader title="Financial Management" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
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
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Record
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Records</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="salaries">Salaries</TabsTrigger>
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
                <Button variant="outline" className="sm:w-auto w-full">
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map(record => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.description}</TableCell>
                      <TableCell className="capitalize">{record.type}</TableCell>
                      <TableCell>${record.amount.toLocaleString()}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          record.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : record.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
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
