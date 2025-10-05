
// "use client";

// import { useEntitySupabase } from '@/hooks/entitySupabase/useEntitySupabase';

// export function UsersList() {
//   const { data: users, loading, error } = useEntitySupabase('Utilisateur', {
//     query: {
//       select: `
//         id,
//         nom,
//         prenom,
//         email,
//         telephone,
//         avatarUrl,
//         dateNaissance,
//         status,
//         createdAt,
//         medecin:medecin(
//           numLicence,
//           statut,
//           specialite:specialite_id(nom)
//         ),
//         patient:patient(
//           groupeSanguin,
//           sexe
//         )
//       `,
//       filters: { deletedAt: null }
//     },
//     filterClient: {
//       sort: { key: 'createdAt', order: 'desc' }
//     }
//   });

//   if (loading) return <div>Chargement...</div>;
//   if (error) return <div>Erreur: {error.message}</div>;

//   return (
//     <div>
//       {users?.items.map(user => (
//         <div key={user.id} className="user-card">
//           <h3>{user.nom} {user.prenom}</h3>
//           <p>Email: {user.email}</p>
//           <p>Statut: {user.status}</p>
//           {user.medecin && (
//             <div>
//               <p>Médecin - Licence: {user.medecin.numLicence}</p>
//               <p>Spécialité: {user.medecin.specialite?.nom}</p>
//             </div>
//           )}
//           {user.patient && (
//             <div>
//               <p>Patient - Groupe sanguin: {user.patient.groupeSanguin}</p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }