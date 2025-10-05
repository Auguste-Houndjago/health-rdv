"use client";

import React, { useMemo, useState, useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PatientAppointmentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [newRdvOpen, setNewRdvOpen] = useState(false);
  const [selectedMedecin, setSelectedMedecin] = useState<string>("");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [motif, setMotif] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDateObj, setSelectedDateObj] = useState<Date | undefined>(undefined);

  // Récupérer les paramètres de l'URL
  const doctorId = searchParams.get('doctor');
  const hospitalId = searchParams.get('hospital');

  // Ouvrir automatiquement le modal si on vient de la page hôpital
  useEffect(() => {
    if (doctorId && hospitalId) {
      setSelectedMedecin(doctorId);
      setNewRdvOpen(true);
    }
  }, [doctorId, hospitalId]);

  const appointments = useMemo(() => [
    {
      date: '2025-09-15', heure: '09:00', hopital: 'CHU Sylvanus Olympio, Lomé', service: 'Cardiologie', statut: 'CONFIRME'
    },
    {
      date: '2025-09-20', heure: '14:30', hopital: 'CHU Kara', service: 'Dermatologie', statut: 'EN_ATTENTE'
    }
  ], []);

  // Données fictives pour le modal (à remplacer par l'API)
  const medecins = useMemo(() => ([
    { id: "d1", titre: "Dr. Ahmadou Ndiaye (Cardiologie)" },
    { id: "d2", titre: "Dr. Fatou Diop (Cardiologie)" },
    { id: "d3", titre: "Dr. Moussa Fall (Dermatologie)" },
    { id: "d4", titre: "Dr. Aminata Ba (Pédiatrie)" },
    { id: "d5", titre: "Dr. Ibrahima Sarr (Pédiatrie)" },
  ]), []);

  const disponibilites = useMemo(() => ([
    { id: "s1", medecinId: "d1", date: new Date().toISOString().slice(0,10), heure: "09:00" },
    { id: "s2", medecinId: "d1", date: new Date().toISOString().slice(0,10), heure: "10:30" },
    { id: "s3", medecinId: "d2", date: new Date(Date.now()+86400000).toISOString().slice(0,10), heure: "14:00" },
    { id: "s4", medecinId: "d2", date: new Date(Date.now()+86400000).toISOString().slice(0,10), heure: "15:30" },
    { id: "s5", medecinId: "d3", date: new Date(Date.now()+172800000).toISOString().slice(0,10), heure: "11:00" },
    { id: "s6", medecinId: "d4", date: new Date(Date.now()+172800000).toISOString().slice(0,10), heure: "16:00" },
    { id: "s7", medecinId: "d5", date: new Date(Date.now()+259200000).toISOString().slice(0,10), heure: "13:30" },
  ]), []);

  const handleConfirmRdv = async () => {
    // Intégrer l'appel API ici
    console.log("Confirmer RDV", { selectedMedecin, selectedDate, selectedSlotId, motif });
    setNewRdvOpen(false);
    setMotif("");
    setSelectedSlotId("");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen ">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-semibold">Mes rendez-vous</h1>
            <Button 
              variant="default" 
              onClick={() => setNewRdvOpen(true)}
              className="bg-green-800 hover:bg-green-700"
            >
              Nouveau rendez-vous
            </Button>
          </div>
      <p className="text-sm text-foreground/60 mb-4">Gestion de vos rendez-vous médicaux.</p>

      <div className="space-y-2">
        {appointments.map((r, idx) => (
          <div key={idx} className="border rounded-md p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{r.service} • {r.hopital}</p>
              <p className="text-sm text-foreground/60">{r.date} • {r.heure}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-muted">{r.statut}</span>
          </div>
        ))}
      </div>
      {/* <AppointmentModal
        open={newRdvOpen}
        onOpenChange={setNewRdvOpen}
        medecins={medecins}
        disponibilites={disponibilites}
        selectedMedecin={selectedMedecin}
        onMedecinChange={setSelectedMedecin}
        selectedDate={selectedDate}
        selectedDateObj={selectedDateObj}
        onDateSelect={(date) => {
          setSelectedDateObj(date);
          setSelectedDate(date ? date.toISOString().slice(0,10) : "");
          setSelectedSlotId("");
        }}
        selectedSlotId={selectedSlotId}
        onSlotSelect={setSelectedSlotId}
        motif={motif}
        onMotifChange={setMotif}
        onConfirm={handleConfirmRdv}
      /> */}
        </Card>
      </div>
    </div>
  );
}


