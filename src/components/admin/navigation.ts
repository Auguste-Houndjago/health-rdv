import { 
    Users, 
    Building2, 
    Stethoscope,
    Settings, 
    BarChart3,

  } from "lucide-react";

export const navigationItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: BarChart3,
      description: "Tableau de bord"
    },
    {
      name: "Utilisateurs",
      href: "/admin/users",
      icon: Users,
      description: "Gérer les utilisateurs"
    },
    {
      name: "Hôpitaux",
      href: "/admin/hospitals",
      icon: Building2,
      description: "Gestion des hôpitaux"
    },
    {
      name: "Spécialités",
      href: "/admin/specialties",
      icon: Stethoscope,
      description: "Gestion des spécialités"
    },
    {
      name: "Demandes Médecins",
      href: "/admin/doctors",
      icon: Stethoscope,
      description: "Approbation des médecins"
    },
    {
      name: "Paramètres",
      href: "/admin/settings",
      icon: Settings,
      description: "Configuration système"
    }
  ];
  