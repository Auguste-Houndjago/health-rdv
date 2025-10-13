import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <Card className="border-destructive/50 shadow-sm">
      <CardContent className="p-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="p-3 rounded-full bg-destructive/10">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Erreur lors du chargement
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Impossible de charger les demandes. Veuillez réessayer.
            </p>
            <Button variant="outline" onClick={onRetry}>
              Réessayer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



