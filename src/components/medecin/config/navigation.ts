import { 
    Home, 
    Calendar, 
    Users, 
    Building2, 
    Stethoscope,
    FileText,
    BarChart3,
    Bell,
    Settings,
    CalendarCheck
  } from "lucide-react";

export const navigationItems = [
    {
      name: "Tableau de bord",
      href: "/medecin/dashboard",
      icon: Home,
      description: "Vue d'ensemble"
    },
    {
      name: "Mes Patients",
      href: "/medecin/patients",
      icon: Users,
      description: "Gérer mes patients"
    },
    {
      name: "Rendez-vous",
      href: "/medecin/rendez-vous",
      icon: Calendar,
      description: "Gérer mes RDV"
    },
    {
      name: "Disponibilités",
      href: "/medecin/disponibilites",
      icon: CalendarCheck,
      description: "Gérer mes disponibilités"
    },
    {
      name: "Hôpitaux",
      href: "/medecin/hopitaux",
      icon: Building2,
      description: "Demandes d'affiliation"
    },
    {
      name: "Spécialités",
      href: "/medecin/specialites",
      icon: Stethoscope,
      description: "Ma spécialité"
    },
    {
      name: "Documents",
      href: "/medecin/documents",
      icon: FileText,
      description: "Recommandations"
    },
  ];

