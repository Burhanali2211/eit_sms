import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Public Pages
import About from "./pages/About";
import PrincipalMessage from "./pages/PrincipalMessage";
import VisionMission from "./pages/VisionMission";
import History from "./pages/History";
import Management from "./pages/Management";
import Curriculum from "./pages/Curriculum";
import AcademicCalendar from "./pages/AcademicCalendar";
import ClassSchedule from "./pages/ClassSchedule";
import Examination from "./pages/Examination";
import Results from "./pages/Results";
import AdmissionProcess from "./pages/AdmissionProcess";
import FeeStructure from "./pages/FeeStructure";
import Documents from "./pages/Documents";
import OnlineApplication from "./pages/OnlineApplication";
import Library from "./pages/Library";
import Laboratories from "./pages/Laboratories";
import Sports from "./pages/Sports";
import Transportation from "./pages/Transportation";
import Hostel from "./pages/Hostel";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Contact from "./pages/Contact";

// Dashboard Routes
import StudentRoutes from "./routes/StudentRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import FinanceRoutes from "./routes/FinanceRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              
              {/* About Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/principal-message" element={<PrincipalMessage />} />
              <Route path="/vision-mission" element={<VisionMission />} />
              <Route path="/history" element={<History />} />
              <Route path="/management" element={<Management />} />
              
              {/* Academic Pages */}
              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/academic-calendar" element={<AcademicCalendar />} />
              <Route path="/class-schedule" element={<ClassSchedule />} />
              <Route path="/examination" element={<Examination />} />
              <Route path="/results" element={<Results />} />
              
              {/* Admission Pages */}
              <Route path="/admission-process" element={<AdmissionProcess />} />
              <Route path="/fee-structure" element={<FeeStructure />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/online-application" element={<OnlineApplication />} />
              
              {/* Facility Pages */}
              <Route path="/library" element={<Library />} />
              <Route path="/laboratories" element={<Laboratories />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/transportation" element={<Transportation />} />
              <Route path="/hostel" element={<Hostel />} />
              
              {/* Other Pages */}
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Dashboard Routes */}
              <Route>
                {DashboardRoutes()}
              </Route>
              <Route>
                {StudentRoutes()}
              </Route>
              <Route>
                {TeacherRoutes()}
              </Route>
              <Route>
                {AdminRoutes()}
              </Route>
              <Route>
                {FinanceRoutes()}
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
