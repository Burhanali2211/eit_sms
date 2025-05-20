
/**
 * Facility-related mock data
 */

import { LibraryItem, ClubActivity, LabResource } from "@/types/dashboard";

export const mockLibraryItems: LibraryItem[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    available: true,
  },
  {
    id: "2",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    available: false,
    dueDate: "2025-05-10",
    borrowedBy: "Alex Johnson",
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    available: true,
  },
  {
    id: "4",
    title: "The Elements of Style",
    author: "William Strunk Jr.",
    category: "Reference",
    available: false,
    dueDate: "2025-05-12",
    borrowedBy: "Emily Davis",
  },
  {
    id: "5",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    available: true,
  },
];

export const mockClubActivities: ClubActivity[] = [
  {
    id: "1",
    name: "Chess Club",
    description: "Weekly chess tournaments and practice sessions",
    schedule: "Every Monday, 3:00 PM",
    location: "Recreation Hall",
    members: 18,
    status: "active",
  },
  {
    id: "2",
    name: "Debate Society",
    description: "Platform for students to enhance public speaking skills",
    schedule: "Every Wednesday, 4:00 PM",
    location: "Auditorium",
    members: 24,
    status: "active",
  },
  {
    id: "3",
    name: "Science Club",
    description: "Experiments, projects, and science fairs",
    schedule: "Every Tuesday, 3:30 PM",
    location: "Science Lab",
    members: 16,
    status: "active",
  },
  {
    id: "4",
    name: "Photography Club",
    description: "Learn photography techniques and participate in competitions",
    schedule: "Every Friday, 3:00 PM",
    location: "Art Room",
    members: 12,
    status: "inactive",
  },
  {
    id: "5",
    name: "Sports Team",
    description: "Various sports training and inter-school competitions",
    schedule: "Every Thursday, 4:00 PM",
    location: "Sports Ground",
    members: 30,
    status: "active",
  },
];

export const mockLabResources: LabResource[] = [
  {
    id: "1",
    name: "Microscope",
    type: "Biology Lab",
    quantity: 15,
    available: 12,
    location: "Biology Lab, Cabinet 3",
    lastMaintenance: "2025-03-15",
  },
  {
    id: "2",
    name: "Test Tubes",
    type: "Chemistry Lab",
    quantity: 50,
    available: 42,
    location: "Chemistry Lab, Drawer 2",
    lastMaintenance: "2025-03-20",
  },
  {
    id: "3",
    name: "Computer Workstation",
    type: "Computer Lab",
    quantity: 25,
    available: 25,
    location: "Computer Lab",
    lastMaintenance: "2025-03-10",
  },
  {
    id: "4",
    name: "Bunsen Burner",
    type: "Chemistry Lab",
    quantity: 20,
    available: 18,
    location: "Chemistry Lab, Cabinet 1",
    lastMaintenance: "2025-03-25",
  },
  {
    id: "5",
    name: "Physics Experiment Kit",
    type: "Physics Lab",
    quantity: 10,
    available: 8,
    location: "Physics Lab, Shelf 4",
    lastMaintenance: "2025-03-18",
  },
];
