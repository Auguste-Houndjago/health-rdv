import { useState, useMemo } from 'react';
import { FilterStatut } from '@/components/admin/demandes/filters/types';

interface UseFiltersOptions {
  initialSearch?: string;
  initialStatut?: FilterStatut;
}

export function useFilters(options: UseFiltersOptions = {}) {
  const [searchTerm, setSearchTerm] = useState(options.initialSearch || '');
  const [statutFilter, setStatutFilter] = useState<FilterStatut>(options.initialStatut || 'all');

  const hasActiveFilters = useMemo(() => {
    return searchTerm.trim() !== '' || statutFilter !== 'all';
  }, [searchTerm, statutFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatutFilter('all');
  };

  return {
    searchTerm,
    statutFilter,
    setSearchTerm,
    setStatutFilter,
    hasActiveFilters,
    clearFilters
  };
}


