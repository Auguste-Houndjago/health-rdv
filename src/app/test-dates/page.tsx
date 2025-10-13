"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestDatesPage() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const dates = [
      { label: "MERCREDI créneau", date: "2025-10-14T00:00:00.000Z" },
      { label: "LUNDI créneau 1", date: "2025-10-13T00:00:00.000Z" },
      { label: "LUNDI créneau 2", date: "2025-10-27T00:00:00.000Z" },
      { label: "Aujourd'hui", date: new Date().toISOString() },
    ];

    const testResults = dates.map(({ label, date }) => {
      const dateObj = new Date(date);
      const jours = [
        'DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 
        'JEUDI', 'VENDREDI', 'SAMEDI'
      ];
      const jour = jours[dateObj.getUTCDay()];
      
      return {
        label,
        date: dateObj.toISOString(),
        localDate: dateObj.toLocaleString('fr-FR'),
        getUTCDay: dateObj.getUTCDay(),
        jourCalcule: jour,
        getDay: dateObj.getDay(),
        jourLocal: jours[dateObj.getDay()]
      };
    });

    setResults(testResults);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Test des jours de la semaine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">{result.label}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <strong>Date ISO:</strong> {result.date}
                  </div>
                  <div>
                    <strong>Date locale:</strong> {result.localDate}
                  </div>
                  <div>
                    <strong>getUTCDay():</strong> {result.getUTCDay}
                  </div>
                  <div className="text-blue-600">
                    <strong>Jour calculé (UTC):</strong> {result.jourCalcule}
                  </div>
                  <div>
                    <strong>getDay():</strong> {result.getDay}
                  </div>
                  <div className="text-green-600">
                    <strong>Jour local:</strong> {result.jourLocal}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


