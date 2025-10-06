"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Calendar,
  Stethoscope,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Heart,
  Brain,
  Zap,
  Download,
  Filter,
  RefreshCw,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { 
  obtenirStatistiquesAvancees,
  type StatistiquesGenerales,
  type ConsultationParMois,
  type ClassificationMaladie,
  type Tendances
} from "@/app/actions/statistiques";

export default function StatistiquesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30j");
  const [selectedSpecialite, setSelectedSpecialite] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatistiquesGenerales>({
    totalPatients: 0,
    nouveauxPatients: 0,
    consultationsMois: 0,
    revenusMois: 0,
    evolutionPatients: 0,
    evolutionConsultations: 0,
    evolutionRevenus: 0
  });
  const [consultationsParMois, setConsultationsParMois] = useState<ConsultationParMois[]>([]);
  const [classificationMaladies, setClassificationMaladies] = useState<ClassificationMaladie[]>([]);
  const [tendances, setTendances] = useState<Tendances>({
    nouveauxPatients: 0,
    rdvSemaine: 0,
    patientsActifs: 0,
    enAttente: 0
  });

  // Charger les données au montage du composant
  useEffect(() => {
    chargerDonnees();
  }, []);

  const chargerDonnees = async () => {
    setLoading(true);
    try {
      const result = await obtenirStatistiquesAvancees();

      if (result.success) {
        setStats(result.data.generales || stats);
        setConsultationsParMois(result.data.consultationsParMois || []);
        setClassificationMaladies(result.data.classificationMaladies || []);
        setTendances(result.data.tendances || tendances);
      } else {
        toast.error(result.error || "Erreur lors du chargement des statistiques");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      toast.error("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    chargerDonnees();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des statistiques...</span>
          </div>
        </div>
      </div>
    );
  }

  // Les données sont maintenant chargées via les server actions

  const consultationsParJour = [
    { jour: "Lun", consultations: 8 },
    { jour: "Mar", consultations: 12 },
    { jour: "Mer", consultations: 10 },
    { jour: "Jeu", consultations: 14 },
    { jour: "Ven", consultations: 11 },
    { jour: "Sam", consultations: 6 },
    { jour: "Dim", consultations: 2 }
  ];

  const patientsRecents = [
    { nom: "Dupont Jean", date: "2024-01-20", pathologie: "Hypertension", statut: "Nouveau" },
    { nom: "Martin Marie", date: "2024-01-19", pathologie: "Diabète", statut: "Suivi" },
    { nom: "Bernard Pierre", date: "2024-01-18", pathologie: "Arythmie", statut: "Urgent" },
    { nom: "Leroy Sophie", date: "2024-01-17", pathologie: "Cardiomyopathie", statut: "Contrôle" }
  ];

  const getEvolutionIcon = (evolution: number) => {
    if (evolution > 0) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (evolution < 0) {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return <Activity className="h-4 w-4 text-gray-600" />;
  };

  const getEvolutionColor = (evolution: number) => {
    if (evolution > 0) return "text-green-600";
    if (evolution < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Statistiques</h1>
          <p className="text-muted-foreground">
            Analyses et rapports de votre activité médicale
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Période:</span>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7j">7 jours</SelectItem>
                  <SelectItem value="30j">30 jours</SelectItem>
                  <SelectItem value="90j">90 jours</SelectItem>
                  <SelectItem value="1a">1 an</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Spécialité:</span>
              <Select value={selectedSpecialite} onValueChange={setSelectedSpecialite}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="cardiologie">Cardiologie</SelectItem>
                  <SelectItem value="neurologie">Neurologie</SelectItem>
                  <SelectItem value="endocrinologie">Endocrinologie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="financier">Financier</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-6">
          {/* Cartes de statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPatients}</div>
                <div className="flex items-center space-x-2 text-xs">
                  {getEvolutionIcon(stats.evolutionPatients)}
                  <span className={getEvolutionColor(stats.evolutionPatients)}>
                    +{stats.evolutionPatients}% ce mois
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consultations</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.consultationsMois}</div>
                <div className="flex items-center space-x-2 text-xs">
                  {getEvolutionIcon(stats.evolutionConsultations)}
                  <span className={getEvolutionColor(stats.evolutionConsultations)}>
                    {stats.evolutionConsultations}% ce mois
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenus</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.revenusMois.toLocaleString('fr-FR')} €</div>
                <div className="flex items-center space-x-2 text-xs">
                  {getEvolutionIcon(stats.evolutionRevenus)}
                  <span className={getEvolutionColor(stats.evolutionRevenus)}>
                    +{stats.evolutionRevenus}% ce mois
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nouveaux</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.nouveauxPatients}</div>
                <p className="text-xs text-muted-foreground">
                  Nouveaux patients ce mois
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des Consultations</CardTitle>
                <CardDescription>Consultations et revenus par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultationsParMois.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-sm font-medium">{item.mois}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm">{item.consultations} consultations</span>
                        <span className="text-sm text-muted-foreground">
                          {item.revenus.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consultations par Jour</CardTitle>
                <CardDescription>Répartition hebdomadaire</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultationsParJour.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.jour}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(item.consultations / 14) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm w-8">{item.consultations}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Patients */}
        <TabsContent value="patients" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pathologies Fréquentes</CardTitle>
                <CardDescription>Répartition des pathologies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pathologiesFrequentes.map((pathologie, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{pathologie.pathologie}</span>
                        <span className="text-sm text-muted-foreground">
                          {pathologie.patients} patients ({pathologie.pourcentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${pathologie.pourcentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patients Récents</CardTitle>
                <CardDescription>Derniers patients ajoutés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientsRecents.map((patient, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{patient.nom}</div>
                        <div className="text-sm text-muted-foreground">{patient.pathologie}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{patient.statut}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(patient.date).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Consultations */}
        <TabsContent value="consultations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Consultations par Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consultations de routine</span>
                    <span className="text-sm font-medium">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consultations urgentes</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Suivi post-opératoire</span>
                    <span className="text-sm font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Contrôles</span>
                    <span className="text-sm font-medium">24</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Durée Moyenne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">32 min</div>
                    <div className="text-sm text-muted-foreground">Durée moyenne</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Consultation courte</span>
                      <span>15 min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Consultation standard</span>
                      <span>30 min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Consultation longue</span>
                      <span>60 min</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficacité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">94%</div>
                    <div className="text-sm text-muted-foreground">Taux de satisfaction</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Patients satisfaits</span>
                      <span>147</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Patients neutres</span>
                      <span>8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Patients insatisfaits</span>
                      <span>1</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financier */}
        <TabsContent value="financier" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenus par Mois</CardTitle>
                <CardDescription>Évolution des revenus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultationsParMois.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.mois}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(item.revenus / 12000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {item.revenus.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition des Revenus</CardTitle>
                <CardDescription>Sources de revenus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consultations</span>
                    <span className="text-sm font-medium">8,500 € (68%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Examens</span>
                    <span className="text-sm font-medium">2,200 € (18%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Urgences</span>
                    <span className="text-sm font-medium">1,750 € (14%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

