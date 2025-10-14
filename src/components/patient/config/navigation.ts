import { 
    Home, 
    Calendar, 
    FileText, 
    User, 
    Bell,

  } from "lucide-react";

export const navigationItems = [

    {
      name: "Rendez-vous",
      href: "/patient/appointments",
      icon: Calendar,
      description: "Gérer mes RDV"
    },
    {
      name: "Documents",
      href: "/patient/documents",
      icon: FileText,
      description: "Gérer mes documents"
    },
    {
      name: "Notifications",
      href: "/patient/notification",
      icon: Bell,
      description: "Gérer mes notifications"
    },
   
  ];