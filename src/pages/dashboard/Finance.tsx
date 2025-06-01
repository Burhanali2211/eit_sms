
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
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  Download,
  Filter,
  Plus
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Finance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");
  const [selectedType, setSelectedType] = useState("all");

  const financialData = [
    {
      id: "1",
      description: "Tuition Fee - Grade 10",
      amount: 25000,
      type: "income",
      date: "2024-01-15",
      status: "completed",
      category: "tuition"
    },
    {
      id: "2",
      description: "Library Books Purchase",
      amount: -1500,
      type: "expense",
      date: "2024-01-14",
      status: "completed",
      category: "supplies"
    },
    {
      id: "3",
      description: "Teacher Salary - January",
      amount: -45000,
      type: "expense", 
      date: "2024-01-10",
      status: "completed",
      category: "salary"
    },
    {
      id: "4",
      description: "Lab Equipment Maintenance",
      amount: -3200,
      type: "expense",
      date: "2024-01-08",
      status: "pending",
      category: "maintenance"
    },
    {
      id: "5",
      description: "Student Activity Fee",
      amount: 8500,
      type: "income",
      date: "2024-01-05",
      status: "completed",
      category: "fees"
    }
  ];

  const totalIncome = financialData
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = Math.abs(financialData
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0));

  const netBalance = totalIncome - totalExpenses;
  const pendingAmount = financialData
    .filter(item => item.status === "pending")
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAmountDisplay = (amount: number) => {
    const isNegative = amount < 0;
    const displayAmount = Math.abs(amount);
    return (
      <span className={isNegative ? "text-red-600" : "text-green-600"}>
        {isNegative ? "-" : "+"}${displayAmount.toLocaleString()}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Finance Management" description="Track income, expenses, and financial reports" />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <div className="grid gap-6 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${totalIncome.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ${totalExpenses.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Net Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${Math.abs(netBalance).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {netBalance >= 0 ? "Profit" : "Loss"} this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Pending Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                ${pendingAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Financial Transactions</CardTitle>
                <CardDescription>View and manage all financial activities</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expenses</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Transaction
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financialData.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="capitalize">
                      {transaction.category}
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {getAmountDisplay(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Finance;
