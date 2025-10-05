"use server"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getUsersList } from "@/services/users/users"

export default async function UserTable() {
  const users = await getUsersList()

  return (
    <div className="border-2 rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Utilisateur</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Spécialité/Info</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Créé le</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full"
                    src={user.avatarUrl || "/avatar-placeholder.png"}
                    width={40}
                    height={40}
                    alt={`${user.nom ?? ""} ${user.prenom ?? ""}`.trim() || "Utilisateur"}
                  />
                  <div>
                    <div className="font-medium">{`${user.nom ?? ""} ${user.prenom ?? ""}`.trim() || user.email}</div>
                    <div className="text-muted-foreground text-xs">
                      {user.telephone || "Tél: —"}
                    </div>
                    {user.dateNaissance && (
                      <div className="text-muted-foreground text-xs">
                        Né(e): {new Date(user.dateNaissance).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {user.medecin ? 'MÉDECIN' : user.patient ? 'PATIENT' : 'ADMIN'}
                </span>
              </TableCell>
              <TableCell>
                {user.medecin?.specialite?.nom ? (
                  <div>
                    <div className="font-medium text-sm">{user.medecin.specialite.nom}</div>
                    <div className="text-xs text-muted-foreground">
                      Licence: {user.medecin.numLicence || "—"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Statut: {user.medecin.statut || "—"}
                    </div>
                  </div>
                ) : user.patient ? (
                  <div>
                    <div className="text-sm">Groupe sanguin: {user.patient.groupeSanguin || "—"}</div>
                    <div className="text-xs text-muted-foreground">
                      Sexe: {user.patient.sexe || "—"}
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">Administrateur</span>
                )}
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'ACTIF' ? 'bg-green-100 text-green-800' :
                  user.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  user.status === 'INACTIF' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.status === 'ACTIF' ? 'Actif' : 
                   user.status === 'INACTIF' ? 'Inactif' : 
                   user.status === 'PENDING' ? 'En attente' : user.status}
                </span>
              </TableCell>
              <TableCell>
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : "—"}
              </TableCell>
              <TableCell className="text-right">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Voir
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        {users.length} utilisateur(s) trouvé(s)
      </p>
    </div>
  )
}
