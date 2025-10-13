import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export function EmptyState() {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="p-4 rounded-full bg-muted">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Aucune demande
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Il n'y a actuellement aucune demande de médecin pour cet hôpital.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



