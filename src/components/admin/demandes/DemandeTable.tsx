import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { FileText, AlertCircle } from "lucide-react";
import { DemandeTableRow } from "./DemandeTableRow";

interface DemandeTableProps {
  demandes: any[];
  stats: {
    filtered: number;
    total: number;
  };
  hasActiveFilters: boolean;
  onViewDemande: (demande: any) => void;
  onClearFilters: () => void;
}

export function DemandeTable({ 
  demandes, 
  stats, 
  hasActiveFilters, 
  onViewDemande,
  onClearFilters 
}: DemandeTableProps) {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="border-b border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">
                Demandes reçues
              </CardTitle>
              <CardDescription>
                {stats.filtered} demande{stats.filtered > 1 ? 's' : ''} affichée{stats.filtered > 1 ? 's' : ''}
                {hasActiveFilters && ` sur ${stats.total}`}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {demandes.length === 0 ? (
          <div className="p-12 text-center">
            <div className="p-4 rounded-full bg-muted inline-flex mb-4">
              <AlertCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Aucun résultat
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Aucune demande ne correspond à vos critères de recherche
            </p>
            <Button variant="outline" onClick={onClearFilters}>
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold">Médecin</TableHead>
                  <TableHead className="font-semibold">Spécialité</TableHead>
                  <TableHead className="font-semibold">Expérience</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Statut</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demandes.map((demande) => (
                  <DemandeTableRow
                    key={demande.id}
                    demande={demande}
                    onView={onViewDemande}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}



