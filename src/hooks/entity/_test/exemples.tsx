//@/hooks/entity/_test/exemples.tsx
'use client';


import { asEntityFetcher, useEntity } from "@/hooks/entity/useEntity";
import { useEntityFilter } from "../useEntityFilter";
import { useState } from "react";
import { fetchUsers } from "./actions";


// /**
//  * Exemple 1: Utilisation basique avec la server action mock
//  */

const fetchUserss = asEntityFetcher(fetchUsers);
export function BasicUserList() {

   
  const { data, loading, error } = useEntity({
    entityName: "users",
    fetchFn: fetchUserss, // Utilise notre server action mock
    initialParams: { page: 1, limit: 20 }
    
  });

  if (loading) return <div>Chargement des utilisateurs...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div>
      <h3>Liste des utilisateurs ({data.items.length})</h3>
      {data.items.map(user => (
        <div key={user.id} className="user-card">
          <h4>{user.name}</h4>
          <p>Email: {user.email}</p>
          <p>Statut: {user.status}</p>
          <p>Rôle: {user.role}</p>
        </div>
      ))}
    </div>
  );
}

// // /**
// //  * Exemple 2: Filtrage avancé avec données mockées
// //  */
export function FilteredUserList() {
  const { data, loading, isFilteredView } = useEntityFilter({
    entityName: "users",
    fetchFn: fetchUserss,
    where: { 
    role:"moderator",
      status: "active",
      profile: { 
        age: { $gte: 25 } 
      }
    },
    sort: { key: "profile.age", order: "desc" }
    
  });

  const surc = data.items

  const test = surc.filter((user) => {
    return user.role === "moderator"
  })
  
  return (
    <div className="flex flex-col bg-accent px-80">
      <h3>Administrateurs actifs de plus de 25 ans</h3>
      <p>Vue filtrée: {isFilteredView ? "Oui" : "Non"}</p>
      <p>Résultats: {data.items.length} sur {data.allItems.length} utilisateurs</p>
      
      {data.items.map(user => (
        <div key={user.id}>
          {user.name} - {user.profile?.age} ans - {user.email}
          <h1>
            role : {user.role}
          </h1>
        </div>
      ))}
    </div>
  );
}

// // /**
// //  * Exemple 3: Recherche et pagination
// //  */
export function SearchableUserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { data, loading, refetchWithParams } = useEntity({
    entityName: "users",
    fetchFn: fetchUserss,
    initialParams: { page: 1, limit: 5 }
  });

  const handleSearch = async (term: string) => {
    setPage(1);
    await refetchWithParams({ 
      search: term,
      page: 1,
      limit: 5
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetchWithParams({ page: newPage, limit: 5 });
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={() => handleSearch(searchTerm)}
        placeholder="Rechercher un utilisateur..."
      />
      
      {loading && <div>Recherche en cours...</div>}
      
      <div>
        {data.items.map(user => (
          <div key={user.id}>{user.name} - {user.email}</div>
        ))}
      </div>
      
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={page === 1}
        >
          Précédent
        </button>
        <span>Page {page}</span>
        <button onClick={() => handlePageChange(page + 1)}>
          Suivant
        </button>
      </div>
    </div>
  );
}