import { useSupabaseData } from '@/hooks/supabase-cache';

const UserList = () => {
  const { data, loading, metadata } = useSupabaseData('users', {
    query: {
      select: '*, profile(*), department(name)'
    }
  });

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Utilisateurs ({metadata.total})</h2>
      {data.items.map(user => (
        <div key={user.id}>{user.profile?.name}</div>
      ))}
    </div>
  );
};

//avec filtre client 

const AdultUsers = () => {
  const { data, metadata } = useSupabaseData('users', {
    query: {
      select: '*, profile(*)'
    },
    client: {
      where: { 
        profile: { 
          age: { $gte: 18 },
          name: { $contains: 'John' }
        }
      },
      sort: { key: 'profile.created_at', order: 'desc' },
      paginate: { page: 1, limit: 10 }
    }
  });

  return (
    <div>
      <p>Affichage {metadata.filtered} sur {metadata.total} utilisateurs</p>
      {data.items.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};



//multiples vue d un meme cache querry 

const Dashboard = () => {
  // Données source partagées
  const { source, loading } = useSupabaseData('users', {
    query: {
      select: '*, profile(*), department(*)'
    }
  });

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="dashboard">
      <UserStats sourceData={source} />
      <RecentUsers sourceData={source} />
      <DepartmentUsers sourceData={source} />
    </div>
  );
};

// Sous-composants avec filtres différents
const UserStats = ({ sourceData }) => {
  const { data, metadata } = useClientData(sourceData, {
    where: { profile: { age: { $gte: 18 } } }
  });
  
  return <div>Utilisateurs majeurs: {metadata.filtered}</div>;
};

const RecentUsers = ({ sourceData }) => {
  const { data } = useClientData(sourceData, {
    sort: { key: 'created_at', order: 'desc' },
    paginate: { page: 1, limit: 5 }
  });
  
  return (
    <div>
      {data.items.map(user => (
        <RecentUserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

Exemple 4 : Recherche avancée
const AdvancedSearch = () => {
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    minAge: 0,
    maxAge: 100
  });

  const { data, metadata } = useSupabaseData('users', {
    query: {
      select: '*, profile(*), department(*)'
    },
    client: {
      where: {
        $and: [
          ...(filters.search ? {
            $or: [
              { profile: { name: { $contains: filters.search } } },
              { profile: { email: { $contains: filters.search } } },
              { department: { name: { $contains: filters.search } } }
            ]
          } : []),
          ...(filters.department ? [{ department: { id: filters.department } }] : []),
          { profile: { age: { $gte: filters.minAge, $lte: filters.maxAge } } }
        ]
      },
      sort: { key: 'profile.name', order: 'asc' }
    }
  });

  return (
    <div>
      <SearchFilters filters={filters} onChange={setFilters} />
      <SearchResults data={data} metadata={metadata} />
    </div>
  );
};


# Dépendances nécessaires
npm install @supabase/supabase-js @supabase-cache-helpers/react-query @tanstack/react-query
