//src/components/layout/flow/StepCards
"use client"

import * as React from "react"
import { StepCard } from "./StepCard"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import AvatarUploader from "@/components/user/AvatarUploader"
import SelectSpecialites from "@/components/ux/SelectSpecialites"

export function IdentityStepCard({
  nom,
  setNom,
  prenom,
  setPrenom,
  telephone,
  setTelephone,
  onNext,
  canNext,
}: {
  nom: string
  setNom: (v: string) => void
  prenom: string
  setPrenom: (v: string) => void
  telephone: string
  setTelephone: (v: string) => void
  onNext: () => void
  canNext: boolean
}) {
  return (
    <StepCard title="Identité">
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="nom">Nom</Label>
          <Input
            id="nom"
            type="text"
            placeholder="Dupont"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="prenom">Prénom</Label>
          <Input
            id="prenom"
            type="text"
            placeholder="Jean"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="telephone">Téléphone (optionnel)</Label>
          <Input
            id="telephone"
            type="tel"
            placeholder="+33 6 12 34 56 78"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button 
          onClick={onNext} 
          className="mt-2 w-full"
          disabled={!canNext}
        >
          Suivant
        </Button>
      </div>
    </StepCard>
  )
}

export function BirthdateStepCard({
  avatarUrl,
  setAvatarUrl,
  dateNaissance,
  setDateNaissance,
  onNext,
  onBack,
  canNext,
}: {
  avatarUrl: string
  setAvatarUrl: (v: string) => void
  dateNaissance: string
  setDateNaissance: (v: string) => void
  onNext: () => void
  onBack: () => void
  canNext: boolean
}) {
  return (
    <StepCard title="Profil utilisateur">
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="avatarUrl">Avatar (URL)</Label>
          {/* <Input
            id="avatarUrl"
            type="url"
            placeholder="https://..."
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="mt-1"
          /> */}
          <AvatarUploader/>
        </div>
        <div>
          <Label htmlFor="dateNaissance">Date de naissance</Label>
          <Input
            id="dateNaissance"
            type="date"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={onBack}>
            Retour
          </Button>
          <Button onClick={onNext} disabled={!canNext}>
            Suivant
          </Button>
        </div>
      </div>
    </StepCard>
  )
}

export function ProfileStepCard({
  sexe,
  setSexe,
  groupeSanguin,
  setGroupeSanguin,
  adresse,
  setAdresse,
  onBack,
  onSubmit,
  canSubmit,
}: {
  sexe: 'Homme' | 'Femme' | 'Autre' | ""
  setSexe: (v: 'Homme' | 'Femme' | 'Autre') => void
  groupeSanguin: 'A_POSITIF' | 'A_NEGATIF' | 'B_POSITIF' | 'B_NEGATIF' | 'AB_POSITIF' | 'AB_NEGATIF' | 'O_POSITIF' | 'O_NEGATIF' | 'INCONNU' | ""
  setGroupeSanguin: (v: 'A_POSITIF' | 'A_NEGATIF' | 'B_POSITIF' | 'B_NEGATIF' | 'AB_POSITIF' | 'AB_NEGATIF' | 'O_POSITIF' | 'O_NEGATIF' | 'INCONNU') => void
  adresse: string
  setAdresse: (v: string) => void
  onBack: () => void
  onSubmit: () => void
  canSubmit: boolean
}) {
  return (
    <StepCard title="Profil patient">
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="sexe">Sexe</Label>
          <Select value={sexe} onValueChange={(v) => setSexe(v as any)}>
            <SelectTrigger id="sexe" className="mt-1">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Homme">Homme</SelectItem>
              <SelectItem value="Femme">Femme</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="groupeSanguin">Groupe sanguin</Label>
          <Select value={groupeSanguin} onValueChange={(v) => setGroupeSanguin(v as any)}>
            <SelectTrigger id="groupeSanguin" className="mt-1">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A_POSITIF">A_POSITIF</SelectItem>
              <SelectItem value="A_NEGATIF">A_NEGATIF</SelectItem>
              <SelectItem value="B_POSITIF">B_POSITIF</SelectItem>
              <SelectItem value="B_NEGATIF">B_NEGATIF</SelectItem>
              <SelectItem value="AB_POSITIF">AB_POSITIF</SelectItem>
              <SelectItem value="AB_NEGATIF">AB_NEGATIF</SelectItem>
              <SelectItem value="O_POSITIF">O_POSITIF</SelectItem>
              <SelectItem value="O_NEGATIF">O_NEGATIF</SelectItem>
              <SelectItem value="INCONNU">INCONNU</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="adresse">Adresse (optionnel)</Label>
          <Input
            id="adresse"
            type="text"
            placeholder="12 rue de la Paix, Paris"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={onBack}>
            Retour
          </Button>
          <Button onClick={onSubmit} disabled={!canSubmit}>
            Valider
          </Button>
        </div>
      </div>
    </StepCard>
  )
} 



//medecin
export function MedecinProfileStepCard({
  specialiteId,
  setSpecialiteId,
  numLicence,
  setNumLicence,
  anneeExperience,
  setAnneeExperience,
  titre,
  setTitre,
  onBack,
  onSubmit,
  canSubmit,
}: {
  specialiteId: string
  setSpecialiteId: (v: string) => void
  numLicence: string
  setNumLicence: (v: string) => void
  anneeExperience: number | ""
  setAnneeExperience: (v: number | "") => void
  titre: string
  setTitre: (v: string) => void
  onBack: () => void
  onSubmit: () => void
  canSubmit: boolean
}) {
  return (
    <StepCard title="Profil médecin">
      <div className="flex flex-col gap-4">
        <SelectSpecialites
          value={specialiteId}
          onChange={setSpecialiteId}
          label="Spécialité"
          placeholder="Sélectionnez votre spécialité"
          required={true}
        />
        <div>
          <Label htmlFor="numLicence">Numéro de licence</Label>
          <Input
            id="numLicence"
            type="text"
            placeholder="LIC123456"
            value={numLicence}
            onChange={(e) => setNumLicence(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="anneeExperience">Années d'expérience</Label>
          <Input
            id="anneeExperience"
            type="number"
            placeholder="5"
            value={anneeExperience}
            onChange={(e) => setAnneeExperience(e.target.value ? Number(e.target.value) : "")}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="titre">Titre</Label>
          <Input
            id="titre"
            type="text"
            placeholder="Docteur"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={onBack}>
            Retour
          </Button>
          <Button onClick={onSubmit} disabled={!canSubmit}>
            Valider
          </Button>
        </div>
      </div>
    </StepCard>
  )
}