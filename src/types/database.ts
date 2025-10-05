export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      _HopitalToSpecialite: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_HopitalToSpecialite_A_fkey"
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "Hopital"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_HopitalToSpecialite_B_fkey"
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "Specialite"
            referencedColumns: ["id"]
          },
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Administrateur: {
        Row: {
          fonction: Database["public"]["Enums"]["FonctionAdmin"]
          id: string
          userId: string
        }
        Insert: {
          fonction?: Database["public"]["Enums"]["FonctionAdmin"]
          id: string
          userId: string
        }
        Update: {
          fonction?: Database["public"]["Enums"]["FonctionAdmin"]
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Administrateur_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Utilisateur"
            referencedColumns: ["id"]
          },
        ]
      }
      Document: {
        Row: {
          dateCreation: string
          description: string | null
          id: string
          patientId: string | null
          titre: string
          url: string
        }
        Insert: {
          dateCreation?: string
          description?: string | null
          id: string
          patientId?: string | null
          titre: string
          url: string
        }
        Update: {
          dateCreation?: string
          description?: string | null
          id?: string
          patientId?: string | null
          titre?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "Document_patientId_fkey"
            columns: ["patientId"]
            isOneToOne: false
            referencedRelation: "Patient"
            referencedColumns: ["id"]
          },
        ]
      }
      Hopital: {
        Row: {
          adresse: string
          contact: string
          description: string | null
          fuseauHoraire: string
          id: string
          localisation: string | null
          nom: string
          slug: string | null
        }
        Insert: {
          adresse: string
          contact: string
          description?: string | null
          fuseauHoraire?: string
          id: string
          localisation?: string | null
          nom: string
          slug?: string | null
        }
        Update: {
          adresse?: string
          contact?: string
          description?: string | null
          fuseauHoraire?: string
          id?: string
          localisation?: string | null
          nom?: string
          slug?: string | null
        }
        Relationships: []
      }
      Medecin: {
        Row: {
          anneeExperience: number | null
          id: string
          isDisponible: boolean
          numLicence: string
          specialiteId: string
          statut: Database["public"]["Enums"]["StatutApproval"]
          titre: string
          userId: string
        }
        Insert: {
          anneeExperience?: number | null
          id: string
          isDisponible?: boolean
          numLicence: string
          specialiteId: string
          statut?: Database["public"]["Enums"]["StatutApproval"]
          titre: string
          userId: string
        }
        Update: {
          anneeExperience?: number | null
          id?: string
          isDisponible?: boolean
          numLicence?: string
          specialiteId?: string
          statut?: Database["public"]["Enums"]["StatutApproval"]
          titre?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Medecin_specialiteId_fkey"
            columns: ["specialiteId"]
            isOneToOne: false
            referencedRelation: "Specialite"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Medecin_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Utilisateur"
            referencedColumns: ["id"]
          },
        ]
      }
      MedecinHopital: {
        Row: {
          hopitalId: string
          id: string
          medecinId: string
        }
        Insert: {
          hopitalId: string
          id: string
          medecinId: string
        }
        Update: {
          hopitalId?: string
          id?: string
          medecinId?: string
        }
        Relationships: [
          {
            foreignKeyName: "MedecinHopital_hopitalId_fkey"
            columns: ["hopitalId"]
            isOneToOne: false
            referencedRelation: "Hopital"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "MedecinHopital_medecinId_fkey"
            columns: ["medecinId"]
            isOneToOne: false
            referencedRelation: "Medecin"
            referencedColumns: ["id"]
          },
        ]
      }
      Patient: {
        Row: {
          adresse: string | null
          groupeSanguin: Database["public"]["Enums"]["GroupeSanguin"]
          id: string
          poids: number | null
          sexe: Database["public"]["Enums"]["Sexe"]
          taille: number | null
          userId: string
        }
        Insert: {
          adresse?: string | null
          groupeSanguin?: Database["public"]["Enums"]["GroupeSanguin"]
          id: string
          poids?: number | null
          sexe?: Database["public"]["Enums"]["Sexe"]
          taille?: number | null
          userId: string
        }
        Update: {
          adresse?: string | null
          groupeSanguin?: Database["public"]["Enums"]["GroupeSanguin"]
          id?: string
          poids?: number | null
          sexe?: Database["public"]["Enums"]["Sexe"]
          taille?: number | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Patient_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Utilisateur"
            referencedColumns: ["id"]
          },
        ]
      }
      Recommandation: {
        Row: {
          contenu: string
          date: string
          id: string
          medecinId: string
        }
        Insert: {
          contenu: string
          date?: string
          id: string
          medecinId: string
        }
        Update: {
          contenu?: string
          date?: string
          id?: string
          medecinId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Recommandation_medecinId_fkey"
            columns: ["medecinId"]
            isOneToOne: false
            referencedRelation: "Medecin"
            referencedColumns: ["id"]
          },
        ]
      }
      RendezVous: {
        Row: {
          date: string
          duree: number
          hopitalId: string
          id: string
          medecinId: string
          motif: string | null
          patientId: string
          statut: Database["public"]["Enums"]["StatutRendezVous"]
          utilisateurId: string
        }
        Insert: {
          date: string
          duree?: number
          hopitalId: string
          id: string
          medecinId: string
          motif?: string | null
          patientId: string
          statut?: Database["public"]["Enums"]["StatutRendezVous"]
          utilisateurId: string
        }
        Update: {
          date?: string
          duree?: number
          hopitalId?: string
          id?: string
          medecinId?: string
          motif?: string | null
          patientId?: string
          statut?: Database["public"]["Enums"]["StatutRendezVous"]
          utilisateurId?: string
        }
        Relationships: [
          {
            foreignKeyName: "RendezVous_hopitalId_fkey"
            columns: ["hopitalId"]
            isOneToOne: false
            referencedRelation: "Hopital"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "RendezVous_medecinId_fkey"
            columns: ["medecinId"]
            isOneToOne: false
            referencedRelation: "Medecin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "RendezVous_patientId_fkey"
            columns: ["patientId"]
            isOneToOne: false
            referencedRelation: "Patient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "RendezVous_utilisateurId_fkey"
            columns: ["utilisateurId"]
            isOneToOne: false
            referencedRelation: "Utilisateur"
            referencedColumns: ["id"]
          },
        ]
      }
      Specialite: {
        Row: {
          description: string | null
          id: string
          nom: string
        }
        Insert: {
          description?: string | null
          id: string
          nom: string
        }
        Update: {
          description?: string | null
          id?: string
          nom?: string
        }
        Relationships: []
      }
      Utilisateur: {
        Row: {
          avatarUrl: string | null
          createdAt: string
          dateNaissance: string | null
          deletedAt: string | null
          email: string
          id: string
          nom: string
          prenom: string | null
          status: Database["public"]["Enums"]["StatusUtilisateur"]
          telephone: string | null
          updatedAt: string
        }
        Insert: {
          avatarUrl?: string | null
          createdAt?: string
          dateNaissance?: string | null
          deletedAt?: string | null
          email: string
          id: string
          nom: string
          prenom?: string | null
          status?: Database["public"]["Enums"]["StatusUtilisateur"]
          telephone?: string | null
          updatedAt: string
        }
        Update: {
          avatarUrl?: string | null
          createdAt?: string
          dateNaissance?: string | null
          deletedAt?: string | null
          email?: string
          id?: string
          nom?: string
          prenom?: string | null
          status?: Database["public"]["Enums"]["StatusUtilisateur"]
          telephone?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      UtilisateurHopital: {
        Row: {
          dateDebut: string
          dateFin: string | null
          hopitalId: string
          id: string
          role: Database["public"]["Enums"]["Role"]
          utilisateurId: string
        }
        Insert: {
          dateDebut?: string
          dateFin?: string | null
          hopitalId: string
          id: string
          role: Database["public"]["Enums"]["Role"]
          utilisateurId: string
        }
        Update: {
          dateDebut?: string
          dateFin?: string | null
          hopitalId?: string
          id?: string
          role?: Database["public"]["Enums"]["Role"]
          utilisateurId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UtilisateurHopital_hopitalId_fkey"
            columns: ["hopitalId"]
            isOneToOne: false
            referencedRelation: "Hopital"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UtilisateurHopital_utilisateurId_fkey"
            columns: ["utilisateurId"]
            isOneToOne: false
            referencedRelation: "Utilisateur"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      FonctionAdmin: "RESPONSABLE" | "SUPER_ADMIN"
      GroupeSanguin:
        | "A_POSITIF"
        | "A_NEGATIF"
        | "B_POSITIF"
        | "B_NEGATIF"
        | "AB_POSITIF"
        | "AB_NEGATIF"
        | "O_POSITIF"
        | "O_NEGATIF"
        | "INCONNU"
      Role: "PATIENT" | "MEDECIN" | "ADMIN"
      Sexe: "Homme" | "Femme" | "Autre"
      StatusUtilisateur: "ACTIF" | "INACTIF" | "PENDING"
      StatutApproval: "EN_ATTENTE" | "APPROUVE" | "REJETE"
      StatutRendezVous: "CONFIRME" | "ANNULE" | "EN_ATTENTE" | "TERMINE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      FonctionAdmin: ["RESPONSABLE", "SUPER_ADMIN"],
      GroupeSanguin: [
        "A_POSITIF",
        "A_NEGATIF",
        "B_POSITIF",
        "B_NEGATIF",
        "AB_POSITIF",
        "AB_NEGATIF",
        "O_POSITIF",
        "O_NEGATIF",
        "INCONNU",
      ],
      Role: ["PATIENT", "MEDECIN", "ADMIN"],
      Sexe: ["Homme", "Femme", "Autre"],
      StatusUtilisateur: ["ACTIF", "INACTIF", "PENDING"],
      StatutApproval: ["EN_ATTENTE", "APPROUVE", "REJETE"],
      StatutRendezVous: ["CONFIRME", "ANNULE", "EN_ATTENTE", "TERMINE"],
    },
  },
} as const
