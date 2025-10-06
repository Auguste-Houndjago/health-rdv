// components/specialites/CreateSpecialiteForm.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSpecialiteForm } from '@/hooks/specialites/useSpecialiteForm';

interface CreateSpecialiteFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function CreateSpecialiteForm({ 
  onSuccess, 
  className = "" 
}: CreateSpecialiteFormProps) {
  const {
    formData,
    errors,
    isPending,
    handleChange,
    handleSubmit,
    resetForm,
  } = useSpecialiteForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSuccess);
  };

  const characterCount = {
    nom: formData.nom.length,
    description: formData.description.length,
  };

  const maxLength = {
    nom: 100,
    description: 500,
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Créer une nouvelle spécialité</CardTitle>
        <CardDescription>
          Ajoutez une nouvelle spécialité médicale à votre plateforme
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Champ Nom */}
          <div className="space-y-2">
            <Label htmlFor="nom">
              Nom de la spécialité <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nom"
              value={formData.nom}
              onChange={(e) => handleChange('nom', e.target.value)}
              disabled={isPending}
              placeholder="Ex: Cardiologie, Dermatologie..."
              maxLength={maxLength.nom}
              className={errors.nom ? "border-destructive" : ""}
            />
            {errors.nom && (
              <p className="text-sm text-destructive">{errors.nom}</p>
            )}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Nom de la spécialité médicale</span>
              <span>{characterCount.nom}/{maxLength.nom}</span>
            </div>
          </div>

          {/* Champ Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={isPending}
              rows={4}
              placeholder="Décrivez brièvement cette spécialité médicale..."
              maxLength={maxLength.description}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Description optionnelle de la spécialité</span>
              <span>{characterCount.description}/{maxLength.description}</span>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isPending || !formData.nom.trim()}
              className="flex-1"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Création...
                </>
              ) : (
                'Créer la spécialité'
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isPending}
              className="flex-1"
            >
              Réinitialiser
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}