'use client';

import React from 'react';

import { X } from 'lucide-react';
import { useSearchStore } from '@/hooks/useSearchStore';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { specialities } from './specialities/mock';
import { Button } from './ui/button';

export default function SearchDoctor() {
  const { location, nom, speciality, setLocation, setNom, setSpeciality, reset } = useSearchStore();

  const handleReset = () => {
    reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center flex-wrap bg-background rounded-md p-2 shadow-lg">
        <div className="flex">
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex">
          <Input
            type="text"
            placeholder="Nom de l'hôpital"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full max-w-32"
          />
        </div>
        
        <div className="flex-1 min-w-[120px]">
          <Select value={speciality} onValueChange={setSpeciality}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Specialites" />
            </SelectTrigger>
            <SelectContent>
              {specialities.map((speciality) => (
                <SelectItem key={speciality.id} value={speciality.id|| "1"}>
                  {speciality.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button size="lg" variant="outline" className="self-start" onClick={handleReset}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
