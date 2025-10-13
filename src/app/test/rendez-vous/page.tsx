"use client";

import { useState, useTransition, useEffect } from "react";
import { creerRendezVous } from "@/app/actions/rendez-vous";
import { getAllPatients, getAllSpecialites } from "./helpers";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, FileText, CheckCircle, AlertCircle, Stethoscope, RefreshCw } from "lucide-react";

interface EmailResult {
  success: boolean;
  error: string;
  messageId: string;
}

interface TestResult {
  success: boolean;
  message?: string;
  error?: string;
  emailResults?: {
    patient: EmailResult;
    medecin: EmailResult;
  };
}

export default function TestRendezVousPage() {
  const [pending, startTransition] = useTransition();
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [specialites, setSpecialites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // États pour le formulaire
  const [formData, setFormData] = useState({
    patientId: "",
    date: "",
    heure: "",
    duree: "30",
    motif: "",
    notes: "",
    specialiteId: ""
  });

  // Charger les données au montage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [patientsResult, specialitesResult] = await Promise.all([
      getAllPatients(),
      getAllSpecialites()
    ]);

    if (patientsResult.success) {
      setPatients(patientsResult.data);
    }

    if (specialitesResult.success) {
      setSpecialites(specialitesResult.data);
    }

    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (!formData.patientId || !formData.date || !formData.heure || !formData.duree || !formData.motif) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    startTransition(async () => {
      setLastResult(null);

      // Créer un FormData
      const form = new FormData();
      form.append("patientId", formData.patientId);
      form.append("date", formData.date);
      form.append("heure", formData.heure);
      form.append("duree", formData.duree);
      form.append("motif", formData.motif);
      form.append("notes", formData.notes);
      form.append("specialiteId", formData.specialiteId);

      const result = await creerRendezVous(form);

      setLastResult(result);

      if (result.success) {
        toast.success(result.message || "Rendez-vous créé avec succès !");
        console.log("✅ Rendez-vous créé:", result);
        
        // Réinitialiser le formulaire
        setFormData({
          patientId: "",
          date: "",
          heure: "",
          duree: "30",
          motif: "",
          notes: "",
          specialiteId: ""
        });
      } else {
        toast.error(result.error || "Erreur lors de la création");
        console.error("❌ Erreur:", result.error);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <CardTitle>Test - Création de Rendez-vous</CardTitle>
          </div>
          <CardDescription>
            Tester la fonction creerRendezVous() avec un formulaire complet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Select */}
            <div className="space-y-2">
              <Label htmlFor="patientId" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Patient *
              </Label>
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Chargement des patients...
                </div>
              ) : patients.length > 0 ? (
                <Select
                  value={formData.patientId}
                  onValueChange={(value) => handleInputChange("patientId", value)}
                  disabled={pending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-3 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-md">
                  ⚠️ Aucun patient trouvé. Créez d'abord un patient en base de données.
                </div>
              )}
            </div>

            {/* Date et Heure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  disabled={pending}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heure" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Heure *
                </Label>
                <Input
                  id="heure"
                  type="time"
                  value={formData.heure}
                  onChange={(e) => handleInputChange("heure", e.target.value)}
                  disabled={pending}
                  required
                />
              </div>
            </div>

            {/* Durée */}
            <div className="space-y-2">
              <Label htmlFor="duree">Durée (minutes) *</Label>
              <Input
                id="duree"
                type="number"
                min="15"
                max="120"
                step="15"
                placeholder="30"
                value={formData.duree}
                onChange={(e) => handleInputChange("duree", e.target.value)}
                disabled={pending}
                required
              />
              <p className="text-xs text-muted-foreground">
                Entre 15 et 120 minutes
              </p>
            </div>

            {/* Spécialité Select */}
            <div className="space-y-2">
              <Label htmlFor="specialiteId">Spécialité (optionnel)</Label>
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Chargement des spécialités...
                </div>
              ) : specialites.length > 0 ? (
                <Select
                  value={formData.specialiteId}
                  onValueChange={(value) => handleInputChange("specialiteId", value)}
                  disabled={pending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialites.map((spec) => (
                      <SelectItem key={spec.id} value={spec.id}>
                        {spec.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucune spécialité disponible
                </p>
              )}
            </div>

            {/* Motif */}
            <div className="space-y-2">
              <Label htmlFor="motif" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Motif de la consultation *
              </Label>
              <Textarea
                id="motif"
                placeholder="Décrivez le motif de la consultation..."
                value={formData.motif}
                onChange={(e) => handleInputChange("motif", e.target.value)}
                disabled={pending}
                required
                rows={3}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                placeholder="Notes supplémentaires..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                disabled={pending}
                rows={3}
              />
            </div>

            {/* Bouton Submit */}
            <Button
              type="submit"
              disabled={pending}
              className="w-full"
              size="lg"
            >
              {pending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Création en cours...
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  Créer le Rendez-vous
                </>
              )}
            </Button>
          </form>

          {/* Résultat */}
          {lastResult && (
            <>
              <div className={`mt-6 p-4 rounded-lg border ${
                lastResult.success 
                  ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                  : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
              }`}>
                <div className="flex items-start gap-2">
                  {lastResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`font-medium ${
                      lastResult.success 
                        ? 'text-green-900 dark:text-green-100' 
                        : 'text-red-900 dark:text-red-100'
                    }`}>
                      {lastResult.success ? lastResult.message : lastResult.error}
                    </p>
                    {lastResult.success && (
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        Le rendez-vous a été créé et la disponibilité a été vérifiée.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Résultats d'envoi d'emails */}
              {lastResult.success && lastResult.emailResults && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                    📧 Statut d'Envoi des Emails
                  </h3>
                  
                  <div className="space-y-3">
                    {/* Email Patient */}
                    <div className={`p-3 rounded-md border ${
                      lastResult.emailResults.patient.success
                        ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                        : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                    }`}>
                      <div className="flex items-start gap-2">
                        {lastResult.emailResults.patient.success ? (
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            lastResult.emailResults.patient.success
                              ? 'text-green-900 dark:text-green-100'
                              : 'text-red-900 dark:text-red-100'
                          }`}>
                            👤 Email Patient: {lastResult.emailResults.patient.success ? 'Envoyé ✅' : 'Échec ❌'}
                          </p>
                          {lastResult.emailResults.patient.success && lastResult.emailResults.patient.messageId && (
                            <p className="text-xs text-green-700 dark:text-green-300 mt-1 font-mono">
                              ID: {lastResult.emailResults.patient.messageId}
                            </p>
                          )}
                          {!lastResult.emailResults.patient.success && lastResult.emailResults.patient.error && (
                            <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                              {lastResult.emailResults.patient.error}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Email Médecin */}
                    <div className={`p-3 rounded-md border ${
                      lastResult.emailResults.medecin.success
                        ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                        : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                    }`}>
                      <div className="flex items-start gap-2">
                        {lastResult.emailResults.medecin.success ? (
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            lastResult.emailResults.medecin.success
                              ? 'text-green-900 dark:text-green-100'
                              : 'text-red-900 dark:text-red-100'
                          }`}>
                            👨‍⚕️ Email Médecin: {lastResult.emailResults.medecin.success ? 'Envoyé ✅' : 'Échec ❌'}
                          </p>
                          {lastResult.emailResults.medecin.success && lastResult.emailResults.medecin.messageId && (
                            <p className="text-xs text-green-700 dark:text-green-300 mt-1 font-mono">
                              ID: {lastResult.emailResults.medecin.messageId}
                            </p>
                          )}
                          {!lastResult.emailResults.medecin.success && lastResult.emailResults.medecin.error && (
                            <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                              {lastResult.emailResults.medecin.error}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Résumé */}
                  <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      💡 Les emails sont envoyés en mode TEST à <strong>piratestuart@gmail.com</strong>
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              ℹ️ Informations importantes
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Vous devez être connecté en tant que <strong>MEDECIN</strong></li>
              <li>• Le <strong>patientId</strong> doit exister dans la base de données</li>
              <li>• La fonction vérifie automatiquement la disponibilité du médecin</li>
              <li>• Le statut par défaut sera <strong>EN_ATTENTE</strong></li>
              <li>• Les champs marqués d'un <strong>*</strong> sont obligatoires</li>
            </ul>
          </div>

          {/* Email Test Info */}
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="font-medium text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
              📧 Test de Notification Email
            </h3>
            <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <p>✅ La fonction <code className="bg-green-100 dark:bg-green-900 px-1 rounded">creerRendezVous()</code> va automatiquement :</p>
              <ul className="ml-4 space-y-1 mt-2">
                <li>1. Récupérer les infos du patient et du médecin</li>
                <li>2. Appeler <strong>sendRendezVousCreatedNotification()</strong></li>
                <li>3. Envoyer 2 emails : un au <strong>patient</strong> et un au <strong>médecin</strong></li>
              </ul>
              <p className="pt-2 border-t border-green-300 dark:border-green-700">
                <strong>📊 Logs à surveiller dans le TERMINAL :</strong>
              </p>
              <ul className="ml-4 space-y-1 text-xs font-mono">
                <li>✅ Rendez-vous validé...</li>
                <li>📋 Données récupérées pour l'email:</li>
                <li>🎯 NOTIFICATION: CRÉATION DE RENDEZ-VOUS</li>
                <li>📤 [1/2] Envoi email au PATIENT...</li>
                <li>📤 [2/2] Envoi email au MÉDECIN...</li>
                <li>✅ Notifications envoyées avec succès</li>
              </ul>
            </div>
          </div>

          {/* Debug Info */}
          <div className="mt-4 text-xs text-muted-foreground space-y-1 pt-4 border-t">
            <p>📍 Action: creerRendezVous() from @/app/actions/rendez-vous</p>
            <p>🔧 Validation: Données + Disponibilité</p>
            <p>💾 Base: Prisma (commenté dans le code actuel)</p>
            <p>🔄 Revalidation: /medecin/rendez-vous</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

