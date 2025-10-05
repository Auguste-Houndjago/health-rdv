import { buildQuery, buildClient } from './queryBuilders';
import { Database } from '@/types/database';

type User = Database['public']['Tables']['User']['Row'] & { id: string };


// Queries pour la table User
export const userQueries = {
  // Users masculins
  onlyMales: buildQuery<User>(
    { id: true, email: true,  },
    { sex: 'MALE' }
  ),

  // Users actifs
  activeUsers: buildQuery<User>(
    { id: true, email: true, status: true, },
    { status: 'ACTIVE' }
  ),

  // Admins
  admins: buildQuery<User>(
    { id: true, email: true, sex: true, status: true,},
    
  ),

  // Tous les users (pour filtrage client)
  allUsers: buildQuery<User>(
    { id: true, email: true, firstName: true, lastName: true },
  )
};

// Options client réutilisables
export const clientOptions = {
  // Tri par nom
  sortByName: buildClient<User>(undefined, { key: 'avatar_url', order: 'asc' }),
  
  // Tri par date récente
  sortByRecent: buildClient<User>(undefined, { key: 'createdAt', order: 'desc' }),
  
  // Pagination standard
  paginated: buildClient<User>(undefined, undefined, { page: 1, limit: 20 }),
  
  // Filtre adultes seulement
  adultsOnly: buildClient<User>({ 'phone': { $endsWith: "18" } }),
  
  // Combinaison tri + pagination
  listView: buildClient<User>(
    undefined,
    { key: 'phone', order: 'asc' },
    { page: 1, limit: 10 }
  )
};

// Queries pour d'autres tables
export const classQueries = {
  published: buildQuery<Database['public']['Tables']['Class']['Row']>(
    { id: true, name: true, level: true },
    
  ),
  

};