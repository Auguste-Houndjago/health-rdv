import { 
    Home, 
    Calendar, 
    FileText, 
    User, 
    Bell,

  } from "lucide-react";

export const navigationItems = [
    {
      name: "Tableau de bord",
      href: "/patient/",
      icon: Home,
      description: "Vue d'ensemble"
    },
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
      description: "Mes documents"
    },
    {
      name: "Profil",
      href: "/patient/profile",
      icon: User,
      description: "Informations personnelles"
    },
    {
      name: "Notifications",
      href: "/patient/notification",
      icon: Bell,
      description: "Alertes et messages"
    },
   
  ];