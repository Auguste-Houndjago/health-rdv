//src/hooks/useAuthProfileStepper
"use client"

import * as React from "react"

type Step = 1 | 2 | 3

export type Sexe = 'Homme' | 'Femme' | 'Autre'
export type GroupeSanguin =
  | 'A_POSITIF' | 'A_NEGATIF'
  | 'B_POSITIF' | 'B_NEGATIF'
  | 'AB_POSITIF' | 'AB_NEGATIF'
  | 'O_POSITIF' | 'O_NEGATIF'
  | 'INCONNU'

export interface ProfileData {
  // Utilisateur — step 1
  nom: string
  prenom: string
  telephone?: string
  // Utilisateur — step 2
  avatarUrl?: string
  dateNaissance: string // yyyy-mm-dd
  // Patient — step 3
  sexe: Sexe
  groupeSanguin: GroupeSanguin
  adresse?: string
}

export function useAuthProfileStepper() {
  const [currentStep, setCurrentStep] = React.useState<Step>(1)

  // Étape 1 – Identité (Utilisateur)
  const [nom, setNom] = React.useState("")
  const [prenom, setPrenom] = React.useState("")
  const [telephone, setTelephone] = React.useState("")

  // Étape 2 – Profil (Utilisateur)
  const [avatarUrl, setAvatarUrl] = React.useState("")
  const [dateNaissance, setDateNaissance] = React.useState("")

  // Étape 3 – Profil (Patient)
  const [sexe, setSexe] = React.useState<Sexe | "">("")
  const [groupeSanguin, setGroupeSanguin] = React.useState<GroupeSanguin | "">("")
  const [adresse, setAdresse] = React.useState("")

  const nextStep = () => setCurrentStep((prev) => (prev < 3 ? (prev + 1) as Step : prev))
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? (prev - 1) as Step : prev))

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        // telephone optionnel
        return nom.trim().length > 0 && prenom.trim().length > 0
      case 2:
        return dateNaissance.trim().length > 0
      case 3:
        return (
          sexe !== "" &&
          groupeSanguin !== "" &&
          // adresse optionnelle
          true
        )
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
    return {
      nom,
      prenom,
      telephone: telephone || undefined,
      avatarUrl: avatarUrl || undefined,
      dateNaissance,
      sexe: sexe as Sexe,
      groupeSanguin: groupeSanguin as GroupeSanguin,
      adresse: adresse || undefined,
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

    // fields – step 1 (Utilisateur)
    nom, setNom,
    prenom, setPrenom,
    telephone, setTelephone,

    // fields – step 2 (Utilisateur)
    avatarUrl, setAvatarUrl,
    dateNaissance, setDateNaissance,

    // fields – step 3 (Patient)
    sexe, setSexe,
    groupeSanguin, setGroupeSanguin,
    adresse, setAdresse,

    // helpers
    getProfileData,
  }
} 