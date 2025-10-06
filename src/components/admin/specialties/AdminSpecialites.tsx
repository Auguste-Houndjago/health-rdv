"use client"

import { useMemo, useState } from "react"
import { useSpecialites, type Specialite as SpecialiteType } from "@/hooks/specialites/useSpecialites"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import SpecialiteUploader from "@/components/specialite/SpecialiteUploader"

interface EditState {
  id: string
  nom: string
  description?: string
}

export default function AdminSpecialites() {
  const {
    specialites,
    isLoading,
    error,
    updateSpecialite,
    updateSpecialitePending,
    deleteSpecialite,
    deleteSpecialitePending,
  } = useSpecialites()

  const [editOpen, setEditOpen] = useState(false)
  const [editState, setEditState] = useState<EditState | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<SpecialiteType | null>(null)

  const sorted = useMemo(() => {
    return [...specialites].sort((a, b) => a.nom.localeCompare(b.nom))
  }, [specialites])

  const startEdit = (s: SpecialiteType) => {
    setEditState({ id: s.id, nom: s.nom, description: s.description ?? "" })
    setEditOpen(true)
  }

  const submitEdit = async () => {
    if (!editState) return
    try {
      await updateSpecialite({ id: editState.id, data: { nom: editState.nom.trim(), description: editState.description?.trim() || "" } })
      setEditOpen(false)
      setEditState(null)
    } catch (e: any) {
      toast.error("Erreur lors de la mise à jour", { description: e?.message })
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteSpecialite(deleteTarget.id)
      setDeleteTarget(null)
    } catch (e: any) {
      toast.error("Suppression impossible", { description: e?.message })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spécialités</CardTitle>
        <CardDescription>Visualisez, modifiez et supprimez les spécialités médicales</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-sm text-destructive mb-4">Erreur de chargement</div>
        )}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableCaption>
              {isLoading ? "Chargement..." : `${sorted.length} spécialité${sorted.length > 1 ? "s" : ""}`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead className="w-[120px] text-right">Médecins</TableHead>
                <TableHead className="w-[120px] text-right">Hôpitaux</TableHead>
                <TableHead className="w-[180px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.nom}</TableCell>
                  <TableCell className="max-w-[420px] truncate text-muted-foreground">{s.description || "—"}</TableCell>
                  <TableCell className="max-w-[420px] truncate text-muted-foreground "> <SpecialiteUploader details={false} specialiteId={s.id} className=" w-20 h-12 overflow-hidden" /> </TableCell>
                  <TableCell className="text-right">{s._count.medecins}</TableCell>
                  <TableCell className="text-right">{s._count.hopitaux}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEdit(s)} disabled={updateSpecialitePending}>
                        Éditer
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => setDeleteTarget(s)} disabled={deleteSpecialitePending}>
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {sorted.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">Aucune spécialité</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Edit dialog */}
        <Dialog open={editOpen} onOpenChange={(o) => { setEditOpen(o); if (!o) setEditState(null) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier la spécialité</DialogTitle>
              <DialogDescription>Mettez à jour le nom et la description</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom</label>
                <Input
                  value={editState?.nom ?? ""}
                  onChange={(e) => setEditState((prev) => (prev ? { ...prev, nom: e.target.value } : prev))}
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={editState?.description ?? ""}
                  onChange={(e) => setEditState((prev) => (prev ? { ...prev, description: e.target.value } : prev))}
                  maxLength={500}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditOpen(false)}>Annuler</Button>
              <Button onClick={submitEdit} disabled={updateSpecialitePending || !editState?.nom.trim()}>
                {updateSpecialitePending ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete dialog */}
        <Dialog open={!!deleteTarget} onOpenChange={(o) => { if (!o) setDeleteTarget(null) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Supprimer la spécialité</DialogTitle>
              <DialogDescription>
                Cette action est irréversible. Confirmez la suppression de "{deleteTarget?.nom}".
              </DialogDescription>
            </DialogHeader>
            <Separator className="my-2" />
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>Annuler</Button>
              <Button variant="destructive" onClick={confirmDelete} disabled={deleteSpecialitePending}>
                {deleteSpecialitePending ? "Suppression..." : "Supprimer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}


