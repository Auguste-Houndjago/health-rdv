import { buildQuery, buildClient } from './queryBuilders';
import { Database } from '@/types/database';

type User = Database['public']['Tables']['Utilisateur']['Row'] & { id: string };


// Queries pour la table User
export const userQueries = {
  // Users masculins
  onlyMales: buildQuery<User>(
    { id: true, email: true,  },

  ),

  // Users actifs
  activeUsers: buildQuery<User>(
    { id: true, email: true, status: true, },
 
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
  sortByName: buildClient<User>(undefined, { key: 'avatarUrl', order: 'asc' }),
  
  // Tri par date récente
  sortByRecent: buildClient<User>(undefined, { key: 'createdAt', order: 'desc' }),
  
  // Pagination standard
  paginated: buildClient<User>(undefined, undefined, { page: 1, limit: 20 }),
  

  
  // Combinaison tri + pagination
  listView: buildClient<User>(
    undefined,
    { key: 'telephone', order: 'asc' },
    { page: 1, limit: 10 }
  )
};

// Queries pour d'autres tables
