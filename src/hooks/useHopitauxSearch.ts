// hooks/useHopitauxSearch.ts
"use client";
import { useHopitaux } from './hopitaux/useHopitaux';
import { create } from 'zustand';

interface SearchState {
  location: string;
  nom: string;
  speciality: string;
  filteredHopitaux: any[];
  setLocation: (location: string) => void;
  setNom: (nom: string) => void;
  setSpeciality: (speciality: string) => void;
  search: () => void;
  reset: () => void;
}

export const useHopitauxSearch = () => {
  const { hopitaux, isLoading } = useHopitaux();
  
  const store = create<SearchState>((set, get) => ({
    location: '',
    nom: '',
    speciality: '',
    filteredHopitaux: isLoading ? [] : hopitaux,

    setLocation: (location: string) => {
      set({ location });
      const state = get();
      const filtered = filterHopitaux(hopitaux, location, state.nom, state.speciality);
      set({ filteredHopitaux: filtered });
    },

    setNom: (nom: string) => {
      set({ nom });
      const state = get();
      const filtered = filterHopitaux(hopitaux, state.location, nom, state.speciality);
      set({ filteredHopitaux: filtered });
    },

    setSpeciality: (speciality: string) => {
      set({ speciality });
      const state = get();
      const filtered = filterHopitaux(hopitaux, state.location, state.nom, speciality);
      set({ filteredHopitaux: filtered });
    },

    search: () => {
      const { location, nom, speciality } = get();
      const filtered = filterHopitaux(hopitaux, location, nom, speciality);
      set({ filteredHopitaux: filtered });
    },

    reset: () => {
      set({
        location: '',
        nom: '',
        speciality: '',
        filteredHopitaux: hopitaux
      });
    }
  }));

  return store();
};

// Fonction utilitaire de filtrage
const filterHopitaux = (hopitaux: any[], location: string, nom: string, speciality: string) => {
  if (!hopitaux.length) return [];

  let filtered = [...hopitaux];

  if (location.trim()) {
    filtered = filtered.filter(h => 
      h.localisation?.toLowerCase().includes(location.toLowerCase()) ||
      h.adresse?.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  if (nom.trim()) {
    filtered = filtered.filter(h => 
      h.nom?.toLowerCase().includes(nom.toLowerCase())
    );
  }
  
  if (speciality) {
    filtered = filtered.filter(h => 
      h.specialites?.includes(speciality)
    );
  }

  return filtered;
};