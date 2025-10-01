// import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
// import { useMemo } from 'react';
// import { supabase } from '@/lib/supabase'; // Votre client Supabase
// import { Database } from '@/types/database'; // Vos types générés
// import { 
//   UseSupabaseDataOptions, 
//   SupabaseDataResult 
// } from './types';
// import { 
//   itemsToById, 
//   useFilterFn, 
//   useSortFn, 
//   applyFilter, 
//   applySort, 
//   applyPagination 
// } from './entityFilters';

// type TableName = keyof Database['public']['Tables'];
// type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];

// /**
//  * Hook principal pour la gestion des données Supabase avec cache et filtres client
//  */
// export const useSupabaseData = <T extends TableRow<TableName> & { id: string }>(
//   table: TableName,
//   options: UseSupabaseDataOptions<T> = {}
// ): SupabaseDataResult<T> => {
//   const { query = {}, client = {}, queryOptions = {} } = options;

//   // 1. Récupération des données via Supabase Cache Helpers
//   const supabaseQuery = useQuery(
//     supabase
//       .from(table)
//       .select(query.select || '*')
//       .match(query.filters || {}),
   
//     // {
//     //   staleTime: 1000 * 60 * 5, // 5 minutes
//     //   ...queryOptions
//     // }
//   );

//   // 2. Transformation des données source
//   const sourceData = useMemo(() => {
//     if (!supabaseQuery.data) return { items: [], byId: {} };
//     return itemsToById(supabaseQuery.data as T[]);
//   }, [supabaseQuery.data]);

//   // 3. Préparation des fonctions de filtrage client
//   const clientFilterFn = useFilterFn<T>(client.where);
//   const clientSortFn = useSortFn<T>(client.sort);

//   // 4. Application des transformations client
//   const processedData = useMemo(() => {
//     let items = sourceData.items;
    
//     // Application des filtres
//     if (clientFilterFn) {
//       items = applyFilter(items, clientFilterFn);
//     }
    
//     // Application du tri
//     if (clientSortFn) {
//       items = applySort(items, clientSortFn);
//     }
    
//     // Application de la pagination
//     const paginatedItems = applyPagination(items, client.paginate);
    
//     return itemsToById(paginatedItems);
//   }, [sourceData.items, clientFilterFn, clientSortFn, client.paginate]);

//   // 5. Calcul des métadonnées
//   const metadata = useMemo(() => {
//     const total = sourceData.items.length;
//     const filtered = processedData.items.length;
//     const hasClientFilters = !!(client.where || client.sort);
    
//     let page, totalPages;
//     if (client.paginate) {
//       page = client.paginate.page;
//       totalPages = Math.ceil(filtered / client.paginate.limit);
//     }

//     return {
//       total,
//       filtered,
//       hasClientFilters,
//       page,
//       totalPages
//     };
//   }, [sourceData.items.length, processedData.items.length, client.where, client.sort, client.paginate]);

//   return {
//     source: sourceData,
//     data: processedData,
//     loading: supabaseQuery.isLoading,
//     error: supabaseQuery.error,
//     refetch: supabaseQuery.refetch,
//     metadata
//   };
// };

// // Export des helpers pour une utilisation séparée
// export { useFilterFn, useSortFn, itemsToById };