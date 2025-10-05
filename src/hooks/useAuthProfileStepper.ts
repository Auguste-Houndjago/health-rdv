// src/hooks/useAuthProfileStepper.ts
"use client"

import * as React from "react"

type Step = 1 | 2 | 3
type Role = 'PATIENT' | 'MEDECIN'

export type Sexe = 'Homme' | 'Femme' | 'Autre'
export type GroupeSanguin =
  | 'A_POSITIF' | 'A_NEGATIF'
  | 'B_POSITIF' | 'B_NEGATIF'
  | 'AB_POSITIF' | 'AB_NEGATIF'
  | 'O_POSITIF' | 'O_NEGATIF'
  | 'INCONNU'

interface BaseProfileData {
  nom: string
  prenom: string
  telephone?: string
  avatarUrl?: string
  dateNaissance: string
}

interface PatientProfileData extends BaseProfileData {
  role: 'PATIENT'
  sexe: Sexe
  groupeSanguin: GroupeSanguin
  adresse?: string
}

interface MedecinProfileData extends BaseProfileData {
  role: 'MEDECIN'
  specialiteId: string
  numLicence: string
  anneeExperience?: number
  titre: string
}

export type ProfileData = PatientProfileData | MedecinProfileData

export function useAuthProfileStepper(role: Role) {
  const [currentStep, setCurrentStep] = React.useState<Step>(1)

  // Champs communs
  const [nom, setNom] = React.useState("")
  const [prenom, setPrenom] = React.useState("")
  const [telephone, setTelephone] = React.useState("")
  const [avatarUrl, setAvatarUrl] = React.useState("")
  const [dateNaissance, setDateNaissance] = React.useState("")

  // Champs patient
  const [sexe, setSexe] = React.useState<Sexe | "">("")
  const [groupeSanguin, setGroupeSanguin] = React.useState<GroupeSanguin | "">("")
  const [adresse, setAdresse] = React.useState("")

  // Champs médecin
  const [specialiteId, setSpecialiteId] = React.useState("")
  const [numLicence, setNumLicence] = React.useState("")
  const [anneeExperience, setAnneeExperience] = React.useState<number | "">("")
  const [titre, setTitre] = React.useState("")

  const nextStep = () => setCurrentStep((prev) => (prev < 3 ? (prev + 1) as Step : prev))
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? (prev - 1) as Step : prev))

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        return nom.trim().length > 0 && prenom.trim().length > 0
      case 2:
        return dateNaissance.trim().length > 0
      case 3:
        if (role === 'PATIENT') {
          return sexe !== "" && groupeSanguin !== ""
        } else {
          return specialiteId !== "" && numLicence !== "" && titre !== ""
        }
      default:
        return false
    }
  }

  const handleStepChange = (step: number) => {
    if (step < currentStep || (step === currentStep + 1 && validateStep(currentStep))) {
      setCurrentStep(step as Step)
    }
  }

  const getProfileData = (): ProfileData | null => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) return null
    
    const baseData = {
      nom,
      prenom,
      telephone: telephone || undefined,
      avatarUrl: avatarUrl || undefined,
      dateNaissance,
    }

    if (role === 'PATIENT') {
      return {
        ...baseData,
        role: 'PATIENT',
        sexe: sexe as Sexe,
        groupeSanguin: groupeSanguin as GroupeSanguin,
        adresse: adresse || undefined,
      }
    } else {
      return {
        ...baseData,
        role: 'MEDECIN',
        specialiteId,
        numLicence,
        anneeExperience: anneeExperience ? Number(anneeExperience) : undefined,
        titre,
      }
    }
  }

  return {
    // step state
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    handleStepChange,
    validateStep,

    // fields communs
    nom, setNom,
    prenom, setPrenom,
    telephone, setTelephone,
    avatarUrl, setAvatarUrl,
    dateNaissance, setDateNaissance,

    // fields patient
    sexe, setSexe,
    groupeSanguin, setGroupeSanguin,
    adresse, setAdresse,

    // fields médecin
    specialiteId, setSpecialiteId,
    numLicence, setNumLicence,
    anneeExperience, setAnneeExperience,
    titre, setTitre,

    // helpers
    getProfileData,
    role,
  }
}