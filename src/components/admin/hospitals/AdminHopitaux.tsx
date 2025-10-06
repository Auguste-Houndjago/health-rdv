// src/components/admin/hospitals/AdminHopitaux.tsx
"use client";

import { useState } from "react";
import { useHopitaux, HopitalInput } from "@/hooks/hopitaux/useHopitaux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import HopitalUploader from "@/components/hopitaux/HopitalUploader";

export default function AdminHopitaux() {
  const { hopitaux, isLoading, createHopital, updateHopital, deleteHopital, isAnyMutationPending } = useHopitaux();
  const [form, setForm] = useState<HopitalInput>({ nom: "", adresse: "", contact: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createHopital(form);
    setForm({ nom: "", adresse: "", contact: "" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un hôpital</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-3">

            </div>
            <Input placeholder="Nom" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
            <Input placeholder="Adresse" value={form.adresse} onChange={(e) => setForm({ ...form, adresse: e.target.value })} />
            <Input placeholder="Contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
            {/* <Input placeholder="Image (URL)" value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} /> */}
            <Input placeholder="Localisation" value={form.localisation || ""} onChange={(e) => setForm({ ...form, localisation: e.target.value })} />
            <Input placeholder="Fuseau horaire" value={form.fuseauHoraire || ""} onChange={(e) => setForm({ ...form, fuseauHoraire: e.target.value })} />
            <Input className="md:col-span-3" placeholder="Description" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="md:col-span-3">
              <Button type="submit" disabled={isAnyMutationPending}>Créer</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des hôpitaux</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Chargement...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Médecins</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hopitaux.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell>
                    <HopitalUploader hopitalId=""
                initialImageUrl={form.image || undefined}
                size={40}
                details={false}
                onImageUpdate={(url) => setForm({ ...form, image: url })}
              />
                    </TableCell>
                
                    <TableCell>{h.nom}</TableCell>
                    <TableCell>{h.adresse}</TableCell>
                    <TableCell>{h.contact}</TableCell>
                    <TableCell>{h._count.medecin}</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="secondary" onClick={() => updateHopital({ id: h.id, data: { nom: h.nom + " (modifié)" } })}>Modifier</Button>
                      <Button variant="destructive" onClick={() => deleteHopital(h.id)}>Supprimer</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


