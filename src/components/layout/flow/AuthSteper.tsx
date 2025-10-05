// src/components/layout/flow/AuthSteper.tsx
"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { Check, LoaderCircleIcon } from 'lucide-react'
import { useAuthProfileStepper } from "@/hooks/useAuthProfileStepper"
import { IdentityStepCard, BirthdateStepCard, ProfileStepCard, MedecinProfileStepCard } from "./StepCards"
import { useProfileMutations } from "@/hooks/useProfileMutations"
import type { Sexe as PrismaSexe, GroupeSanguin as PrismaGroupeSanguin } from "@prisma/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Step = 1 | 2 | 3
export type Role = 'PATIENT' | 'MEDECIN'

interface UnifiedStepperProps {
  role: Role
  onComplete?: (data: any) => void
}

const getSteps = (role: Role) => [
  { 
    title: 'Identité', 
    description: 'Renseignez vos informations personnelles',
    step: 1 as Step
  },
  { 
    title: 'Profil utilisateur', 
    description: 'Avatar et date de naissance',
    step: 2 as Step
  },
  { 
    title: role === 'PATIENT' ? 'Profil patient' : 'Profil médecin', 
    description: role === 'PATIENT' ? 'Complétez votre profil patient' : 'Complétez votre profil médecin',
    step: 3 as Step
  },
]

export default function AuthSteper({ role="PATIENT", onComplete }: UnifiedStepperProps) {
  const {
    currentStep,
    nextStep,
    prevStep,
    handleStepChange,
    validateStep,
    // champs communs
    nom, setNom,
    prenom, setPrenom,
    telephone, setTelephone,
    avatarUrl, setAvatarUrl,
    dateNaissance, setDateNaissance,
    // champs patient
    sexe, setSexe,
    groupeSanguin, setGroupeSanguin,
    adresse, setAdresse,
    // champs médecin
    specialiteId, setSpecialiteId,
    numLicence, setNumLicence,
    anneeExperience, setAnneeExperience,
    titre, setTitre,
    getProfileData,
  } = useAuthProfileStepper(role)

  const { submitAll, profilMutation, identiteMutation, naissanceMutation } = useProfileMutations(role)

  const isSubmitting = identiteMutation.isPending || naissanceMutation.isPending || profilMutation.isPending

  const stepVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }
  const router = useRouter()

  const submit = async () => {
    const payload = getProfileData()
    if (!payload) return

    await submitAll(payload as any)
    onComplete?.(payload)
    toast.success("Profil créé avec succès!")

    // Redirection selon le rôle
    router.push(role === 'PATIENT' ? "/patient" : "/medecin")
  }

  const getStepContent = (step: Step) => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <IdentityStepCard
              nom={nom}
              setNom={setNom}
              prenom={prenom}
              setPrenom={setPrenom}
              telephone={telephone}
              setTelephone={setTelephone}
              onNext={nextStep}
              canNext={validateStep(1)}
            />
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <BirthdateStepCard
              avatarUrl={avatarUrl}
              setAvatarUrl={setAvatarUrl}
              dateNaissance={dateNaissance}
              setDateNaissance={setDateNaissance}
              onNext={nextStep}
              onBack={prevStep}
              canNext={validateStep(2)}
            />
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {role === 'PATIENT' ? (
              <ProfileStepCard
                sexe={sexe as any}
                setSexe={setSexe as any}
                groupeSanguin={groupeSanguin as any}
                setGroupeSanguin={setGroupeSanguin as any}
                adresse={adresse}
                setAdresse={setAdresse}
                onBack={prevStep}
                onSubmit={submit}
                canSubmit={validateStep(3) && !isSubmitting}
              />
            ) : (
              <MedecinProfileStepCard
                specialiteId={specialiteId}
                setSpecialiteId={setSpecialiteId}
                numLicence={numLicence}
                setNumLicence={setNumLicence}
                anneeExperience={anneeExperience}
                setAnneeExperience={setAnneeExperience}
                titre={titre}
                setTitre={setTitre}
                onBack={prevStep}
                onSubmit={submit}
                canSubmit={validateStep(3) && !isSubmitting}
              />
            )}
          </motion.div>
        )
      default:
        return null
    }
  }

  const steps = getSteps(role)

  return (
    <div className="flex flex-col gap-5 p-10 w-full mx-auto max-w-[600px] h-full justify-center items-center">
      <Stepper
        value={currentStep}
        onValueChange={handleStepChange}
        indicators={{
          completed: <Check className="size-4" />,
          loading: <LoaderCircleIcon className="size-4 animate-spin" />,
        }}
        className="space-y-8 w-full"
      >
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem key={index} step={step.step} className="relative flex-1">
              <StepperTrigger className="flex justify-start gap-1.5 w-full">
                <StepperIndicator>{step.step}</StepperIndicator>
                <div className="flex flex-col items-start gap-0.5">
                  <StepperTitle>{step.title}</StepperTitle>
                  <StepperDescription>{step.description}</StepperDescription>
                </div>
              </StepperTrigger>

              {steps.length > index + 1 && <StepperSeparator className="md:mx-2.5" />}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="text-sm w-full">
          <StepperContent value={currentStep} className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                {steps.find(step => step.step === currentStep)?.title}
              </h2>
              
              <AnimatePresence mode="wait">
                {getStepContent(currentStep)}
              </AnimatePresence>
            </div>
          </StepperContent>
        </StepperPanel>
      </Stepper>
    </div>
  )
}