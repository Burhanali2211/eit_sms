import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Search,
  Plus,
  BookOpen,
  Filter,
  ArrowUpDown,
  CalendarClock,
  User,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  BookCopy
} from "lucide-react";
import { LibraryItem } from "@/types/dashboard";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { useDatabaseTable } from "@/hooks/use-database-connection";
import { StatusBadge } from "@/components/ui/status-badge";

// Book categories
const categories = ["All Categories", "Literature", "Fiction", "Textbook", "Reference", "Biography", "Science"];

const Library = () => {
  // Attempt to get books from database, fallback to mock data
  const { 
    data: dbBooks = [], 
    create: createBook,
    update: updateBook,
    remove: removeBook,
    isLoading 
  } = useDatabaseTable<LibraryItem>('library_items', {});

  // Mock library data for fallback
  const mockLibraryItems: LibraryItem[] = [
    {
      id: "1",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Literature",
      available: true
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      category: "Fiction",
      available: false,
      dueDate: "2023-06-15",
      borrowedBy: "Alex Johnson"
    },
    {
      id: "3",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Literature",
      available: true
    },
    {
      id: "4",
      title: "Introduction to Calculus",
      author: "James Stewart",
      category: "Textbook",
      available: true
    },
    {
      id: "5",
      title: "Biology: The Study of Life",
      author: "Jane Smith",
      category: "Textbook",
      available: false,
      dueDate: "2023-06-18",
      borrowedBy: "Sam Wilson"
    },
    {
      id: "6",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      category: "Fiction",
      available: true
    },
    {
      id: "7",
      title: "World History: Modern Era",
      author: "Robert Davis",
      category: "Textbook",
      available: false,
      dueDate: "2023-06-20",
      borrowedBy: "Taylor Swift"
    },
    {
      id: "8",
      title: "Romeo and Juliet",
      author: "William Shakespeare",
      category: "Literature",
      available: true
    },
    {
      id: "9",
      title: "Python Programming",
      author: "John Smith",
      category: "Textbook",
      available: true
    },
    {
      id: "10",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      category: "Literature",
      available: false,
      dueDate: "2023-06-25",
      borrowedBy: "Emily Brown"
    }
  ];

  const [books, setBooks] = useState<LibraryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [isEditingBook, setIsEditingBook] = useState(false);
  const [currentBook, setCurrentBook] = useState<LibraryItem | null>(null);
  const [newBook, setNewBook] = useState<Omit<LibraryItem, "id">>({
    title: "",
    author: "",
    category: "Literature",
    available: true
  });
  const [activeTab, setActiveTab] = useState("catalog");
  
  // Load books on component mount
  useEffect(() => {
    if (dbBooks.length > 0) {
      setBooks(dbBooks);
    } else {
      setBooks(mockLibraryItems);
    }
  }, [dbBooks]);
  
  // Filter books based on search, category, and availability
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || book.category === categoryFilter;
    const matchesAvailability = 
      availabilityFilter === null || 
      (availabilityFilter === "available" && book.available) || 
      (availabilityFilter === "borrowed" && !book.available);
    return matchesSearch && matchesCategory && matchesAvailability;
  });
  
  // Calculate statistics
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.available).length;
  const borrowedBooks = books.filter(book => !book.available).length;
  const overdueBooks = books.filter(book => {
    if (!book.dueDate) return false;
    return new Date(book.dueDate) < new Date();
  }).length;
  
  // Reset form fields
  const resetForm = () => {
    setNewBook({
      title: "",
      author: "",
      category: "Literature",
      available: true
    });
    setCurrentBook(null);
  };
  
  // Add new book handler
  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Title and author are required.",
      });
      return;
    }
    
    try {
      // Try to add to database first
      if (dbBooks.length > 0) {
        const createdBook = await createBook(newBook);
        if (typeof createdBook === 'object' && createdBook !== null && 'id' in createdBook) {
          setBooks(prev => [...prev, createdBook as LibraryItem]);
        } else {
          throw new Error("Invalid book data returned from database");
        }
      } else {
        // Fallback to mock data
        const newBookWithId = {
          id: (books.length + 1).toString(),
          ...newBook
        };
        setBooks(prev => [...prev, newBookWithId]);
      }
      
      setIsAddingBook(false);
      resetForm();
      
      toast({
        title: "Book Added",
        description: `${newBook.title} has been added to the library.`,
      });
    } catch (error) {
      console.error("Error adding book:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add book to the library.",
      });
    }
  };
  
  // Edit book handler
  const handleEditBook = async () => {
    if (!currentBook || !currentBook.title || !currentBook.author) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Title and author are required.",
      });
      return;
    }
    
    try {
      // Try to update in database first
      if (dbBooks.length > 0) {
        const updatedBook = await updateBook(currentBook.id, currentBook);
        if (updatedBook) {
          setBooks(prev => prev.map(book => book.id === currentBook.id ? updatedBook as LibraryItem : book));
        } else {
          throw new Error("Failed to update book in database");
        }
      } else {
        // Fallback to mock data
        setBooks(prev => prev.map(book => book.id === currentBook.id ? currentBook : book));
      }
      
      setIsEditingBook(false);
      resetForm();
      
      toast({
        title: "Book Updated",
        description: `${currentBook.title} has been updated.`,
      });
    } catch (error) {
      console.error("Error updating book:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update book information.",
      });
    }
  };
  
  // Delete book handler
  const handleDeleteBook = async (id: string) => {
    try {
      // Try to delete from database first
      if (dbBooks.length > 0) {
        await removeBook(id);
      }
      
      setBooks(prev => prev.filter(book => book.id !== id));
      
      toast({
        title: "Book Deleted",
        description: "The book has been deleted from the library.",
      });
    } catch (error) {
      console.error("Error deleting book:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete book.",
      });
    }
  };
  
  // Check in/out book handler
  const handleToggleAvailability = async (id: string) => {
    const book = books.find(book => book.id === id);
    if (!book) return;
    
    try {
      if (book.available) {
        // Book is available, show check out dialog
        setCurrentBook(book);
        // This would typically open a dialog to collect borrower information
        toast({
          title: "Book Check Out",
          description: "Please enter borrower information.",
        });
      } else {
        // Book is checked out, check it back in
        const bookUpdate = {
          ...book,
          available: true,
          dueDate: undefined,
          borrowedBy: undefined
        };
        
        // Try to update in database first
        if (dbBooks.length > 0) {
          await updateBook(id, bookUpdate);
        }
        
        setBooks(prev => prev.map(b => b.id === id ? bookUpdate : b));
        
        toast({
          title: "Book Checked In",
          description: "The book has been returned to the library.",
        });
      }
    } catch (error) {
      console.error("Error toggling book availability:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update book status.",
      });
    }
  };

  // Handle borrowing a book
  const handleBorrowBook = async (book: LibraryItem, borrower: string, dueDate: string) => {
    if (!book || !borrower || !dueDate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Missing required information.",
      });
      return;
    }
    
    try {
      const bookUpdate = {
        ...book,
        available: false,
        borrowedBy: borrower,
        dueDate
      };
      
      // Try to update in database first
      if (dbBooks.length > 0) {
        await updateBook(book.id, bookUpdate);
      }
      
      setBooks(prev => prev.map(b => b.id === book.id ? bookUpdate : b));
      setCurrentBook(null);
      
      toast({
        title: "Book Checked Out",
        description: `${book.title} has been checked out to ${borrower}.`,
      });
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to check out book.",
      });
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Library Management" description="Manage books and borrowing" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading library data...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Books
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalBooks}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    In catalog
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Available Books
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{availableBooks}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ready for checkout
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Borrowed Books
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{borrowedBooks}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Currently checked out
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Overdue Books
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overdueBooks}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Past due date
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Library Management</CardTitle>
                    <CardDescription>Manage books, loans, and returns</CardDescription>
                  </div>
                  <Dialog open={isAddingBook} onOpenChange={setIsAddingBook}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Book
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Add New Book</DialogTitle>
                        <DialogDescription>
                          Enter the details for the new book in the library catalog.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Title</Label>
                          <Input 
                            id="title" 
                            placeholder="Book title"
                            value={newBook.title}
                            onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="author">Author</Label>
                          <Input 
                            id="author" 
                            placeholder="Author name"
                            value={newBook.author}
                            onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Select 
                            value={newBook.category}
                            onValueChange={(value) => setNewBook({...newBook, category: value})}
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.slice(1).map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddingBook(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddBook}>
                          Add Book
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                  <TabsList>
                    <TabsTrigger value="catalog">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Catalog
                    </TabsTrigger>
                    <TabsTrigger value="borrowed">
                      <BookCopy className="h-4 w-4 mr-2" />
                      Borrowed Books
                    </TabsTrigger>
                  </TabsList>
                
                
                  <div className="mb-4 mt-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search books..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="sm:w-[180px]">
                      <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <TabsContent value="catalog">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBooks.map((book) => (
                          <TableRow key={book.id}>
                            <TableCell className="font-medium">
                              {book.title}
                            </TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.category}</TableCell>
                            <TableCell>
                              {book.available ? (
                                <StatusBadge status="active" label="Available" />
                              ) : (
                                <StatusBadge status="info" label="Checked Out" />
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => {
                                    setCurrentBook(book);
                                    setIsEditingBook(true);
                                  }}>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleToggleAvailability(book.id)}>
                                    {book.available ? (
                                      <>
                                        <User className="h-4 w-4 mr-2" />
                                        Check Out
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Check In
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => handleDeleteBook(book.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                        
                        {filteredBooks.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6">
                              No books found matching your search.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="borrowed">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Borrowed By</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {books
                          .filter(book => !book.available)
                          .filter(book => {
                            const matchesSearch = 
                              book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (book.borrowedBy && book.borrowedBy.toLowerCase().includes(searchTerm.toLowerCase()));
                            return matchesSearch;
                          })
                          .map((book) => {
                            const isOverdue = book.dueDate && new Date(book.dueDate) < new Date();
                            
                            return (
                              <TableRow key={book.id}>
                                <TableCell className="font-medium">
                                  <div>
                                    <div>{book.title}</div>
                                    <div className="text-sm text-muted-foreground">{book.author}</div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{book.borrowedBy}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{book.dueDate}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <StatusBadge 
                                    status={isOverdue ? "error" : "warning"}
                                    label={isOverdue ? "Overdue" : "Checked Out"}
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleToggleAvailability(book.id)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Return
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        
                        {books.filter(book => !book.available).length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6">
                              No books are currently borrowed.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      
      {/* Edit Book Dialog */}
      <Dialog open={isEditingBook} onOpenChange={setIsEditingBook}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update the details for this book.
            </DialogDescription>
          </DialogHeader>
          {currentBook && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={currentBook.title}
                  onChange={(e) => setCurrentBook({...currentBook, title: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-author">Author</Label>
                <Input 
                  id="edit-author" 
                  value={currentBook.author}
                  onChange={(e) => setCurrentBook({...currentBook, author: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={currentBook.category}
                  onValueChange={(value) => setCurrentBook({...currentBook, category: value})}
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditingBook(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditBook}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Library;
